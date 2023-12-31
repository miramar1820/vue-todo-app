import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/user";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles.scss";

console.log(import.meta.env.VITE_SOME_VAR);

(async () => {
  const app = createApp(App);
  app.use(createPinia());
  const { init } = useAuthStore();
  await init();
  app.use(router);
  app.mount("#app");
})();

// const pinia = createPinia();

// const app = createApp(App);

// app.use(pinia).use(router).mount("#app");
