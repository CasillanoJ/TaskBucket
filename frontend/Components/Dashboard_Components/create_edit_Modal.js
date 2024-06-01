const CreateEditModal = async() => {
    return `
    <dialog id="edit_modal" class="modal" data-id=""> 
      <div class="relative bg-white dark:bg-task-bg rounded-lg shadow dark:bg-dashboardBG modal-box  overflow-hidden w-11/12 max-w-2xl ">
            <!-- Modal header -->
          
            <div class="flex items-center justify-between p-4 md:p-5 border-none rounded-t dark:border-gray-600">
                <form method="dialog">
                  
                  <button class="btn btn-sm btn-circle btn-ghost absolute right-5 top-8 tooltip tooltip-top" data-tip="Close Modal">✕</button>
                </form>
              
            </div>
       
            <!-- Modal body -->
            
            <div class="p-4 md:p-5 -mt-5 ms-8 ">
              
              <div class="flex items-center p-0 font-medium text-black  text-xl dark:text-white   ">
                <svg width="27" class="h-6 w-6 mt-0 fill-black dark:fill-primary-100" viewBox="0 0 27 24"  xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9091 0H5.95455C4.3753 0 2.86074 0.627352 1.74405 1.74405C0.627352 2.86074 0 4.3753 0 5.95455V10.7182H11.9091V0ZM26.2 10.7182V5.95455C26.2 4.3753 25.5726 2.86074 24.456 1.74405C23.3393 0.627352 21.8247 0 20.2455 0H14.2909V10.7182H26.2ZM0 17.8636C0 19.4429 0.627352 20.9574 1.74405 22.0741C2.86074 23.1908 4.3753 23.8182 5.95455 23.8182H20.2455C21.8247 23.8182 23.3393 23.1908 24.456 22.0741C25.5726 20.9574 26.2 19.4429 26.2 17.8636V13.1H0V17.8636Z" />
                  </svg>
                  
    
                  <span class="ml-2 tooltip tooltip-top font-medium text-black  text-xl dark:text-white bg-transparent text-left border-0  " data-tip="Enter New Title" >
                    <input type="text" id="edit-modal-title" class="bg-transparent rounded-lg" value="Test">
                  </span>
   
              
                
              </div>
                <div class="ml-8 mt-5 mb-0 flex"> 
                  <p class="text-black dark:text-white  flex" data-tip=""  > Status:      
              <span id="edit-modal-status"></span>
                   
                    
                  </p>
                 
                </div>
    
          <div class=" text-white  mt-10">
              <div class="inline-block p-3 " id="" >
                <h1 class="text-xl text-black dark:text-white">Assignee</h1>
                <div class="tooltip tooltip-top" data-tip="Select new assignee">
                  <select id="edit-modal-assignee" class="block w-full p-2 mb-6 text-sm text-black dark:text-white border-0 border-gray-300 rounded-lg bg-light-overiew-bg dark:bg-task-content  "  >
              
                  </select>

                </div>
                
              
                  
                </h2>
            </div>
            <div class="inline-block p-3">
              <h1 class="text-xl text-black dark:text-white " id="">Due Date</h1>
              <div class="tooltip tooltip-top" data-tip="Select new due date">
                <input type="date" name="" class="bg-transparent text-black dark:text-white border-0 border-gray-300 rounded-lg bg-light-overiew-bg dark:bg-task-content" id="edit-modal-dueDate"  >
              </div>
              
            </div>
            <div class="inline-block  p-3">
              <h1 class="text-xl text-black dark:text-white" >Priority Level</h1>
              
              <div class="tooltip tooltip-top" data-tip="Select new priority level">
                <select id="edit-modal-priorityLevel" class="block w-full p-2 mb-6 text-sm text-black dark:text-white border-0 border-gray-300 rounded-lg bg-light-overiew-bg dark:bg-task-content">
                  
                
                </select>

              </div>
              
            </div> 
          </div>
    
          <div class="flex items-center p-0 font-medium text-white  text-xl dark:text-white mt-5  ">
            <svg class="h-6 w-6 fill-black dark:fill-primary-100" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.8334 0.833496H3.50008C1.93466 0.833496 0.680915 2.10141 0.680915 3.66683L0.666748 26.3335C0.666748 27.8989 1.9205 29.1668 3.48591 29.1668H20.5001C22.0655 29.1668 23.3334 27.8989 23.3334 26.3335V9.3335L14.8334 0.833496ZM17.6667 23.5002H6.33341V20.6668H17.6667V23.5002ZM17.6667 17.8335H6.33341V15.0002H17.6667V17.8335ZM13.4167 10.7502V2.9585L21.2084 10.7502H13.4167Z" />
              </svg>
              
    
            <span class="ml-2">Description</span>
            
          </div>
          <div class=" mt-2 mb-5 me-8 border dark:border-0 border-black flex tooltip tooltip-top" data-tip="Enter new description"> 
            <textarea class="text-black border-2 border-black dark:border-0 dark:text-white text-md bg-light-overiew-bg dark:bg-task-content rounded-md border-none w-full h-36 resize-none overflow-hidden overflow-y-hidden" id="edit-modal-description" ></textarea>
          </div>
    
    
          <div class="flex items-center p-0 font-medium text-white  text-5xl dark:text-white   ">
            <svg class="h-6 w-6 me-2 fill-black dark:fill-primary-100" viewBox="0 0 26 26"  xmlns="http://www.w3.org/2000/svg">
              <path d="M9.35436 25.4725C11.7455 25.4725 13.9937 24.5413 15.6837 22.8505L23.6958 14.8393C24.2999 14.2379 24.7788 13.5227 25.1045 12.7349C25.4303 11.9472 25.5966 11.1027 25.5938 10.2503C25.5938 8.51479 24.9194 6.88572 23.6958 5.6621C21.1657 3.13116 17.0487 3.13116 14.5194 5.6621L7.37917 12.804C7.00442 13.1768 6.70733 13.6202 6.5051 14.1087C6.30288 14.5971 6.19953 15.1207 6.20104 15.6493C6.20104 16.7267 6.61948 17.7375 7.37917 18.4963C7.75188 18.8712 8.19531 19.1684 8.68375 19.3707C9.17218 19.5729 9.6959 19.6762 10.2245 19.6745C11.3011 19.6745 12.3127 19.256 13.0715 18.4963L19.1539 12.414C19.7633 11.8046 19.7633 10.8133 19.1539 10.204C18.8606 9.91144 18.4632 9.74716 18.0489 9.74716C17.6346 9.74716 17.2373 9.91144 16.9439 10.204L10.8624 16.2863C10.6929 16.4543 10.4639 16.5484 10.2254 16.5484C9.98678 16.5484 9.75785 16.4543 9.58836 16.2863C9.42006 16.1171 9.32559 15.8881 9.32559 15.6493C9.32559 15.4106 9.42006 15.1816 9.58836 15.0123L16.7286 7.87047C17.36 7.2406 18.2154 6.88687 19.1072 6.88687C19.999 6.88687 20.8544 7.2406 21.4858 7.87047C21.7993 8.18243 22.0478 8.55346 22.217 8.96209C22.3862 9.37072 22.4726 9.80884 22.4714 10.2511C22.4714 11.1481 22.122 11.9923 21.4858 12.6293L13.4745 20.6405C12.9347 21.1832 12.2926 21.6134 11.5853 21.9063C10.8781 22.1992 10.1198 22.3489 9.35436 22.3468C8.58901 22.3489 7.83085 22.1992 7.12376 21.9063C6.41667 21.6134 5.77469 21.1832 5.23498 20.6405C4.69251 20.1008 4.26252 19.4588 3.96991 18.7516C3.67731 18.0445 3.52791 17.2864 3.53036 16.5212C3.53036 14.9628 4.13486 13.4987 5.23417 12.4002L14.4398 3.19291C15.0492 2.58354 15.0492 1.59229 14.4398 0.98291C13.8304 0.373535 12.8392 0.373535 12.2306 0.98291L3.02498 10.191C2.19168 11.0204 1.53116 12.0069 1.08166 13.0934C0.632166 14.1798 0.402614 15.3446 0.406294 16.5203C0.406294 18.914 1.33661 21.1622 3.02417 22.8505C3.85328 23.6845 4.83963 24.3457 5.9261 24.7958C7.01257 25.2459 8.17836 25.4759 9.35436 25.4725Z" />
              </svg>
              
              
              <h1 class="text-xl text-black dark:text-white">Attachments</h1>
    
          </div>
         
            <input class="block w-[400px] text-md text-gray-900 border ml-8 mt-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
         
          
         
        
    
         
                <div class="space-x-2 flex justify-end items-center mt-10">
                <button type="button" id="edit-modal-save-bttn" onclick="SaveEditModal(this)"   class=" text-white dark:text-black border-0 inline-flex items-center bg-primary-700 hover:bg-primary-800  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-xl px-5 py-2 text-center dark:bg-primary-600  bg-light-primary  dark:bg-primary-100 dark:hover:text-black dark:focus:ring-primary-800 dark:hover:bg-primary-200 hover:bg-light-primary-active rounded-full">
                <svg class="w-6 h-6 text-white dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
            </svg>
            
                Save
            </button>      
            <form method="dialog">
              <button  id=""   class="border-2 border-light-primary dark:border-primary-100 rounded-full text-black dark:text-white  inline-flex items-center bg-primary-700 hover:bg-primary-800  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-xl px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-100  hover:bg-light-primary  bg-transparent  hover:text-white dark:hover:text-black dark:focus:ring-primary-800">
              
          
              Cancel
          </button>
            </form>
  
            
  
              
              
                        
            
          </div>
        
       
        </div>
                
            </div>
          
            
            
            
    </dialog>

    <dialog id="confirm_save_modal" class="modal">
      <div class="modal-box bg-white dark:bg-secondary">
      <div class="mt-5 mb-2" id="edit-modal-warningMsg">
 
      </div>
      
        <h3 class="font-bold text-lg text-center text-black dark:text-txt-100">Are you sure?</h3>
        
        <p class="py-4 text-center text-black dark:text-txt-100">You're about to SAVE all changes</p>

        <div class="flex justify-center space-x-12 mt-5">
          <button class="text-white dark:text-black rounded-full bg-light-primary px-5 py-2 dark:bg-primary-100 dark:hover:bg-primary-200 hover:bg-light-primary-active" id="edit-save-modal-bttn" onclick="ConfirmSaveBtn(this)">Confirm</button>
      
            <button class="text-light-primary dark:text-primary-100 px-5 py-2 rounded-full bg-transparent border border-light-primary dark:border-primary-100 dark:hover:bg-primary-200 hover:bg-light-primary-active" onclick="CloseConfirmModal()">Cancel</button>

          
          

        </div>
  
      </div>
    </dialog>

    

    <dialog id="succesfully_saved_modal" class="modal">
      <div class="modal-box bg-white dark:bg-secondary">
        <h3 class="font-bold text-lg text-center">Succesfully saved the task</h3>
        <div class="flex justify-center mt-5">
          <form method="dialog">
            <button class="text-white dark:text-black px-5 py-2 rounded-full  border-0 bg-light-primary dark:bg-primary-100">Confirm</button>
          </form>
        </div>
        

      </div>
      <form method="dialog" class="modal-backdrop">
        <button ></button>
      </form>
      
    </dialog>

    
    `;
  }
  
  
