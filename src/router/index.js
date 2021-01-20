import { createRouter, createWebHistory } from "vue-router";
import AppTasks from "../views/AppTasks.vue";
import AppTask from "../views/AppTask.vue";
import NewTask from "../views/NewTask.vue";

const routes = [
  {
    path: "/",
    name: "AppTasks",
    component: AppTasks
  },
  {
    path: "/task/:taskId?",
    name: "AppTask",
    component: AppTask
  },
  {
    path: "/create-task",
    name: "NewTask",
    component: NewTask
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
});

export default router;
