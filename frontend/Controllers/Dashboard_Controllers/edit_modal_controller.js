async function OpenEditModal(button) {
  const dataId = button.getAttribute("data-id");

  const taskTitle = document.getElementById("edit-modal-title");
  const taskStatus = document.getElementById("edit-modal-status");
  const taskAssignee = document.getElementById("edit-modal-assignee");
  const taskDueDate = document.getElementById("edit-modal-dueDate");
  const taskPriorityLevel = document.getElementById("edit-modal-priorityLevel");
  const taskDescription = document.getElementById("edit-modal-description");

  const users = await getUsers();
  const data = await getTask(dataId);
  const taskData = data.data[0];
  


  taskTitle.value = taskData.title;
  taskStatus.innerHTML = `Status: ${taskData.status}`;

  const userOptions = (users, assignee) => {
  let selectHtml = '<option value="">None</option>';

  if (assignee) {
    selectHtml += `<option value="${assignee._id}" selected>${assignee.first_name} ${assignee.last_name}</option>`;
  }

  users.forEach(user => {
    const userName = `${user.first_name} ${user.last_name}`;
    const assigneeName = assignee ? `${assignee.first_name} ${assignee.last_name}` : null;

    if (!assigneeName || userName !== assigneeName) {
      selectHtml += `<option value="${user._id}">${userName}</option>`;
    }
  });

  return selectHtml;
};

  const selectOption = (status) => {
    const statusList = ["Neutral", "High", "Urgent"];
    let selectHtml = `<option selected>${status}</option>`;

    statusList.forEach(element => {
      if (element !== status) {
        selectHtml += `<option value="${element}">${element}</option>`;
      }
    });

    return selectHtml;
  };

  taskPriorityLevel.innerHTML = selectOption(taskData.priorityLevel);
  taskAssignee.innerHTML = userOptions(users.data, taskData.assignee);


  const dateTimeString = taskData.dueDate;
  const datePart = dateTimeString
    ? new Date(dateTimeString).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  taskDueDate.defaultValue = datePart;
  taskDueDate.setAttribute("min", new Date().toISOString().split('T')[0]);
  taskDescription.value = taskData.description;

  const saveBttn = document.getElementById('edit-modal-save-bttn')
  saveBttn.setAttribute("data-id",dataId);
  saveBttn.setAttribute("data-oldStatus", data.data[0].status)
 


  


  edit_modal.showModal();
}

async function SaveEditModal(button) {
  const dataId = button.getAttribute("data-id");
  const oldStatus = button.getAttribute("data-oldStatus");
  


  const saveBttn = document.getElementById('edit-save-modal-bttn')
  saveBttn.setAttribute("data-id",dataId);
  saveBttn.setAttribute("data-oldStatus",oldStatus)



  confirm_save_modal.showModal()
  
  
}

async function ConfirmSaveBtn(button){
  const dataId = button.getAttribute("data-id");
  const oldStatus = button.getAttribute("data-oldStatus");
  const value = GetCookie("isAdmin")




  const taskTitle = document.getElementById("edit-modal-title");
  const taskAssignee = document.getElementById("edit-modal-assignee");
  const taskDueDate = document.getElementById("edit-modal-dueDate");
  const taskPriorityLevel = document.getElementById("edit-modal-priorityLevel");
  const taskDescription = document.getElementById("edit-modal-description");
  const messageContainer = document.getElementById('edit-modal-warningMsg')


 const data = await UpdateSpecificTask(dataId,taskTitle.value,taskDescription.value,taskAssignee.value,taskDueDate.value,taskPriorityLevel.value)

  
 console.log(data.status) 
 if(data.status == 500){
  messageContainer.innerHTML = ` <div role="alert" class="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Warning: Error Updating the Task!</span>
</div>`
 }else{

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
  
  
   confirm_save_modal.close()
   edit_modal.close()
  
   const modalId = `Task_modal_${dataId}`;
   const modalElement = document.getElementById(modalId);
   modalElement.close();
  
  
   
   if(oldStatus == data.data.status){
    FetchTaskList(0,5,StatusSwitch(oldStatus),value)
   }else{
    FetchTaskList(0,5,StatusSwitch(oldStatus),value)
    FetchTaskList(0,5,StatusSwitch(data.data.status),value)
   }
  
  
   succesfully_saved_modal.showModal()
   messageContainer.innerHTML = ''
 }







}

const CloseConfirmModal = ()=>{

  const messageContainer = document.getElementById('edit-modal-warningMsg').innerHTML = ''
  confirm_save_modal.close()

}