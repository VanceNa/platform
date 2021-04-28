import Vue from "vue";
import store from '@/store/index.js'
import Router from "vue-router";
import home from "@/views/Home";


Vue.use(Router);
console.log(window.__POWERED_BY_QIANKUN__)
const router = new Router({
  routes: [
    {
      path: '/main*',
      name: "main",
      component: () => import("@/views/Main"),
      children: [

        {
          path: "/home",
          name: "home",
          component: home,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login"),
    },

  ],
});

router.beforeEach((to, from, next) => {
  debugger
  let token = store.state.token
  if (token) {
    // 已登录
    if (to.path === '/main') {
      // 各种权限控制meta.xxx
      next()
    } else {
      next('/main')
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      next()
    } else if (store.state.isLoginPage) {
      next('/login')
    } else {
      // 未登录
      if (to.path === '/login') {
        next()
      } else if (to.path === '/') {
        next('/login')
      }
    }
  }
});

export default router;
