<template>
  <div class="card">
    <h2 class="card-title">
      {{ name }}
      <AppStatus :type="status" />
    </h2>
    <p>
      <strong>
        <small>
          {{ task.date }}
        </small>
      </strong>
    </p>
    <button class="btn primary" @click="showTask">Посмотреть</button>
    <button class="btn danger delete" @click="deleteTask">X</button>
  </div>
</template>

<script>
import localStorage from "../Service/localStorage";

import AppStatus from "../components/AppStatus";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: ["task"],
  setup(props) {
    const router = useRouter();
    const store = useStore();

    function showTask() {
      store.commit("SET_ACTIVE_TASK", props.task);
      router.push(`/task/${props.task.id}`);
    }

    function deleteTask() {
      const question = "Are you sure?";
      const answer = confirm(question);

      if (answer) {
        store.commit("DELETE_TASK", props.task.id);

        localStorage.updateLocalStorage(store.getters.tasks);
      }
    }

    return {
      showTask,
      name: computed(() => props.task.name),
      status: computed(() => props.task.status),
      date: computed(() => props.task.date),
      deleteTask,
    };
  },
  components: { AppStatus },
};
</script>
