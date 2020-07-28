import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Vue from "vue";

var MeshLine = require('three.meshline')
import axios from 'axios'
import * as d3 from 'd3-geo'
import {store} from '../store/store'
import {AxesHelper} from "three";

export default class GeoMap {
    constructor() {
        this.cameraPosition = {x: 100, y: 0, z: 90}; // 相机位置
        this.scene = null; // 场景
        this.camera = null; // 相机
        this.renderer = null; // 渲染器
        this.controls = null; // 控制器
        this.mapGroup = []; // 组
        this.meshList = []; // 接受鼠标事件对象
        this.selectObject = null; // 当前选中对象
        this.loopIndex = 0; // 循环标记
        this.cameraPath = null; // 相机运动轨迹
        this.tipName = '';//hover事件
        this.tipStyle = '';//tipsName样式
        this.isClick = ''; // 是否点击
        this.data='';
    }


    /**
     * @desc 初始化
     * */
    init() {
        this.setScene();
        this.setCamera();
        this.setLight();
        this.setRenderer();
        this.setControl();
        this.getMap('/mapJson/shenzhen.json');
        this.animat();
        this.bindMouseEvent();
    }

    /**
     * @desc 动画循环
     * */
    animat() {
        requestAnimationFrame(this.animat.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * @desc 获取地图
     * */

    getMap(url) {
        axios.get(url).then(res=> {
            if (res.status === 200) {
                this.data = res.data;
                this.setMapData(this.data)
            }
        })
    }

    /**
     * @desc 添加基础灯光
     * */

    setLight() {
        const d_light = new THREE.DirectionalLight(0xffffff, 1.2, 0);
        d_light.castShadow=true;
        d_light.position.set(50, 50, 30);
        // d_light.add(a)

        const Light = new THREE.AmbientLight(0xffffff, 1, 0);
        this.scene.add(d_light);
        this.scene.add(Light);
    }

    /**
     * @desc 绘制地图
     * @params geojson
     * */

    setMapData(data) {
        const that = this;
        let vector3json = [];
        data.features.forEach(function (features, featuresIndex) {
            const areaItems = features.geometry.coordinates;
            features.properties.cp = that.lnglatToVector3(features.properties.center);
            vector3json[featuresIndex] = {
                data: features.properties,
                mercator: []
            };
            areaItems.forEach(function (item, areaIndex) {
                vector3json[featuresIndex].mercator[areaIndex] = [];
                item[0].forEach(function (cp) {
                    const lnglat = that.lnglatToVector3(cp,data);
                    const vector3 = new THREE.Vector3(lnglat[0], lnglat[1], lnglat[2]).multiplyScalar(1);
                    vector3json[featuresIndex].mercator[areaIndex].push(vector3)
                })
            })
        });
        this.drawMap(vector3json)
    }

    /**
     * @desc 绘制图形
     * @param data : Geojson
     * */
    drawMap(data) {
        let that = this;
        this.mapGroup = new THREE.Group();
        this.mapGroup.position.y = -5;
        this.mapGroup.position.z = 2
        this.mapGroup.position.x = 3;
        this.mapGroup.scale.set(2, 2.3, 2)
        this.scene.add(that.mapGroup);
        const extrudeSettings = {
            depth: 0.3,
            steps: 1,
            bevelSegments: 0,
            curveSegments: 1,
            bevelEnabled: false,
        };
        const blockMaterial = new THREE.MeshBasicMaterial({
            color: 'rgba(0,138,217,1)',
            opacity: 0.4,
            transparent: true,
            wireframe: false,
        });
        const blockSideMaterial = new THREE.MeshStandardMaterial({
            color: 'rgba(11,139,213,0.2)',
            // opacity: 0.24,
            specular: 'rgba(11,139,213,0.2)',
            // transparent: true,
            wireframe: false,
        });
        const lineMaterial = new THREE.LineBasicMaterial({
            color: '#47c0ff'
        });
        data.forEach(function (areaData) {
            let areaGroup = new THREE.Group();
            areaGroup.name = 'area';
            areaGroup._groupType = 'areaBlock';
            areaData.mercator.forEach(function (areaItem) {
                // Draw area block
                let shape = new THREE.Shape(areaItem);
                let geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
                let mesh = new THREE.Mesh(geometry, [blockMaterial, blockSideMaterial]);
                areaGroup.add(mesh);
                // Draw Line
                let lineGeometry = new THREE.Geometry();
                lineGeometry.vertices = areaItem;
                let lineMesh = new THREE.Line(lineGeometry, lineMaterial);
                let lineMeshCp = lineMesh.clone();
                lineMeshCp.position.z = 0.3;
                areaGroup.add(lineMesh);
                areaGroup.add(lineMeshCp);
            });
            that.mapGroup.add(areaGroup);
            that.mapGroup.name = "mapGroup"
        });
        that.scene.add(that.mapGroup);
    }

    /**
     * @desc 移动相机
     * */
    moveCamera() {
        // 第一次绘制相机路径
        if (this.cameraPath === null) {
            this.cameraPath = new THREE.Path();
            this.cameraPath.moveTo(150, 0);
            this.cameraPath.lineTo(70, 0);
            let geometry = new THREE.BufferGeometry().setFromPoints(this.cameraPath.getPoints());
            let material = new THREE.LineBasicMaterial({color: 0xff0000});
            let line = new THREE.Line(geometry, material);
            line.position.z = 100;
            this.scene.add(line);
            this.progress = 0;
        } else {
            if (this.progress < 1) {
                this.progress += 0.01; // 增量 也就是说将该线端，按照1/500的比例进行分割。也就是说有500个坐标点
                let point = this.cameraPath.getPointAt(this.progress); // 从路径中拿取坐标点点
                if (point) {
                    this.camera.position.set(point.x, point.y, 100);
                }
            }
        }
    }

    /**
     * @desc 坐标转换
     * @param lnglat [x,y]
     * */

    lnglatToVector3(lnglat) {
        if (!this.projection) {
            // center: [114.06667, 22.61667],//深圳
                this.projection = d3.geoMercator().center([114.06667, 22.61667]).scale(1000).translate([0, 0]);  //深圳地图为中心
        }
        const [x, y] = this.projection([lnglat[0], lnglat[1]])
        const z = 0;
        return [y, x, z]
    }
    /**
     * @desc 创建场景
     * */
    setScene() {
        this.scene = new THREE.Scene();
        const lightMapTexture = new THREE.TextureLoader().load('/images/bg.png');
        this.scene.background = lightMapTexture
    }

    /**
     * @desc 创建相机
     * */
    setCamera() {
        this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.up.x = 0;
        this.camera.up.y = 0;
        this.camera.up.z = 1;
        this.camera.lookAt(0, 0, 0);
        this.scene.add(this.camera);
    }
    /**
     * @desc 创建相机辅助线
     * */
    setCameraHelper() {
        const helper = new THREE.CameraHelper(this.camera);
        this.scene.add(helper);
    }
    /**
     * @desc 创建渲染器
     * */
    setRenderer() {
        let width = document.getElementsByClassName('map3d')[0].offsetWidth;
        let height = document.getElementsByClassName('map3d')[0].offsetHeight;
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setClearColor('rgba(0,0,0,0)');
        this.renderer.sortObjects = true; // 渲染顺序
        this.renderer.setSize(width, height);
        document.getElementsByClassName('map3d')[0].appendChild(this.renderer.domElement);
        function onWindowResize() {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }

        window.addEventListener('resize', onWindowResize.bind(this), false);
    }

    /**
     * @desc 创建控制器
     * */
    setControl() {
        // this.controls = new THREE.OrbitControls(this.camera);
        this.controls = new OrbitControls(this.camera, document.getElementsByClassName('map3d')[0]);
        this.controls.maxPolarAngle = Math.PI / 2
        this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
    }

    /**
     * @desc 创建一个xyz坐标轴
     * */
    setAxes() {
        const axes = new THREE.AxesHelper(100);
        this.scene.add(axes);
    }

    /**
     * @desc 鼠标 hover 事件
     * */

    bindMouseEvent() {
        let that = this;

        function onMouseMove(event) {
            event.preventDefault();
            let mainCanvas = document.getElementsByClassName('map3d')[0]
            let x = ((event.clientX - mainCanvas.getBoundingClientRect().left) / mainCanvas.offsetWidth) * 2 - 1;// 标准设备横坐标
            let y = -((event.clientY - mainCanvas.getBoundingClientRect().top) / mainCanvas.offsetHeight) * 2 + 1;// 标准设备纵坐标
            const standardVector = new THREE.Vector3(x, y, 1); //标准设备坐标
            //标准设备坐标转世界坐标
            const worldVector = standardVector.unproject(that.camera);
            //射线投射方向单位向量(worldVector坐标减相机位置坐标)
            const ray = worldVector.sub(that.camera.position).normalize();
            //创建射线投射器对象
            let raycaster = new THREE.Raycaster(that.camera.position, ray);

            //返回射线选中的对象
            let intersects = raycaster.intersectObjects(that.meshList);

            if (intersects.length) {
                let obj = intersects[0].object.info
                that.markerPop(event, obj)
                if(window.location.href.split('/')[window.location.href.split('/').length - 1] == 'environment') {
                    store.commit('index/setPosCode', obj.code)
                }
            } else {
                that.tipName = ''
            }
        }
        document.getElementsByClassName('map3d')[0].addEventListener('mousemove', onMouseMove, false);
        document.getElementsByClassName('map3d')[0].addEventListener('click', onMouseMove, false);
    }

    /*
    *   标记弹出框事件
    * */
    markerPop(event, obj) {
        if (event.type == 'mousemove') {  //hover
            this.tipStyle=`left:${event.clientX}px; top:${event.clientY}px`;
            this.tipName=obj.city
        } else if (event.type == 'click' && obj.type == 1) {  //点击事件(标点)
        } else if (event.type == 'click' && (obj.type == 2 || obj.type == 3)) { //类型为（国家 省份等）

        }
        if(event.type == 'click') {//点击事件
            this.isClick = obj;
              Vue.prototype.$get('/i606FlowChart',{code:obj.code}).then(res => {
                    this.drawMetap(res.data)
              })
        }
    }

    /*
     设置标志
     * */
    drawMarker(data) {
        data.forEach(features => {

            if(features.status !== '') {
                let img = require(`../assets/image/map/${features.status}.png`);
                features.cp = this.lnglatToVector3(features.position);
                this.tipsSprite(img, features)
            }
        })
    }

    /*标记*/
    tipsSprite(src, areaData) {
        const lightMapTexture = new THREE.TextureLoader().load(src);
        let materialB = new THREE.SpriteMaterial({
            map: lightMapTexture,
            fog: true,
            depthTest: false,
        });
        let sprite = new THREE.Sprite(materialB);
        sprite.position.set(areaData.cp[0], areaData.cp[1], 0.4);
        sprite.scale.set(0.3, 0.3, 0.3);
        sprite.info = areaData
        sprite.name = areaData.status.split('_')[0]
        // console.log('sprite.name', sprite.name)
        this.meshList.push(sprite);
        this.mapGroup.add(sprite)
        if(areaData.isShow == true) {
            sprite.material.opacity = 1
        } else {
            sprite.material.opacity = 0
        }
    }

    /*
    * 画流向图*/
    drawMetap(markingPos) {
            // 经纬度信息
        let line = this.mapGroup.getObjectByName('flowLine') || ''
        let dot = this.mapGroup.getObjectByName('flowdot') || ''
        if (line) {
            this.mapGroup.remove(line)
            this.mapGroup.remove(dot)
            line.traverse(function (obj) {  //dispose()清除几何体、贴图纹理内存
                if (obj.type === 'Mesh') {
                    obj.geometry.dispose();
                    obj.material.dispose();
                }
            })
            dot.traverse(function (obj) {
                if (obj.type === 'Mesh') {
                    obj.geometry.dispose();
                    obj.material.dispose();
                }
            })

        }
            let metapArray = [];
            let zHeight =0.6;
            let metapNum = 80;  // 迁徙路径分段数
            let markingNum = 5;
            let dotWidth = 0.03; // 线条上运动的点宽度
            let markingColor = '#3437FF';

            // 组装线条连接经纬度信息
            markingPos.forEach((markingItem) => {
                let sourceDot = this.lnglatToVector3(markingItem.coords[0]);
                let site = this.lnglatToVector3(markingItem.coords[1])
                metapArray.push([{//源目标经纬度
                    x: sourceDot[0],
                    y: sourceDot[1],
                    z: zHeight
                }, { //目的
                    x: site[0],
                    y: site[1],
                    z: zHeight
                }])
                // sourceList.push( {
                //     x: sourceDot[0],
                //     y: sourceDot[1],
                //     z: zHeight
                // })
                // metapArray.push({
                //     x: site[0],
                //     y: site[1],
                //     z: zHeight
                // })
            })
            // 线条集合
            let animateDots = [];
            // 存放线条对象集合
            let groupLines = new THREE.Group();
            groupLines.name = 'flowLine'
            // 绘制迁徙线条
            metapArray.forEach((metapItem ) => {
                let line = this.drawMetapLine(metapItem[0], metapItem[1]);
                groupLines.add(line.lineMesh);
                animateDots.push(line.curve.getPoints(metapNum));
            })
            // 添加迁徙线条到场景中
            this.mapGroup.add(groupLines);
            // 添加线上滑动的物质
            let aGroup = new THREE.Group();
            aGroup.name = 'flowdot'
            for (var i = 0; i < animateDots.length; i++) {
                for (var j = 0; j < markingNum; j++) {
                    var aGeo = new THREE.SphereGeometry(dotWidth, 5, 5);
                    var aMater = new THREE.MeshPhongMaterial({
                        color: markingColor,
                        transparent: true,
                        opacity: 1 - j * 1 / markingNum
                    })
                    var aMesh = new THREE.Mesh(aGeo, aMater);
                    aGroup.add(aMesh);
                }
            }
            var vIndex = 0;
            // 表示第一次循环运行
            var firstBool = true;

            function animationLine() {
                aGroup.children.forEach(function (elem, index) {
                    var _index = parseInt(index / markingNum);
                    // 保证当前数组与迁徙轨迹匹配
                    var index2 = index - _index * markingNum;
                    var _vIndex = 0;
                    if (firstBool) {
                        _vIndex = vIndex - index2 % markingNum >= 0 ? vIndex - index2 % markingNum : 0;
                    } else {
                        _vIndex = vIndex - index2 % markingNum >= 0 ? vIndex - index2 % markingNum : 80 + vIndex - index2;
                    }
                    var v = animateDots[_index][_vIndex];
                    elem.position.set(v.x, v.y, v.z);
                })
                vIndex++;
                if (vIndex > metapNum) {
                    vIndex = 0;
                }
                if (vIndex == 80 && firstBool) {
                    firstBool = false;
                }
                requestAnimationFrame(animationLine);
            }

            this.mapGroup.add(aGroup);
            animationLine();
    }

    // 绘制迁徙线条函数
    drawMetapLine(v0, v3) {
        let v1 = {};
        let meshLineColor = '#2F44C8';// 轨迹标记颜色
        v1.x = (v0.x + v3.x) / 2;
        v1.y = (v0.y + v3.y) / 2;
        v1.z = 0.7;
        // 绘制贝塞尔曲线
        let curve = new THREE.CubicBezierCurve3(v0, v1, v1, v3);
        let geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(80);
        let line = new MeshLine.MeshLine();
        line.setGeometry(geometry);
        let material = new MeshLine.MeshLineMaterial({
            color: meshLineColor,
            lineWidth: 0.3
        })
        let lineMesh = new THREE.Mesh(line.geometry, material);
        return {
            curve,
            lineMesh
        }
    }

}
