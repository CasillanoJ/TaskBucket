const ProgressionModal = async(id,firstName,lastName,data)=>{

  const userProgressBar = await UserProgressBar(data.taskProgress,data.completedCount,data.totalTask);
  return`
  <dialog id="my_modal_${id}" class="modal">
      <div class="relative bg-white dark:bg-task-bg rounded-lg shadow  modal-box  overflow-hidden w-11/12 max-w-2xl border border-black">
        <h1 class="text-xl text-black font-medium dark:text-white ">${firstName} ${lastName}</h1>
        <form method="dialog">
          <button class=" group  bg-transparent absolute right-2 top-2"><svg class="w-6 h-6 text-gray-800 dark:text-white group-hover:text-light-primary dark:group-hover:text-primary-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
          </svg>
          </button>
        </form>
        <div class="mt-5">
          <h1 class=" text-progress-count">Total completed tasks / Total tasks</h1>
          ${userProgressBar}
          <div class="bg-light-overiew-bg dark:bg-task-content h-60 lg:h-96 xl:h-64  rounded-xl mt-2 px-2 py-5 w-auto grid grid-cols-2">
            <div class="border-r ">
              <h2 class="performance-overview-text">Owned task: <span class="performance-text-counter">${data.totalTask}</span></h2>
            <h2 class="performance-overview-text">Completed task: <span class="performance-text-counter">${data.completedCount}</span></h2>
            <h2 class="performance-overview-text">In Porgress tasks: <span class="performance-text-counter">${data.totalInprogress}</span></h2>
            <h2 class="performance-overview-text">Late tasks: <span class="performance-text-counter">${data.totalLateTask}</span></h2>

            </div>
            <div class="">
              <h2 class="performance-overview-text">Claimed tasks: <span class="performance-text-counter">${data.totalClaimed}</span></h2>
              <h2 class="performance-overview-text">Urgent: <span class="performance-text-counter">${data.totalUrgent}</span></h2>
              <h2 class="performance-overview-text">High: <span class="performance-text-counter">${data.totalHigh}</span></h2>
              <h2 class="performance-overview-text">Neutral <span class="performance-text-counter">${data.totalNeutral}</span></h2>

            </div>
            
          </div>
          <div id="user-chart-${id}" class="mt-5 flex justify-center">

          </div>
        </div>
        
        
        
      </div>
    </dialog>
  `
}