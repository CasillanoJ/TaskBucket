const UserProgressionCard = (id,userFname,userLname,performance)=>{
    return`
    <div class="performance-overview-container  hover:border hover:border-light-primary dark:border-primary-100" onclick="my_modal_${id}.showModal()">
    <h1 class="performance-overview-name">${userFname} ${userLname}</h1>
    <h2 class="performance-overview-text">Owned task: <span class="performance-text-counter">${performance.totalTask}</span></h2>
    <h2 class="performance-overview-text">Completed task: <span class="performance-text-counter">${performance.completedCount}</span></h2>
    <h2 class="performance-overview-text">In Porgress tasks: <span class="performance-text-counter">${performance.totalInprogress}</span></h2>
    <h2 class="performance-overview-text">Claimed tasks: <span class="performance-text-counter">${performance.totalClaimed}</span></h2>
  </div>
    
    `
}