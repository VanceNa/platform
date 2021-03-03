import Vue from "vue";
import home from "@/views/Home";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: window.__POWERED_BY_QIANKUN__ ? '/vue2/' : '/',
  routes,
});

export default router;
