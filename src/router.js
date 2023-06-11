import { createRouter, createWebHashHistory } from "vue-router";

// import Home from "./view/Home.vue";
// import Editor from "./view/Editor.vue";
const Home = () => import("./view/Home.vue");
const Editor = () => import("./view/Editor.vue");

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: { level: 1, title: "请选择模板" },
  },
  {
    path: "/editor",
    redirect: { name: "create", query: { id: "dzx" } },
    meta: { level: 2 },
  },
  {
    path: "/create",
    component: Editor,
    name: "create",
    meta: { level: 2, title: "编辑器" },
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
