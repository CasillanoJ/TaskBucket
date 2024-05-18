
const RenderDashboard = ()=>{
  FetchTaskList(0,5,'unassigned')
  FetchTaskList(0,5,'todo')
   FetchTaskList(0,5,'inprogress')
  FetchTaskList(0,5,'completed')
}


const DashboardAdmin = ()=>{
  const value = GetCookie("isAdmin")

  if(value == true || value =="true"){
    const container = document.getElementById('addTaskbtn-container')
    container.innerHTML = AddTaskButton()
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  DashboardAdmin()
  RenderDashboard()
}); 