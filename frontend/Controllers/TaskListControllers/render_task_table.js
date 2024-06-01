import { FetchTaskList } from "./fetch_tasks.js";
import { CreateFeatures } from "../../Components/TaskList/task_features.js";
import { CreateFilterSidebar } from "../../Components/TaskList/filter_sidebar.js";
import { toggleFilter, filterTasks } from "./filter_task.js";
import { sort } from "./sort_handler.js";
import { search } from "./search_handler.js";
// import { CreateDeleteModal } from "../../Components/TeamList/delete_modal.js";
// import { deleteMember } from "../ViewTeamControllers/navigate_content.js";
// import { OpenEditModal } from "./edit_delete_controller.js";

export const RenderTaskTable = async (query) => {
  await FetchTaskList("", query);
};

const RenderEditModal = async () => {
  const editModalContainer = document.getElementById("edit-modal");
  const addTaskModalContainer = document.getElementById(
    "add-task-modal-container"
  );
  const deleteModalContainer = document.getElementById(
    "confirm-delete-container"
  );
  editModalContainer.innerHTML += await CreateEditModal();
  deleteModalContainer.innerHTML += await CreateDeleteModal();
  addTaskModalContainer.innerHTML += await AddTaskButton();
};
document.addEventListener("DOMContentLoaded", async function () {
  RenderEditModal();
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
