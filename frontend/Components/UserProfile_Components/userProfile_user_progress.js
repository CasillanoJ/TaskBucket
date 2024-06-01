const UserProfileProgression = async(performance)=>{
  return`
  <div class="bg-light-overiew-bg dark:bg-task-content h-60 lg:h-96 xl:h-64  rounded-xl px-2 py-5 w-1/2 mt-5 " >

  <h2 class="performance-overview-text">Owned task: <span class="performance-text-counter">${performance.totalTask}</span></h2>
  <h2 class="performance-overview-text">Completed task: <span class="performance-text-counter">${performance.completedCount}</span></h2>
  <h2 class="performance-overview-text">In Porgress tasks: <span class="performance-text-counter">${performance.totalInprogress}</span></h2>
  <h2 class="performance-overview-text">Claimed tasks: <span class="performance-text-counter">${performance.totalClaimed}</span></h2>
</div>
  
  `
}