import { FetchTaskList } from "./fetch_task_list.js";

const RenderTaskTable = async () => {
 await FetchTaskList();
};

document.addEventListener("DOMContentLoaded", async function () {
  RenderTaskTable();
});
