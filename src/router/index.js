import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/user";

const authCheck = (to, from, next) => {
  const store = useAuthStore();
  console.log("authCheck", store.isLoggedIn);
  if (store.isLoggedIn) {
    if (to.name === "login") {
      next({ name: "dashboard" });
    } else {
      next();
    }
  } else {
    if (to.name === "login") {
      next();
    } else {
      next({ name: "login" });
    }
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    beforeEnter: authCheck,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    beforeEnter: authCheck,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "is-active",
  linkExactActiveClass: "exact-active-link",
});

export default router;
