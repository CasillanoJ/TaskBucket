const CreateCard = (task,isAdmin)=> {
    const dateTimeString = task.dueDate;
    let datePart = ''
    if(!dateTimeString){
      datePart = "None"
    }else{
      datePart = dateTimeString.split('T')[0];
    }
    
  
    let owner 
    let color;
  
    if(task.assignee != null){
      owner = task.assignee.first_name +" "+ task.assignee.last_name
    }else{
      owner = "Pending"
    }
  
    switch (task.priorityLevel) {
      case "Urgent":
        color = "indactor-color-urgent";
        break;
      case "High":
        color = "indactor-color-high";
        break;
      case "Neutral":
        color = "indactor-color-neutral";
        break;
    }

    let editBttn = ''
    let deleteBttn = ''


    const EditButton = (id)=>{
      return`
      <button class="group ms-2 group-hover:visible invisible tooltip tooltip-right" data-tip="Edit Task"  data-id="${id}" onclick="OpenEditModal(this)">
                    <svg class="w-6 h-6 text-light-primary dark:text-white   " aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24  " height="24" class="" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                    </svg>
                  </button>
      `
    }
    const DeleteButton = (id)=>{
    //   return`
    //   <button class="group ms-2 group-hover:visible invisible" data-id="${id}" onclick="OpenDeleteModal(this)">
    //   <svg class="w-6 h-6 text-light-primary dark:text-white " aria-hidden="true"
    //     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    //     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //       d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
    //   </svg>

    // </button>
    //   `
    }

    if(isAdmin == true || isAdmin == "true"){
      editBttn = EditButton(task._id)
      // deleteBttn = DeleteButton(task._id)

    }




    return `

    <div class="w-100 p-2 group h-auto" id="${task._id}" data-id="${task._id}" onclick="Task_modal_${task._id}.showModal()">
    <div class="grid grid-cols-[auto_1fr_auto] bg-light-overiew-bg dark:bg-task-content rounded-xl shadow-lg h-32 hover:border-light-primary hover:border-2 dark:hover:border-primary-100">
      <div class="tooltip tooltip-top text-2xl" data-tip="${task.priorityLevel}">
        <div class="w-6 h-32 max-h-64 overflow-y-auto ${color} rounded-l-lg">
          <!-- COLOR INDICATOR -->
        </div>
      </div>
      <div class="ml-5 mt-3 block truncate">
        <h1 class="text-black dark:text-white text-xl mt-3 md:text-md lg:text-lg break-words ">${task.title}</h1>
        <p class="text-gray-400 dark:text-second-text-color mt-1 md:text-sm">Owner: ${owner}</p>
        <p class="text-gray-400  dark:text-second-text-color mt-1 md:text-sm">Due Date: <span>${datePart}</span></p>
      </div>
      <div class="flex p-3 mt-14 justify-end space-x-2">
        ${editBttn}
        ${deleteBttn}
      </div>
    </div>
  </div>
    `;
  }