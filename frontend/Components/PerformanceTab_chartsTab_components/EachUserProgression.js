const EachUserProgressionBar = async(fname,lname,data)=>{

  const userProgress = await UserProgressBar(data.taskProgress,data.completedCount,data.totalTask);

  return`
  <div class="p-2 ">
  <h1 class="text-white text-md">${fname} ${lname}</h1>
  ${userProgress}
</div>
  
  `
}