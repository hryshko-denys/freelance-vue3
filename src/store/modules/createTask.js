export default {
  namespaced: true,
  state() {
    return {
      tasks: [],
    };
  },
  mutations: {},
  actions: {
    createNewTask() {
    }
  },
  getters: {
    tasks(state) {
      return state.tasks;
    }
  }
};
