<template>
  <h1 class="text-white center" v-if="!hasTasks">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasksNumber }}</h3>
    <filter-select
      label="Фильтровать по статусу"
      :options="options"
      :selectedOption="selectedOption"
    />
    <ul v-for="task in tasks" :key="task.title">
      <li>
        <task-item :task="task" />
      </li>
    </ul>
  </template>
</template>

<script>
import TaskItem from "../components/TaskItem";
import FilterSelect from "../components/FilterSelect";
import localStorage from "../Service/localStorage";

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const savedStore = localStorage.getTasksFromStorage();

    store.commit("SET_LOCALE_STORE", savedStore);

    const options = [
      { title: "Все", value: "all" },
      { title: "Aктивные", value: "active" },
      { title: "Законченные", value: "done" },
      { title: "Ожидающие", value: "pending" },
      { title: "Отменненые", value: "cancelled" },
    ];

    return {
      options,
      tasks: computed(() => store.getters.filteredTasks),
      activeTasksNumber: computed(() => store.getters.activeTasksNumber),
      hasTasks: computed(() => store.getters.hasTasks),
      selectedOption: computed(() => store.getters.selectedOption),
    };
  },
  components: { TaskItem, FilterSelect },
};
</script>
