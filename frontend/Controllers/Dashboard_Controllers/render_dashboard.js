
const RenderDashboard = ()=>{
  FetchTaskList(0,5,'unassigned')
  FetchTaskList(0,5,'todo')
   FetchTaskList(0,5,'inprogress')
  FetchTaskList(0,5,'completed')
}




document.addEventListener("DOMContentLoaded", async function() {
  await RenderSideBar()
  RenderDashboard()
}); 