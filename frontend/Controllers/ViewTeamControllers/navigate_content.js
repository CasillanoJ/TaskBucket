import { OpenDeleteModal } from "./delete_modal_controllers.js";

export const switchButton = () => {
  const viewTeamBtn = document.getElementById("viewTeamBtn");
  const toBeMembersBtn = document.getElementById("toBeMembersBtn");

  if (!viewTeamBtn && !toBeMembersBtn) {
    console.error("Toggle elements not found");
    return;
  }

  if (viewTeamBtn) {
    viewTeamBtn.addEventListener("click", function () {
      window.location.href = "ViewTeam.html";
    });
  }
  if (toBeMembersBtn) {
    toBeMembersBtn.addEventListener("click", function () {
      window.location.href = "ToBeMembers.html";
    });
  }
};

export const deleteMember = () => {
  document.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".deleteMember");
    if (deleteButton) {
      OpenDeleteModal(deleteButton);
    }
  });
};
