import Vue from "vue";
import VueRouter from "vue-router";
import AuthView from "../views/AuthView.vue";
import { getAuth as auth } from "firebase/auth";
// import Home from "../views/Home.vue";
// import Admin from "../views/Administracion.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    alias: ["/auth"],
    component: AuthView,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { auth: true },
  },
  {
    path: "/cursos",
    name: "Cursos",
    component: () => import("../views/Cursos.vue"),
    meta: { auth: true },
  },
  {
    path: "*",
    component: () => import("../views/NotFound.vue"),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () => import("../views/About.vue"),
  //   meta: { auth: true },
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let user = auth().currentUser;
  let authRequired = to.matched.some((route) => route.meta.auth);
  if (!user && authRequired) {
    next("auth");
  } else if (user && !authRequired) {
    next("cursos");
  } else {
    next();
  }
});
export default router;
