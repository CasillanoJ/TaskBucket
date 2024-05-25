const OpenAddTaskModal =async ()=>{
  const addTaskAssignee = document.getElementById('add-task-modal-assignee')
  console.log(addTaskAssignee.innerHTML)

  const users = await getUsers();




  const userOptions = (usersList) => {
    let selectHtml = '<option value="">None</option>';

    usersList.forEach(user => {
      const userName = `${user.first_name} ${user.last_name}`;
      selectHtml += `<option value="${user._id}">${userName}</option>`;
     
    });
  
    return selectHtml;
  };

  addTaskAssignee.innerHTML =  userOptions(users.data);
 

  add_task_modal.showModal()
}

const AddTaskModal = async()=>{
  const value = GetCookie("isAdmin")

  const addTaskTitle = document.getElementById('add-task-modal-title')
  const addTaskDescription = document.getElementById('add-task-modal-description')
  const addTaskAssignee = document.getElementById('add-task-modal-assignee')
  const addTaskDueDate = document.getElementById('add-task-modal-dueDate')
  const addTaskPriorityLevel = document.getElementById('add-task-modal-priorityLevel')


  if(addTaskTitle.value.trim() =="" && addTaskDescription.value.trim() =="" ){
    document.getElementById('add-task-modal-title-message').innerHTML = `<div role="alert" class="alert alert-warning h-10 ">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 -mt-2" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span class="-mt-2">Warning: Title is required!</span>
  </div>`
  document.getElementById('add-task-modal-description-message').innerHTML =`
    <div role="alert" class="alert alert-warning h-10 ">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 -mt-2" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span class="-mt-2">Warning: Description is required!</span>
  </div>`
  return

  }

  if(addTaskTitle.value.trim() ==""){
    document.getElementById('add-task-modal-title-message').innerHTML = `<div role="alert" class="alert alert-warning h-10 ">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 -mt-2" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span class="-mt-2">Warning: Title is required!</span>
  </div>`
    return
  }else{
    document.getElementById('add-task-modal-title-message').innerHTML = ''
  }

  if(addTaskDescription.value.trim() ==""){
    document.getElementById('add-task-modal-description-message').innerHTML =`
    <div role="alert" class="alert alert-warning h-10 ">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 -mt-2" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span class="-mt-2">Warning: Description is required!</span>
  </div>
    `
    return
  }else{
    document.getElementById('add-task-modal-description-message').innerHTML =''
  }

  console.log(addTaskDueDate.value)

  const data = await AddTask(addTaskTitle.value,addTaskDescription.value,addTaskPriorityLevel.value,addTaskAssignee.value,addTaskDueDate.value)

  if(data.status == 500){

    return
  }

  const StatusSwitch = (data)=>{
    let text = ''
  
    switch (data) {
      case "Unassigned":
          text = 'unassigned'
        break;
      case "To do":
          text= 'todo'
        break;
     case "In progress":
          text = 'inprogress'
        break;
    
      default:
        break;
    }
    return text
   }

  
   FetchTaskList(0,5,StatusSwitch(data.data.status),value)
   add_task_modal.close()
   succesfully_added_modal.show()
  

  
  
}

const CancelAddTask = ()=>{
  document.getElementById('add-task-modal-title').value = ''
  document.getElementById('add-task-modal-description').value = ''
  document.getElementById('add-task-modal-assignee').value = ''
  document.getElementById('add-task-modal-dueDate').value = ''
  add_task_modal.close()
}