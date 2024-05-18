import { toggleFilter, filterTasks } from "./filter_task.js";

document.addEventListener("click", () => {
  toggleFilter();
  filterTasks();
});

