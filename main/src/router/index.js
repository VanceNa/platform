import Vue from "vue";
import Router from "vue-router";
import home from "@/views/Home";

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/*",
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

// router.beforeEach((to, from, next) => {
//   debugger
//   if (to.path === "/") {
//     next("/login");
//   } else {
//     //未登录
//     if (to.path == "/login") {
//       next();
//     } else {
//       next("/login");
//     }
//   }
// });

export default router;
