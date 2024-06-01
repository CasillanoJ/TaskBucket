import { CreateTable } from "../../Components/TaskList/task_table.js";
import { getTask } from "../../API/task_table.js";

const FetchTaskList = async (query = "" ,dataParams = null) => {
  const taskContainer = document.getElementById("rows");
  const modalContainer = document.getElementById("modal-container");

  taskContainer.innerHTML = "";
  modalContainer.innerHTML = "";

  let isAdmin = GetCookie("isAdmin");

  try {
    let data;

    if (query === "searchTask" && dataParams) {
      data = dataParams;
    } else if (query === "sortedTask" && dataParams) {
      data = dataParams;
    } else {
      data = await getTask();
    }

    if (data.status && data.status !== 200) {
      console.error(`Error: ${data.message || "Unknown error"}`);
      return;
    }

    let tableHtml = ``;

    if (data.data && data.data.length > 0) {
      data.data.forEach((task) => {
        modalContainer.innerHTML += CreateModal(task, isAdmin);
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
  } catch (error) {
    console.error("Error fetching task list:", error);
  }
};

export { FetchTaskList };
