<template>
  <div class="form-control">
    <label class="label" for="type">{{ label }}</label>
    <select
      class="select"
      @change="filterTasks"
      v-model="filterOption"
      id="type"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        >{{ option.title }}</option
      >
    </select>
  </div>
</template>

<script>
import localStorage from "../Service/localStorage";

import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    options: Object,
    label: String,
    selectedOption: String,
  },
  setup(props) {
    const store = useStore();
    const filterOption = ref(props.selectedOption);

    function filterTasks() {
      store.commit("CHANGE_FILTER_STATUS", filterOption);
      localStorage.updateLocalStorage(store.state);
    }

    return {
      filterOption,
      filterTasks,
    };
  },
};
</script>

<style scoped>
.label {
  color: #fff;
}
.select {
  font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
  margin: 0;
  outline: none;
  border: 2px solid #ccc;
  display: block;
  width: 30%;
  color: #2c3e50;
  padding: 0.5rem 1.5rem;
  border-radius: 3px;
  font-size: 1rem;
  resize: none;
  background-color: #fff;
}
</style>
