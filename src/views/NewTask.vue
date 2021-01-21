<template>
  <form class="card" @submit.prevent="createNewTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="name" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="description"></textarea>
    </div>

    <button :disabled="!isFormValid" class="btn primary" type="submit">Создать</button>
  </form>
</template>

<script>
import localStorage from "../Service/localStorage";

import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const name = ref("");
    const date = ref(null);
    const description = ref("");

    const isFormValid = computed(() => {
      return name.value && date.value && description.value;
    });

    function createNewTask() {
      store.dispatch("createNewTask", {
        name,
        date,
        description,
      });

      router.push("/");
      localStorage.updateLocalStorage(store.state);
    }

    return {
      name,
      date,
      description,
      createNewTask,
      isFormValid,
    };
  },
};
</script>
