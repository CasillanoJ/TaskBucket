const ClaimTaskModal =async()=>{
  return`
  



  <dialog id="confirm_claimTask_modal" class="modal">
  <div class="modal-box bg-white dark:bg-secondary">
  <div class="mt-5 mb-2" id="edit-modal-warningMsg">

  </div>
  
    <h3 class="font-bold text-lg text-center text-black dark:text-txt-100">Are you sure?</h3>
    
    <p class="py-4 text-center text-black dark:text-txt-100">You’re about to CLAIM this task </p>

    <div class="flex justify-center space-x-12 mt-5">
      <button id="confirm-claim-modal-bttn" class="text-white dark:text-black rounded-full bg-light-primary px-5 py-2 dark:bg-primary-100 dark:hover:bg-primary-200 hover:bg-light-primary-active"   onclick="ConfirmStartTask(this)">Confirm</button>
      <form method="dialog">
        <button class="text-light-primary dark:text-primary-100 dark:hover:bg-black hover:bg-light-active px-5 py-2 rounded-full bg-transparent border border-light-primary dark:border-primary-100" onclick="">Cancel</button>
      </form>
        

      
      

    </div>

  </div>
</dialog>

<dialog id="succesfully_claimTask_modal" class="modal">
    <div class="modal-box bg-white dark:bg-secondary">
      <h3 class="font-bold text-lg text-center text-black dark:text-txt-100">Succesfully Claimed the task</h3>
      <div class="flex justify-center mt-5">
        <form method="dialog">
          <button class="text-white dark:text-black px-5 py-2 rounded-full  border-0 bg-light-primary dark:bg-primary-100 dark:hover:bg-primary-200 hover:bg-light-primary-active">Confirm</button>
        </form>
      </div>
      
  
    </div>
    <form method="dialog" class="modal-backdrop">
      <button ></button>
    </form>
    
  </dialog>
  `
}