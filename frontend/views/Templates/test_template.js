


function getTaskList(skip, limit, status) {
  return fetch(`http://localhost:8000/users/getTaskList/${skip}?limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxMzQxNjM2MywiZXhwIjoxNzEzNDE5OTYzfQ.MXJGeqrDtmNFAG4JaHDzCQ8Pf4Z08yJVY40W1b0yZRo'
    },
    body:{

    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    throw error;
  });
}

function CreateModal(task) {

  const dateTimeString = task.dueDate;
  const datePart = dateTimeString.split('T')[0];

  let assignee

  if(task.assignee != null ) {
    assignee = task.assignee.first_name +" "+ task.assignee.last_name
  }else{
    assignee = "None"
  }

  return`
  <dialog id="Task_modal_${task._id}" class="modal"> 
  <div class="relative bg-white dark:bg-task-bg rounded-lg shadow dark:bg-dashboardBG modal-box  overflow-hidden w-11/12 max-w-2xl ">
        <!-- Modal header -->
      
        <div class="flex items-center justify-between p-4 md:p-5 border-none rounded-t dark:border-gray-600">
            <form method="dialog">
              
              <button class="btn btn-sm btn-circle btn-ghost absolute right-5 top-8 tooltip tooltip-top" data-tip="Close Modal">✕</button>
            </form>
          
        </div>
   
        <!-- Modal body -->
        <div class="p-4 md:p-5 mt-5 ms-8 ">
          
          <div class="flex items-center p-0 font-medium text-white  text-xl dark:text-white   ">
            <svg width="27" class="h-6 w-6 mt-0" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9091 0H5.95455C4.3753 0 2.86074 0.627352 1.74405 1.74405C0.627352 2.86074 0 4.3753 0 5.95455V10.7182H11.9091V0ZM26.2 10.7182V5.95455C26.2 4.3753 25.5726 2.86074 24.456 1.74405C23.3393 0.627352 21.8247 0 20.2455 0H14.2909V10.7182H26.2ZM0 17.8636C0 19.4429 0.627352 20.9574 1.74405 22.0741C2.86074 23.1908 4.3753 23.8182 5.95455 23.8182H20.2455C21.8247 23.8182 23.3393 23.1908 24.456 22.0741C25.5726 20.9574 26.2 19.4429 26.2 17.8636V13.1H0V17.8636Z" fill="#D2D0E5"/>
              </svg>
              

            <span class="ml-2 tooltip tooltip-top" data-tip="Title">${task.title}</span>
            
          </div>
            <div class="ml-20 mt-0 mb-0"> <p class="text-white"> Status: </p></div>

      <div class=" text-white ml-20 mt-0">
          <div class="inline-block p-3">
            <h1 class="text-xl">Assignee</h1>
            <h2 class="boder text-md bg-task-content text-center rounded-lg mt-0 px-5 py-1"> ${assignee}</h2>
        </div>
        <div class="inline-block p-3">
          <h1 class="text-xl">Due Date</h1>
          <h2 class="boder text-md bg-task-content text-center rounded-lg mt-0 px-5 py-1">${datePart}</h2>
        </div>
        <div class="inline-block  p-3">
          <h1 class="text-xl">Priority Level</h1>
          <h2 class="boder text-md bg-task-content text-center rounded-lg mt-0 px-5 py-1">${task.priorityLevel}</h2>
        </div> 
      </div>

      <div class="flex items-center p-0 font-medium text-white  text-xl dark:text-white mt-5  ">
        <svg class="h-6 w-6" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.8334 0.833496H3.50008C1.93466 0.833496 0.680915 2.10141 0.680915 3.66683L0.666748 26.3335C0.666748 27.8989 1.9205 29.1668 3.48591 29.1668H20.5001C22.0655 29.1668 23.3334 27.8989 23.3334 26.3335V9.3335L14.8334 0.833496ZM17.6667 23.5002H6.33341V20.6668H17.6667V23.5002ZM17.6667 17.8335H6.33341V15.0002H17.6667V17.8335ZM13.4167 10.7502V2.9585L21.2084 10.7502H13.4167Z" fill="#D2D0E5"/>
          </svg>
          

        <span class="ml-2">Description</span>
        
      </div>
      <div class="ml-20 mt-2 mb-5 me-8"> 
        <textarea class="text-white text-md bg-task-content rounded-md border-none w-full h-36 resize-none overflow-hidden overflow-y-hidden" readonly>${task.description}</textarea>
      </div>


      <div class="flex items-center p-0 font-medium text-white  text-5xl dark:text-white   ">
        <svg class="h-6 w-6 me-2" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.35436 25.4725C11.7455 25.4725 13.9937 24.5413 15.6837 22.8505L23.6958 14.8393C24.2999 14.2379 24.7788 13.5227 25.1045 12.7349C25.4303 11.9472 25.5966 11.1027 25.5938 10.2503C25.5938 8.51479 24.9194 6.88572 23.6958 5.6621C21.1657 3.13116 17.0487 3.13116 14.5194 5.6621L7.37917 12.804C7.00442 13.1768 6.70733 13.6202 6.5051 14.1087C6.30288 14.5971 6.19953 15.1207 6.20104 15.6493C6.20104 16.7267 6.61948 17.7375 7.37917 18.4963C7.75188 18.8712 8.19531 19.1684 8.68375 19.3707C9.17218 19.5729 9.6959 19.6762 10.2245 19.6745C11.3011 19.6745 12.3127 19.256 13.0715 18.4963L19.1539 12.414C19.7633 11.8046 19.7633 10.8133 19.1539 10.204C18.8606 9.91144 18.4632 9.74716 18.0489 9.74716C17.6346 9.74716 17.2373 9.91144 16.9439 10.204L10.8624 16.2863C10.6929 16.4543 10.4639 16.5484 10.2254 16.5484C9.98678 16.5484 9.75785 16.4543 9.58836 16.2863C9.42006 16.1171 9.32559 15.8881 9.32559 15.6493C9.32559 15.4106 9.42006 15.1816 9.58836 15.0123L16.7286 7.87047C17.36 7.2406 18.2154 6.88687 19.1072 6.88687C19.999 6.88687 20.8544 7.2406 21.4858 7.87047C21.7993 8.18243 22.0478 8.55346 22.217 8.96209C22.3862 9.37072 22.4726 9.80884 22.4714 10.2511C22.4714 11.1481 22.122 11.9923 21.4858 12.6293L13.4745 20.6405C12.9347 21.1832 12.2926 21.6134 11.5853 21.9063C10.8781 22.1992 10.1198 22.3489 9.35436 22.3468C8.58901 22.3489 7.83085 22.1992 7.12376 21.9063C6.41667 21.6134 5.77469 21.1832 5.23498 20.6405C4.69251 20.1008 4.26252 19.4588 3.96991 18.7516C3.67731 18.0445 3.52791 17.2864 3.53036 16.5212C3.53036 14.9628 4.13486 13.4987 5.23417 12.4002L14.4398 3.19291C15.0492 2.58354 15.0492 1.59229 14.4398 0.98291C13.8304 0.373535 12.8392 0.373535 12.2306 0.98291L3.02498 10.191C2.19168 11.0204 1.53116 12.0069 1.08166 13.0934C0.632166 14.1798 0.402614 15.3446 0.406294 16.5203C0.406294 18.914 1.33661 21.1622 3.02417 22.8505C3.85328 23.6845 4.83963 24.3457 5.9261 24.7958C7.01257 25.2459 8.17836 25.4759 9.35436 25.4725Z" fill="#D2D0E5"/>
          </svg>
          
          
          <h1 class="text-xl">Attachments</h1>

      </div>
      <input class="block w-[400px] text-md text-gray-900 border ml-20 mt-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
     
    


    
            
        </div>
        <!-- Modal footer -->
        <div class="flex justify-between items-center p-5 border-t dark:border-gray-600 mt-16 ">
          <div class="flex items-center space-x-3 sm:space-x-4">
              <button type="button" class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 border focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-task dark:hover:text-black dark:focus:ring-primary-800">
                  <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                  Edit
              </button>               
            
          </div>              
          <button type="button" class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 dark:hover:text-black"  data-modal-target="Unassigned-Task-1-modal-delete"  data-modal-toggle="Unassigned-Task-1-modal-delete" data-modal-hide="Unassigned-Task-1-modal" >
              <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              Delete
          </button>
      </div>
    
    </div>
</dialog>
  `
}


function createCard(task) {
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


async function FetchTaskList(status){
  const taskContainer = document.getElementById(`${status}-task-content`);
  let request;

  if(status == 'completed'){
    request ="Completed"
  }else if(status =='todo'){
    request = "To-Do"
  }else if(status =='inprogress'){
    request = "In Progress"
  }


  await getTaskList(0,5)
  .then(tasks => {
    document.getElementById(`${status}-count`).innerHTML = tasks.totalTask
    tasks.data.forEach(task => {

      let taskCard;
      taskCard = createCard(task);
      taskContainer.innerHTML += taskCard;

      const modal = CreateModal(task)
      const modalContainer = document.getElementById('modal-container');
      console.log(modalContainer)
      modalContainer.innerHTML += modal
    });
  })
  .catch(error => {
    console.log(error)
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error
      throw new Error('Unauthorized Error:', error);
     
    } else {
      
      throw new Error('Error:', error);
    }
  });


}

document.addEventListener("DOMContentLoaded", async function() {

  try {
    const completeTaskContent = document.getElementById("completed-task-content");
    FetchTaskList('completed')


  } catch (error) {
    console.log(error)
  }
  
});
