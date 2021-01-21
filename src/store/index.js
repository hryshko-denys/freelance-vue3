import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
// import createTask from './modules/createTask'

export default createStore({
  state() {
    return {
      tasks: [],
      activeTask: null,
    };
  },
  mutations: {
    ADD_TASK(state, payload) {
      state.tasks.push(payload);
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_ACTIVE_TASK(state, task) {
      state.activeTask = task;
    },
    CHANGE_TASK_STATUS(state, { id, status }) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status,
          };
        }

        return task;
      });

      console.log(state.tasks[0]);
    },
    CHANGE_ACTIVE_TASK_STATUS(state, { status }) {
      state.activeTask = {
        ...state.activeTask,
        status,
      };
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
    changeTaskStatus({ commit }, payload) {
      commit("CHANGE_TASK_STATUS", payload);
      commit("CHANGE_ACTIVE_TASK_STATUS", payload);
    },
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    activeTasksNumber(state) {
      const activeTasks = state.tasks.filter(
        (task) => task.status === "active"
      );
      return activeTasks.length;
    },
    hasTasks(state) {
      return state.tasks !== 0;
    },
    activeTaskId(state) {
      return state.activeTask.id;
    },
    activeTaskStatus(state) {
      console.log(state, "props.task");

      return state.activeTask.status;
    },
    activeTaskDate(state) {
      return state.activeTask.date;
    },
    activeTaskDescription(state) {
      return state.activeTask.description;
    },
    activeTask(state) {
      return state.activeTask;
    },
  },
  modules: {
    // createTask
  },
});
