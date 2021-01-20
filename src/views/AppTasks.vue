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

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    return {
      tasks: computed(() => store.getters.todoList),
      activeTasksNumber: computed(() => store.getters.activeTasksNumber),
      hasTasks: computed(() => store.getters.hasTasks),
    };
  },
  components: { AppTask },
};
</script>
