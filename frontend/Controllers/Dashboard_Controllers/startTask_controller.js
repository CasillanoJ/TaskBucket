const StartTask = (button)=>{
  const taskID = button.getAttribute('data-id')
  const taskStatus = button.getAttribute ('data-status')

  const ConfirmModalBttn = document.getElementById('confirm-claim-modal-bttn');
  ConfirmModalBttn.setAttribute("data-id",taskID)
  ConfirmModalBttn.setAttribute("data-status",taskStatus)

  let confirmMessage = ''
  let succesfullyMessage = ''

  switch (taskStatus) {
    case "Unassigned":
      confirmMessage = 'Claim'
      succesfullyMessage = 'Claimed'
      break;
   case "To do":
       confirmMessage = 'Start'
        succesfullyMessage = 'Started'
        break;
  case "In progress":
      confirmMessage = 'Complete'
      succesfullyMessage = 'Completed'
      break;     
    
    default:
      break;
  }

  document.getElementById('confirmation-task-message').innerHTML = confirmMessage
  document.getElementById('succesfully-task-message').innerHTML = succesfullyMessage
  confirm_claimTask_modal.showModal()

}

const ConfirmStartTask = async(button)=>{
  const taskID = button.getAttribute('data-id')
  const taskStatus = button.getAttribute ('data-status')
  const value = GetCookie("isAdmin")

  console.log(taskID)
  console.log(taskStatus)

   const data = await UpdateTaskStatus(taskID,taskStatus)

   console.log(data)

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
     case "Completed":
          text = 'completed'
    break;
    
      default:
        break;
    }
    return text
   }
  
   

   FetchTaskList(0,5,StatusSwitch(taskStatus),value)
   FetchTaskList(0,5,StatusSwitch(data.data.status),value)

  const modalId = `Task_modal_${taskID}`;
  const modalElement = document.getElementById(modalId);
  modalElement.close();
  confirm_claimTask_modal.close()
  succesfully_claimTask_modal.showModal()

}