
const  FetchTaskList = async(skip,limit,status) =>{
    const taskContainer = document.getElementById(`${status}-task-content`);
    const modalContainer = document.getElementById(`${status}-modal-container`);
    const taskCountContainer = document.getElementById(`${status}-task-count`)

    let request = '';

    
    taskContainer.innerHTML = Spinner(status);
    




  const spinner = document.getElementById(`${status}-spinner`)
  spinner.classList.add('animate-spin');
    await new Promise(resolve => setTimeout(resolve, 500)); 
    spinner.classList.remove('animate-spin');

    modalContainer.innerHTML ='';
    taskContainer.innerHTML = '';
   



    switch (status) {
      case 'completed':
          request = "Completed";
          break;
      case 'todo':
          request = "To-do";
          break;
      case 'inprogress':
          request = "In Progress";
          break;
      case 'unassigned':
          request = "Unassigned";
          break;
      default:
        
          break;
  }
    

  
     let data = await getTaskList(skip,limit,request)
    

    if (data.status == 401 ){
      
      return
    }

    if(data.message == "No Task Completed Yet"){
      taskContainer.innerHTML = `<h1 class='flex justify-center text-light-primary dark:text-primary'> ${data.message} </h1>`
      
    }


     let cardHtml = ``
     let modalHtml = ``

      if(!data.total ){
        data.total = 0
      }
    
     if(data.data && data.total){
      data.data.forEach(task =>{
        cardHtml += CreateCard(task);
        modalHtml += CreateModal(task)
     })
     if(data.total > limit){
      cardHtml += DashboardPagination(limit,data.total,skip,status)
     }
    
    
     }
    
   
     
    taskCountContainer.innerHTML = data.total 

    taskContainer.innerHTML += cardHtml
    modalContainer.innerHTML += modalHtml
     
  }


