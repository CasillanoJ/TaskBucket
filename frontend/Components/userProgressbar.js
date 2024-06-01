const UserProgressBar  = async(taskProgress, completedCount, totalTask)=>{
  return`
  <div class="flex  space-x-5 ">
            <div class="w-96 bg-gray-200 rounded-sm dark:bg-gray-700">
              <div
                class="bg-progress-green  text-lg  font-medium text-blue-100 text-center p-2 leading-none rounded-sm"
                style="width: ${taskProgress}%"> ${taskProgress}%</div>
  
            </div>
            <span class="text-progress-count text-xl mt-1 ">${completedCount}/${totalTask}</span>
          </div>
  `
}
