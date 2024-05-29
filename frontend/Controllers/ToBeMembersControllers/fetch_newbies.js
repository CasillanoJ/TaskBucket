import { CreateNewbieTable } from "../../Components/TeamList/unverified_users_table.js";
import { rejectUser } from "../../API/reject_user.js";
import { updateUserVerification } from "../../API/verify_user.js";
import { getUnverifiedUsers } from "../../API/get_unverified_users.js";

const FetchUnverifiedUsers = async () => {
  const unverifiedContainer = document.getElementById("rows-newbies");
  unverifiedContainer.innerHTML = "";

  try {
    let data = await getUnverifiedUsers();

    let newUsersTable = "";

    if (data.data && data.data.length > 0) {
      data.data.forEach((user) => {
        newUsersTable += CreateNewbieTable(user);
      });
    } else {
      newUsersTable = `<tr id="noUsersRow">
                        <td colspan="6" class="text-center text-gray-500 dark:text-gray-400 py-3">
                          No Users found
                        </td>
                      </tr>`;
    }

    unverifiedContainer.innerHTML += newUsersTable;
  } catch (error) {
    console.error("Error fetching team list:", error);
  }
};

export const AcceptRejectList = () => {
  try {
    document.addEventListener("click", async function (event) {
      if (event.target.classList.contains("accept-btn")) {
        const row = event.target.closest("tr");
        const userId = row.dataset.userId;
        const response = await updateUserVerification([userId]);
        handleApiResponse(response, "accepted", row);
      } else if (event.target.classList.contains("reject-btn")) {
        const row = event.target.closest("tr");
        const userId = row.dataset.userId;
        const response = await rejectUser([userId]);
        handleApiResponse(response, "rejected", row);
      } else if (event.target.classList.contains("main-accept-btn")) {
        const selectedUserIds = getSelectedUserIds();
        if (selectedUserIds.length > 0) {
          const response = await updateUserVerification(selectedUserIds);
          selectedUserIds.forEach((id) => {
            const row = document.querySelector(`tr[data-user-id="${id}"]`);
            handleApiResponse(response, "accepted", row);
          });
        }
      } else if (event.target.classList.contains("main-reject-btn")) {
        const selectedUserIds = getSelectedUserIds();
        if (selectedUserIds.length > 0) {
          const response = await rejectUser(selectedUserIds);
          selectedUserIds.forEach((id) => {
            const row = document.querySelector(`tr[data-user-id="${id}"]`);
            handleApiResponse(response, "rejected", row);
          });
        }
      }
    });
  } catch (error) {
    console.error("Error using this controller:", error);
  }
};

const getSelectedUserIds = () => {
  const checkboxes = document.querySelectorAll(".user-checkbox:checked");
  const userIds = [];
  checkboxes.forEach((checkbox) => {
    const row = checkbox.closest("tr");
    userIds.push(row.dataset.userId);
  });
  return userIds;
};

const handleApiResponse = (response, action, row) => {
  if (response.successful) {
    if (row) {
      row.parentNode.removeChild(row);
    }
    console.log(`User successfully ${action}.`);
  } else {
    console.error(`Failed to ${action} user:`, response.message);
  }
};

export { FetchUnverifiedUsers };
