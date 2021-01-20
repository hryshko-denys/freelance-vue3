export default {
  namespaced: true,
  state() {
    return {
      todoList: [],
    };
  },
  mutations: {},
  actions: {
    createNewTask() {
      console.log("action");
    }
  },
  getters: {
    todoList(state) {
      return state.todoList;
    }
  }
};
