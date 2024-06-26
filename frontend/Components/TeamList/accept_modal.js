export const CreateAcceptModal = () => {
  const modalHTML = `
    <dialog id="confirm_accept_modal" class="modal">
      <div class="modal-box bg-white dark:bg-secondary relative">
        <h3 class="font-bold text-lg text-center text-black dark:text-txt-100">Are you sure?</h3>
        <p class="py-4 text-center text-black dark:text-txt-100">You’re about to <span class="text-green-700">VERIFY</span> this member</p>
        <div class="flex justify-center space-x-10 mt-5">
          <button class="text-white dark:text-black rounded-full bg-light-primary px-5 py-2 dark:bg-primary-100 dark:hover:bg-purple-500" id="confirm-accept-modal-btn" onclick="ConfirmAcceptModal(this)">Confirm</button>
          <form method="dialog">
            <button class="text-light-primary dark:text-primary-100 px-5 py-2 rounded-full bg-transparent border border-light-primary dark:border-primary-100 dark:hover:bg-purple-500 hover:text-black">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
    <dialog id="successfully_accept_modal" class="modal">
      <div class="modal-box bg-white dark:bg-secondary">
        <h3 class="font-bold text-lg text-center text-black dark:text-txt-100">Successfully Verified Member</h3>
        <div class="flex justify-center mt-5">
          <form method="dialog">
            <button class="text-white dark:text-black px-5 py-2 rounded-full border-0 bg-light-primary dark:bg-primary-100 dark:hover:bg-primary-200 hover:bg-light-primary-active">Confirm</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
};
