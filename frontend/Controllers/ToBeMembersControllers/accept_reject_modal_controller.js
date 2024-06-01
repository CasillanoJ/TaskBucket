import { updateUserVerification } from "../../API/verify_user.js";
import { rejectUser } from "../../API/reject_user.js";
import { handleApiResponse } from "./fetch_newbies.js";

export const OpenAcceptModal = (action, userIds) => {
  const confirmBttn = document.getElementById("confirm-accept-modal-btn");
  if (confirmBttn) {
    confirmBttn.setAttribute("data-action", action);
    confirmBttn.setAttribute("data-user-ids", JSON.stringify(userIds));
    confirm_accept_modal.showModal();
  } else {
    console.error("Confirmation button not found!");
  }
};

export const OpenRejectModal = (action, userIds) => {
  const confirmBttn = document.getElementById("confirm-reject-modal-btn");
  if (confirmBttn) {
    confirmBttn.setAttribute("data-action", action);
    confirmBttn.setAttribute("data-user-ids", JSON.stringify(userIds));
    confirm_reject_modal.showModal();
  } else {
    console.error("Confirmation button not found!");
  }
};

window.ConfirmRejectModal = async (button) => {
  const action = button.getAttribute("data-action");
  const userIds = JSON.parse(button.getAttribute("data-user-ids"));
  if (action === "reject") {
    const response = await rejectUser(userIds);
    document.getElementById("confirm_reject_modal").close();
    document.getElementById("successfully_reject_modal").showModal();
    userIds.forEach((userId) => {
      const row = document.querySelector(`tr[data-user-id='${userId}']`);
      handleApiResponse(response, row);
    });
  }
};

window.ConfirmAcceptModal = async (button) => {
  const action = button.getAttribute("data-action");
  const userIds = JSON.parse(button.getAttribute("data-user-ids"));

  if (action === "accept") {
    const response = await updateUserVerification(userIds);
    document.getElementById("confirm_accept_modal").close();
    document.getElementById("successfully_accept_modal").showModal();

    userIds.forEach((userId) => {
      const row = document.querySelector(`tr[data-user-id='${userId}']`);
      console.log("Selected row for userId:", userId, row);
      handleApiResponse(response, row);
    });
  }
};
