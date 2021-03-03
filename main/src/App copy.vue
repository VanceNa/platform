<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="300px">
          <el-menu :router="true" mode="vertical" @select="selectMenu">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/app-vue">中台</el-menu-item>
            <el-menu-item index="/vue2">机器人</el-menu-item>
            <el-menu-item index="/vue3">质检</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <main></main>
          <div id="container2"></div>
          <div id="container"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {};
  },
  methods: {
    selectMenu(subapp) {
      history.pushState(null, subapp, subapp);
    },
    //  goto(title, href) {
    //   window.history.pushState({}, title, href);
    // }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
