const FetchTaskList = async (status) => {
  const taskContainer = document.getElementById(`${status}-task-content`);

  let request = "";
  
  taskContainer.innerHTML = "";

  switch (status) {
    case "completed":
      request = "Completed";
      break;
    case "to-do":
      request = "To-do";
      break;
    case "in-progress":
      request = "In Progress";
      break;
    case "unassigned":
      request = "Unassigned";
      break;
    default:
      break;
  }

  let data = await getTaskList(request);

  if (data.status == 401) {
    return;
  }

  let tableHtml = ``;

  if (data.dat) {
    data.data.forEach((task) => {
      tableHtml += CreateTable(task);
    });
  }
 

  taskContainer.innerHTML += tableHtml;
};
