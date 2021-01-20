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
    <button class="btn primary" @click="showTodo">Посмотреть</button>
  </div>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["task"],
  setup(props) {
    const router = useRouter()
    console.log(props.task);

    function showTodo() {
      router.push(`/task/${props.task.id}`)
      console.log('hello')
    }
    return {
      showTodo,
      name: computed(() => props.task.name),
      status: computed(() => props.task.status),
      date: computed(() => props.task.date),
    };
  },
  components: { AppStatus },
};
</script>
