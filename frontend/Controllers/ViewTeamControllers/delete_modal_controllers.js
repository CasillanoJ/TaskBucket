import { rejectUser } from "../../API/reject_user.js";
import { handleApiResponse } from "../ToBeMembersControllers/fetch_newbies.js";


export const OpenDeleteModal = (button) => {
    const dataId = button.getAttribute("data-id");

  const confirmBttn = document.getElementById("confirm-delete-modal-btn");
  if (confirmBttn) {
    confirmBttn.setAttribute("data-id", dataId);
    document.getElementById("confirm_delete_modal").showModal();
  } else {
    console.error("Confirmation button not found!");
  }
};


window.ConfirmDeleteModal = async (button) => {
  const dataId = button.getAttribute("data-id");
  if (!dataId) {
    console.error("Data ID is undefined!");
    return;
  }

  const response = await rejectUser([dataId]);

  if (response.status === 500) {
    alert("Error eleting this member")
  } else {
    document.getElementById("confirm_delete_modal").close();
    document.getElementById("successfully_delete_modal").showModal();
    handleApiResponse(
      response,
      document.querySelector(`tr[data-user-id='${dataId}']`)
    );
  }
};
