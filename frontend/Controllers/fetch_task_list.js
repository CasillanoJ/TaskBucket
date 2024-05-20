import { toggleFilter, filterTasks } from "./filter_task.js";
import { CreateTable } from "../components/TaskList/task_table.js";
import { CreateFeatures } from "../components/TaskList/task_features.js";
import { CreateFilterSidebar } from "../components/TaskList/filter_sidebar.js";
import { getTaskList } from "../API/Get_taskList.js";
import { getTask } from "../API/task_table.js";
import { searchTask } from "../API/search_task.js";

const FetchTaskList = async (searchQuery = "") => {
  const taskContainer = document.getElementById("rows");
  const filterSidebar = document.getElementById("filter-sidebar");
  const taskFeatures = document.getElementById("features");

  taskContainer.innerHTML = "";

  try {
    let data;
    if (searchQuery) {
      data = await searchTask(searchQuery);
    } else {
      // data = await getTaskList();
      data = await getTask();
    }

    if (data.status == 401) {
      return;
    }

    let tableHtml = ``;

    if (data.data) {
      data.data.forEach((task) => {
        tableHtml += CreateTable(task);
      });
    }

    taskContainer.innerHTML += tableHtml;
    taskFeatures.innerHTML = CreateFeatures();

    filterSidebar.innerHTML = CreateFilterSidebar();

    filterTasks();
    toggleFilter();
  } catch (error) {
    console.error("Error fetching task list:", error);
  }
};

export { FetchTaskList };
