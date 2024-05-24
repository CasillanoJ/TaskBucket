const AddTaskButton = ()=>{


    const AddTaskModal = ()=>{
      const dateToday = new Date().toISOString().split('T')[0]
      
      return`

      <dialog id="add_task_modal" class="modal">
      <div class=" bg-white dark:bg-task-bg rounded-lg shadow  modal-box  overflow-hidden w-11/12 max-w-2xl border border-black">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
       
        <h2 class="text-3xl font-bold text-black dark:text-txt-100 mb-8">Add New Task</h2>
        <label for="add-task-modal-title" class="block text-black dark:text-txt-100 text-sm mb-2">Title *</label>
        <div id="add-task-modal-title-message" class="mb-2 mt-2">

        </div>
        <input type="text" id="add-task-modal-title"  placeholder="e.g. Encode this Certificate" class="w-full mb-5  border-2 border-black dark:border-txt-100 text-black dark:text-white placeholder-gray-400 rounded-lg p-2 bg-light-overiew-bg  dark:bg-task-content" />
        <label for="add-task-modal-description" class="block text-black dark:text-txt-100 text-sm mb-2">Description *</label>
        <div id="add-task-modal-description-message" class="mb-2 mt-2">

        </div>
        <textarea id="add-task-modal-description" placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." class="w-full h-32 mb-5 bg-light-overiew-bg  dark:bg-task-content border-2 border-black dark:border-txt-100 text-black dark:text-white placeholder-gray-400 rounded-lg p-2"></textarea>
        <label for="add-task-modal-assignee" class="block text-black dark:text-txt-100 text-sm mb-2">Assign to</label>
        <select id="add-task-modal-assignee" class="w-full mb-5 bg-light-overiew-bg  dark:bg-task-content border-2 border-black dark:border-txt-100 text-black dark:text-white rounded-lg p-2">
            
        </select>
        <div class="flex justify-between mb-8">
            <div style="">
                <label for="add-task-modal-dueDate" class="block text-black dark:text-txt-100 text-sm mb-2">Select Due Date</label>
                <input type="date" id="add-task-modal-dueDate" class="w-60 bg-light-overiew-bg  dark:bg-task-content border-2 border-black dark:border-txt-100 text-black dark:text-white rounded-lg p-2" min="${dateToday}" />
            </div>
            <div>
                <label for="add-task-modal-priorityLevel" class="block text-black dark:text-txt-100 text-sm mb-2">Priority Level *</label>
                <select id="add-task-modal-priorityLevel" class="w-60 bg-light-overiew-bg  dark:bg-task-content border-2 border-black dark:border-txt-100 text-black dark:text-white rounded-lg p-2">
                    <option value="Neutral">Neutral</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                </select>
            </div>
        </div>
        <label for="add-task-modal-fileInput" class="block text-black  dark:text-txt-100 text-sm mb-2">Add file</label>
        <div class=" flex items-center bg-light-overiew-bg  dark:bg-task-content border-2 border-black dark:border-txt-100 text-black dark:text-white rounded-md px-2 mb-8">
            <input type="file" id="add-task-modal-fileInput"  class=" text-white px-4 py-2 rounded-lg border-white"></button>
        </div>
        <div class="flex justify-between ">
            <button class="w-full bg-light-primary dark:bg-primary-100  text-white dark:text-black rounded-full py-1 px-1 font-bold" style="width: 48%;" onclick ="AddTaskModal()">Create Task</button>
            <button class="bg-transparent text-light-primary dark:text-primary-100 border-2 border-light-primary dark:border-primary-100 px-5 py-2 rounded-full font-bold"style="width: 48%;" onclick="CancelAddTask()"> Cancel</button>
        </div>

      </div>
    </dialog>

    <dialog id="succesfully_added_modal" class="modal">
    <div class="modal-box bg-white dark:bg-secondary">
      <h3 class="font-bold text-lg text-center">Succesfully Added a task</h3>
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
      
      `
    }

    return `
    <button class="bg-light-primary  dark:bg-primary-100 px-5 py-2 text-xl font-bold rounded-lg flex text-white dark:text-black" onclick="OpenAddTaskModal()">
            <svg class="w-6 h-7 text-white dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h14m-7 7V5"/>
            </svg>
            <span>ADD TASK</span>
          </button>
    ${AddTaskModal()}
    `
}