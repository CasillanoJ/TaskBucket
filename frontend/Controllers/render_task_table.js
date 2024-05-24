import { FetchTaskList } from "./fetch_tasks.js";
import { CreateFeatures } from "../Components/TaskList/task_features.js";
import { CreateFilterSidebar } from "../Components/TaskList/filter_sidebar.js";

const RenderTaskTable = async (query) => {
  await FetchTaskList("", query);
};

document.addEventListener("DOMContentLoaded", async function () {
  const taskFeatures = document.getElementById("features");
  const filterSidebar = document.getElementById("filter-sidebar");
  taskFeatures.innerHTML = CreateFeatures();
  filterSidebar.innerHTML = CreateFilterSidebar();
  await RenderTaskTable("viewTaskList");
  
});
