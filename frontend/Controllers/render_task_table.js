import { FetchTaskList } from "./fetch_tasks.js";
import { CreateFeatures } from "../Components/TaskList/task_features.js";
import { CreateFilterSidebar } from "../Components/TaskList/filter_sidebar.js";

const RenderTaskTable = async (query) => {
  await FetchTaskList("", query);
};


document.addEventListener("DOMContentLoaded", async function () {
   const filterSidebar = document.getElementById("filter-sidebar");
   filterSidebar.innerHTML = CreateFilterSidebar();
   const taskFeatures = document.getElementById("features");
   taskFeatures.innerHTML = CreateFeatures();
  await RenderTaskTable("viewTaskList");
});

