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
  </div>
</template>

<script>
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
      // console.log(props.task, 'props.task')
      store.commit("SET_ACTIVE_TASK", props.task);
      router.push(`/task/${props.task.id}`);
    }

    return {
      showTask,
      name: computed(() => props.task.name),
      status: computed(() => {
        console.log(props.task.status, 'status change')
        return props.task.status
      }),
      date: computed(() => props.task.date),
    };
  },
  components: { AppStatus },
};
</script>
