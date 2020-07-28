const path = require('path');
module.exports = {
    publicPath: './',
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    lintOnSave: false,
    configureWebpack: (config) => {
        config.resolve = {
            extensions: ['.js', '.json', '.vue'],
            alias: {
                'vue': 'vue/dist/vue.js',
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components')
            }
        }
    },
    configureWebpack: {
        externals: {
            'AMap': 'AMap' // 高德地图配置
        },
        module: {
            rules: [
                {
                    // test: /\.(png|jpg|gif)$/i,
                    // use: [
                    //     {
                    //         loader: 'url-loader',
                    //         options: {
                    //             limit: true,
                    //         },
                    //     },
                    // ],
                },
            ],
        },
    },
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 57103,
        https: false,
        hot: true,
        hotOnly: false,
        proxy: {
            '/devApi': {
                target: 'http://139.9.192.241:8101/dlv',
                ws: true,
                pathRewrite: {
                    '^/devApi': ''
                }
            }
        }
    },


}
