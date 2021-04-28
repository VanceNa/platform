import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from '@/util/http.js'
import global_ from './global.js'

import store from './store/index'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios
Vue.prototype.GLOBAL = global_

import { registerMicroApps, start, setDefaultMountApp } from "qiankun";
const apps = [
  {
    name: "vueApp",
    entry: "//localhost:10000",
    container: "#container",
    activeRule: "/app-vue",
  },
  {
    name: "vueApp2",
    entry: "//localhost:20000",
    container: "#container2",
    activeRule: "/vue2",
  },
  {
    name: "vueApp3",
    entry: "//localhost:30000",
    container: "#container3",
    activeRule: "/vue3",
  },
];
registerMicroApps(apps); //注册应用
// setDefaultMountApp("/app-vue"); //默认进入的子应用
setDefaultMountApp('')
start({
  singular: false,
  prefetch: true, //取消预加载
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
