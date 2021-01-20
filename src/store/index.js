import { createStore } from "vuex";
import { v4 as uuidv4 } from 'uuid';
// import createTask from './modules/createTask'

export default createStore({
  state() {
    return {
      todoList: [],
    };
  },
  mutations: {
    ADD_TODO_ITEM(state, payload) {
      state.todoList.push(payload);
      console.log(state.todoList);
    },
  },
  actions: {
    createNewTask({ commit }, payload) {
      const now = new Date();
      const currentDate = +String(now.getDate()).padStart(2, "0");
      const deadline = +payload.date.value.slice(8);

      const status =
        deadline < currentDate
          ? { title: "Отменено", class: "warning" }
          : { title: "Активный", class: "primary" };
      const id = uuidv4() // TODO
      console.log(id);
      commit("ADD_TODO_ITEM", { ...payload, status, id });
    },
  },
  getters: {
    todoList(state) {
      return state.todoList;
    },
    activeTasksNumber(state) {
      const activeTasks = state.todoList.filter(
        (todo) => todo.status.class === "primary"
      );
      return activeTasks.length;
    },
    hasTasks(state) {
      return state.todoList !== 0;
    },
  },
  modules: {
    // createTask
  },
});
