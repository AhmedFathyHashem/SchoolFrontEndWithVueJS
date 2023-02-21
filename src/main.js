import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "./assets/main.css";
import store from "./Store";


createApp(App).use(store).use(router).mount("#app");
