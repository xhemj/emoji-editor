import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./view/Home.vue";
import Editor from "./view/Editor.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: { level: 1 },
  },
  {
    path: "/editor",
    component: Editor,
    name: "editor",
    meta: { level: 2 },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
    meta: { level: 999 },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
