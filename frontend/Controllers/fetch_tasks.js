import { CreateTable } from "../Components/TaskList/task_table.js";
import { CreateFeatures } from "../Components/TaskList/task_features.js";
import { CreateFilterSidebar } from "../Components/TaskList/filter_sidebar.js";
import { getTask } from "../API/task_table.js";
import { sortTask } from "../API/sort_task.js";
import { getFilterTasks } from "../API/get_filter_task.js"; // Import filterTasks
import { toggleFilter, filterTasks } from "./filter_task.js";
import { search } from "./search_handler.js";
import { sort } from "./sort_handler.js";

const FetchTaskList = async (
  query = "",
  dataParams = null
) => {
  const taskContainer = document.getElementById("rows");
  const filterSidebar = document.getElementById("filter-sidebar");
  const taskFeatures = document.getElementById("features");

  taskContainer.innerHTML = "";

  try {

    let data;

    if (query === "searchTask" && dataParams) {
      data = dataParams;
    } else if (query === "sortedTask" && dataParams) {
      data = dataParams;
    } else {
      data = await getTask();
      // data = await sortTask(4);
    }

    if (data.status && data.status !== 200) {
      console.error(`Error: ${data.message || "Unknown error"}`);
      return;
    }

    let tableHtml = ``;

    if (data.data && data.data.length > 0) {
      data.data.forEach((task) => {
        tableHtml += CreateTable(task);
      });
    } else {
      tableHtml = `<tr id="noTasksRow">
                      <td colspan="6" class="text-center text-gray-500 dark:text-gray-400 py-3">
                        No tasks found
                      </td>
                    </tr>`;
    }

    taskContainer.innerHTML += tableHtml;
    
    toggleFilter();
    filterTasks();
    search();
    sort();
  } catch (error) {
    console.error("Error fetching task list:", error);
  }
};

export { FetchTaskList };
