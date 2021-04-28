<template>
    <el-container>
      <el-container>
        <el-aside width="100px">
          <el-menu :router="true" mode="vertical" @select="selectMenu">
            <el-menu-item index="/app-vue">中台</el-menu-item>
            <el-menu-item index="/vue2">机器人</el-menu-item>
            <el-menu-item index="/vue3">质检</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
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
  components: {
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

</style>
