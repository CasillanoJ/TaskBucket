const AddTaskButton = ()=>{


    const AddTaskModal = ()=>{
      return`

      <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>
      
      `
    }

    return `
    <button class="bg-light-primary  dark:bg-primary-100 px-5 py-2 text-xl font-bold rounded-lg flex text-white dark:text-black" onclick="my_modal_3.showModal()">
            <svg class="w-6 h-7 text-white dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h14m-7 7V5"/>
            </svg>
            <span>ADD TASK</span>
          </button>
    ${AddTaskModal()}
    `
}