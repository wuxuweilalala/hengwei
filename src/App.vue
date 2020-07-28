<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header
  },
  mounted() {
    let vm = this;
    window.onresize = () => {
      vm.$store.dispatch('index/resizeASync', {
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
  }
}
</script>
<style lang="scss">
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("./assets/image/bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
