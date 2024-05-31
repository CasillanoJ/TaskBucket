const OpenDeleteModal = (button)=>{
  const dataId = button.getAttribute("data-id");

 const confirmBttn = document.getElementById('confirm-delete-modal-btn')

 confirmBttn.setAttribute('data-id',dataId)
 


  confirm_delete_modal.showModal()



  
}

const ConfirmDeleteModal = async(button)=>{
  const value = GetCookie("isAdmin")
  const dataId = button.getAttribute("data-id");
  

  const data = await DeleteTask(dataId)
  if(data.status == 500){
   
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
    
    
   
    
     const modalId = `Task_modal_${dataId}`;
     const modalElement = document.getElementById(modalId);
     modalElement.close();
  
     
   
    FetchTaskList(0,5,StatusSwitch(data.data.status),value)
     
  
    confirm_delete_modal.close()
    succesfully_delete_modal.show()
   }


  
}