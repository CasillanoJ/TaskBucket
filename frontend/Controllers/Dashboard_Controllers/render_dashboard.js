


const RenderDashboard = ()=>{
  const value = GetCookie("isAdmin")

  FetchTaskList(0,5,'unassigned',value)
  FetchTaskList(0,5,'todo',value)
   FetchTaskList(0,5,'inprogress',value)
  FetchTaskList(0,5,'completed',value)
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