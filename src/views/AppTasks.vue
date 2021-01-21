<template>
  <h1 class="text-white center" v-if="!hasTasks">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasksNumber }}</h3>
    <ul v-for="task in tasks" :key="task.title">
      <li>
        <app-task :task="task" />
      </li>
    </ul>
  </template>
</template>

<script>
import AppTask from "../components/AppTask";
import localStorage from "../Service/localStorage";

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const tasksFromStorage = localStorage.getTasksFromStorage();

    store.commit("SET_TASKS", tasksFromStorage);

    return {
      tasks: computed(() => store.getters.tasks),
      activeTasksNumber: computed(() => store.getters.activeTasksNumber),
      hasTasks: computed(() => store.getters.hasTasks),
    };
  },
  components: { AppTask },
};
</script>
