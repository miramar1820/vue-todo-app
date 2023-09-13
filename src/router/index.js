import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Page from "@/views/Page.vue";
import { useAuthStore } from "@/stores/user";

const authCheck = (to, from, next) => {
  const store = useAuthStore();
  if (store.isLoggedIn) {
    if (to.name === "login") {
      next({ name: "dashboard" });
    } else {
      next();
    }
  } else {
    if (to.name === "dashboard") {
      next({ name: "login" });
    } else {
      next();
    }
  }
};

const routes = [
  {
    path: "/",
    component: Page,
    children: [
      {
        path: "about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/Dashboard.vue"),
        beforeEnter: authCheck,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: () => import("../views/404.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    beforeEnter: authCheck,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "",
  linkExactActiveClass: "is-active",
});

export default router;
