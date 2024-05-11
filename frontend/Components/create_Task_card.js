const CreateCard = (task)=> {
    const dateTimeString = task.dueDate;
    const datePart = dateTimeString.split('T')[0];
  
    let owner 
    let color;
  
    if(task.assignee != null){
      owner = task.assignee.first_name +" "+ task.assignee.last_name
    }else{
      owner = "Pending"
    }
  
    switch (task.priorityLevel) {
      case "Urgent":
        color = "bg-red-500";
        break;
      case "High":
        color = "bg-yellow-400";
        break;
      case "Neutral":
        color = "bg-gray-400";
        break;
    }
  
    return `
    <div class="w-100 p-4 group" id="${task._id}" data-id="${task._id}" onclick="Task_modal_${task._id}.showModal()" >
          <div class="flex items-start bg-task-content rounded-xl shadow-lg h-40 dark:hover:border-2 dark:hover:border-task">
              <div class="tooltip tooltip-right text-2xl " data-tip="${task.priorityLevel}" >
                <div class="w-6 h-40 max-h-64 overflow-y-auto ${color} rounded-l-xl" >
                  <!-- COLOR INDICATOR -->
                </div>
            </div>
                <div class="ml-5 mt-3 flex-grow">
                  <h1 class="text-white text-xl mt-5">${task.title}</h1>
                  <p class="text-second-text-color mt-1">Owner: ${owner}</p>
                  <p class="text-second-text-color mt-1">Due Date: ${datePart}</p>
                </div>
              <div class="items-center  mr-5 p-3  mt-14">
                <button class="group ms-2 group-hover:visible invisible">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white   " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                  </svg>
                </button>
                
              <button class="group ms-2 group-hover:visible invisible">
                <svg class="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
                
              </button>
  
            
            </div>
        </div>
    </div>
    `;
  }