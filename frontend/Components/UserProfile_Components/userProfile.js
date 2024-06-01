const UserProfile = async()=> {



  
return`
<div class="bg-light-overiew-bg dark:bg-secondary p-6 md:p-16 rounded-xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-4 space-y-2">
            <div class="flex flex-col ">
              <div class="flex justify-start " >
                <div class="relative  indicator">
                  <span class="indicator-item indicator-start bg-light-overiew-bg  dark:bg-secondary ml-14 -mt-1   mr-3  text-light-primary dark:text-white px-1">Start
                    Date</span>
                  <input name="start" type="date" id="performance-startDate"
                    class="bg-transparent  border  border-light-primary text-light-primary text-sm font-bold rounded-lg focus:ring-light-primary focus:border-light-primary block w-full pr-10 pt-4 pb-2.5 dark:bg-transparent dark:border-white dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-primary dark:focus:border-primary-100" />
                  <div class="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                    
      
                  </div>
                </div>
      
      
                <span class="mx-2 text-gray-500"></span>
                <div class="relative  indicator">
                  <span class="indicator-item indicator-start bg-light-overiew-bg text-light-primary dark:bg-secondary ml-14 -mt-1 mr-3 dark:text-white px-1">End Date</span>
                  <input name="end" type="date" id="performance-endDate"
                    class="bg-transparent   text-light-primary text-sm rounded-lg font-bold  focus:ring-light-primary focus:border-light-primary block w-full pr-10 pt-4 pb-2.5 dark:bg-transparent dark:border-white border-light-primary dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-primary-100 dark:focus:border-primary-100" />
                  <div class="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                    
                  </div>
                </div>
              </div>
              <div id="user-profile-progression">
      
              </div>

              

            </div>
            <div class="flex flex-col">
              <div id="user-profile-chart" class="mt-10">
                
              </div>
            </div>
          </div>
      
          
          
          

         </div>

`
}
