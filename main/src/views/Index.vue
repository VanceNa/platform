<template>
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
        <main>主应用</main>
        <div id="container2"></div>
        <div id="container"></div>
        <div id="container3"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
        test:'',
    };
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
</style>
