import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/user";
import App from "./App.vue";
import router from "./router";
// import "./assets/main.css";

// (async () => {
//   const app = createApp(App);
//   app.use(createPinia());
//   const { init } = useAuthStore();
//   await init();
//   app.use(router);
//   app.mount("#app");
// })();

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);

app.use(router).mount("#app");
