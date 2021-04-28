<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>
<style lang="less">
@import "../static/iconfonts/iconfont.css";
html,
body,
#main {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
[class*=" el-icon-"],
[class^="el-icon-"] {
  font-size: 14px !important;
}
</style>
