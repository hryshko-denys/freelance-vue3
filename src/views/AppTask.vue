<template>
  <div class="card" v-if="isTaskExist">
    <h2></h2>
    <p><strong>Cтатус:</strong> <AppStatus :type="status" /></p>
    <p><strong>Дэдлайн</strong>: {{ date }}</p>
    <p><strong>Описание</strong>: {{ description }}</p>
    <div>
      <button class="btn" @click="changeStatus('active')">
        Взять в работу
      </button>
      <button class="btn primary" @click="changeStatus('done')">
        Завершить
      </button>
      <button class="btn danger" @click="changeStatus('cancelled')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ currentId }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from "../components/AppStatus";
import localStorage from "../Service/localStorage";

import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const currentId = route.params.taskId;

    function changeStatus(status) {
      store.dispatch("changeTaskStatus", {
        id: store.getters.activeTaskId,
        status,
      });

      localStorage.updateLocalStorage(store.state);
    }

    return {
      currentId,
      status: computed(() => store.getters.activeTaskStatus),
      date: computed(() => store.getters.activeTaskDate),
      description: computed(() => store.getters.activeTaskDescription),
      isTaskExist: computed(() => store.getters.activeTask),
      changeStatus,
    };
  },
  components: { AppStatus },
};
</script>

<style scoped></style>
