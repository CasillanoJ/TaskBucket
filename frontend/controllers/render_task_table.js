const RenderTaskTable = () => {
  FetchTaskList("unassigned");
  FetchTaskList("to-do");
  FetchTaskList("in-progress");
  FetchTaskList("completed");
};

document.addEventListener("DOMContentLoaded", async function () {
  RenderTaskTable();
});
