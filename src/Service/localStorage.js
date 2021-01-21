function updateLocalStorage(tasks) {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.log(error.message);
  }
}

function getTasksFromStorage() {
  if (localStorage.tasks) {
    return JSON.parse(localStorage.getItem('tasks'))
  } else {
    return []
  }
}

export default {
  updateLocalStorage,
  getTasksFromStorage
};
