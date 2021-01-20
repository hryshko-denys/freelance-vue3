<template>
  <div class="card" v-if="hasTodo">
    <h2></h2>
    <p>
      <strong>{{ status.title }}</strong
      >: <AppStatus :type="status" />
    </p>
    <p><strong>Дэдлайн</strong>: {{ date }}</p>
    <p><strong>Описание</strong>: {{ description }}</p>
    <div>
      <button class="btn">Взять в работу</button>
      <button class="btn primary">Завершить</button>
      <button class="btn danger">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ currentId }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from "../components/AppStatus";

import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const currentId = route.params.taskId;
    const currentTodo = store.state.todoList.find(
      (todo) => todo.id === currentId
    );

    const status = computed(() => {
      return currentTodo.status;
    });

    const date = computed(() => {
      return currentTodo.date;
    });

    const description = computed(() => {
      return currentTodo.description;
    });

    const hasTodo = computed(() => {
      return !!currentTodo;
    });

    return {
      currentId,
      status,
      date,
      description,
      hasTodo
    };
  },
  components: { AppStatus },
};
</script>

<style scoped></style>
