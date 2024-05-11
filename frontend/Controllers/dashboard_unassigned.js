console.log('hello')


const  FetchTaskList = async(status) =>{
    const taskContainer = document.getElementById(`${status}-task-content`);
    const modalContainer = document.getElementById('modal-container');
    let request;
  
    if(status == 'completed'){
      request ="Completed"
    }else if(status =='todo'){
      request = "To-Do"
    }else if(status =='inprogress'){
      request = "In Progress"
    }
    
  
     let data = await getTaskList(0,5)


     let cardHtml = ``
     let modalHtml = ``

     data.forEach(task =>{
        cardHtml += CreateCard(task);
        modalHtml += CreateModal(task)
     })
    

    taskContainer.innerHTML += cardHtml
    modalContainer.innerHTML += modalHtml
     
  }

//   FetchTaskList('completed')

  document.addEventListener("DOMContentLoaded", async function() {

    try {
     
      FetchTaskList('completed')
  
  
    } catch (error) {
      console.log(error)
    }
    
  });