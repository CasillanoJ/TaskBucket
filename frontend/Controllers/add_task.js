const addTask = document.querySelector("#addTask-btn")
const addTaskForm = document.querySelector("#addTaskForm")

addTask.addEventListener("click", () => {
    if (addTaskForm.classList.contains("hidden")) {
        addTaskForm.classList.remove("hidden");
    } else {
        addTaskForm.classList.add("hidden");
    }
  });