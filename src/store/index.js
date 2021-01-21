import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
// import createTask from './modules/createTask'

export default createStore({
  state() {
    return {
      tasks: [],
    };
  },
  mutations: {
    ADD_TASK(state, payload) {
      state.tasks.push(payload);
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    createNewTask({ commit }, payload) {
      const now = new Date();
      const currentDate = +String(now.getDate()).padStart(2, "0");
      const deadline = +payload.date.value.slice(8);

      const status = deadline < currentDate ? "cancelled" : "active";
      const id = uuidv4();
      console.log(id);
      commit("ADD_TASK", { ...payload, status, id });
    },
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    activeTasksNumber(state) {
      const activeTasks = state.tasks.filter(
        (task) => task.status.class === "primary"
      );
      return activeTasks.length;
    },
    hasTasks(state) {
      return state.tasks !== 0;
    },
  },
  modules: {
    // createTask
  },
});
