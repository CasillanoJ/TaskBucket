import { FetchTaskList } from "./fetch_tasks.js";
import { CreateFeatures } from "../Components/TaskList/task_features.js";
import { CreateFilterSidebar } from "../Components/TaskList/filter_sidebar.js";
import { toggleFilter, filterTasks } from "./filter_task.js";
import { sort } from "./sort_handler.js";
import { search } from "./search_handler.js";

export const RenderTaskTable = async (query) => {
  await FetchTaskList("", query);
};

document.addEventListener("DOMContentLoaded", async function () {

  const filterSidebar = document.getElementById("filter-sidebar");
  filterSidebar.innerHTML = CreateFilterSidebar();
  const taskFeatures = document.getElementById("features");
  taskFeatures.innerHTML = CreateFeatures();
  toggleFilter();
  filterTasks();
  sort();
  search();
  await RenderTaskTable("viewTaskList");

});
