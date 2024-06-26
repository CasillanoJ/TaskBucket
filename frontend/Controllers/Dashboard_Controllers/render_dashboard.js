


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

const RenderEditModal =async()=>{
  const value = GetCookie("isAdmin")

  if(value == "true" || value == true){
    document.getElementById('edit-modal').innerHTML = await CreateEditModal();
    document.getElementById('confirm-delete-container').innerHTML = await CreateDeleteModal();
  }else{
    document.getElementById('confirm-modal-container').innerHTML = await ClaimTaskModal();
  }


}

document.addEventListener("DOMContentLoaded", async function() {
  DashboardAdmin()
  RenderEditModal()
  RenderDashboard()
  
}); 