import { searchHandler } from "./search_handler.js";
import { toggleFilter, filterTasks } from "./filter_task.js";

document.addEventListener("DOMContentLoaded", () => {
  searchHandler();
  toggleFilter();
  filterTasks();
});
