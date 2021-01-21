import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default createStore({
  state() {
    return {
      tasks: [],
      activeTask: null,
      filterOption: "all",
    };
  },
  mutations: {
    ADD_TASK(state, payload) {
      state.tasks.push(payload);
    },
    SET_LOCALE_STORE(state, savedState) {
      state.tasks = savedState.tasks;
      state.activeTask = savedState.activeTask;
      state.filterOption = savedState.filterOption;
    },
    SET_ACTIVE_TASK(state, task) {
      state.activeTask = task;
    },
    CHANGE_TASK_STATUS(state, { id, status }) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          task.status = status;
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
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    CHANGE_FILTER_STATUS(state, filterOption) {
      state.filterOption = filterOption;
    },
  },
  actions: {
    createNewTask({ commit }, payload) {
      const now = new Date();
      const currentDate = +String(now.getDate()).padStart(2, "0");
      const deadline = +payload.date.value.slice(8);

      const status = deadline < currentDate ? "cancelled" : "active";
      const id = uuidv4();

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
    filteredTasks(state) {
      let filteredTasks = state.tasks;
      switch (state.filterOption) {
        case "all":
          break;
        case "active":
          filteredTasks = filteredTasks.filter(
            (task) => task.status === "active"
          );
          break;
        case "done":
          filteredTasks = filteredTasks.filter(
            (task) => task.status === "done"
          );
          break;
        case "cancelled":
          filteredTasks = filteredTasks.filter(
            (task) => task.status === "cancelled"
          );
          break;
        case "pending":
          filteredTasks = filteredTasks.filter(
            (task) => task.status === "pending"
          );
          break;
        default:
          console.log("unknown filter value");
      }
      return filteredTasks;
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
      return state.activeTask ? state.activeTask.id : "";
    },
    activeTaskStatus(state) {
      return state.activeTask ? state.activeTask.status : "";
    },
    activeTaskDate(state) {
      return state.activeTask ? state.activeTask.date : "";
    },
    activeTaskDescription(state) {
      return state.activeTask ? state.activeTask.description : "";
    },
    activeTask(state) {
      return state.activeTask;
    },
    selectedOption(state) {
      return state.filterOption;
    }
  },
  modules: {},
});
