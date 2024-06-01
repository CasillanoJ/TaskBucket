import { CreateNewbieTable } from "../../Components/TeamList/unverified_users_table.js";
import { rejectUser } from "../../API/reject_user.js";
import { updateUserVerification } from "../../API/verify_user.js";
import { getUnverifiedUsers } from "../../API/get_unverified_users.js";
import { OpenAcceptModal, OpenRejectModal } from "./accept_reject_modal_controller.js";

const FetchUnverifiedUsers = async () => {
  const unverifiedContainer = document.getElementById("rows-newbies");
  const unverifiedCount = document.getElementById("unverifiedCount");
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

    if (data.count > 0) {
      unverifiedCount.classList.remove("hidden")
      unverifiedCount.innerHTML = data.count;
    }
    else {
      unverifiedCount.classList.add("hidden");
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
        OpenAcceptModal("accept", [userId]);
      } else if (event.target.classList.contains("reject-btn")) {
        const row = event.target.closest("tr");
        const userId = row.dataset.userId;
        OpenRejectModal("reject", [userId]);
      } else if (event.target.classList.contains("main-accept-btn")) {
        const selectedUserIds = getSelectedUserIds();
        if (selectedUserIds.length > 0) {
          OpenAcceptModal("accept", selectedUserIds);
        }
      } else if (event.target.classList.contains("main-reject-btn")) {
        const selectedUserIds = getSelectedUserIds();
        if (selectedUserIds.length > 0) {
          OpenRejectModal("reject", selectedUserIds);
        }
      }
    });
  } catch (error) {
    console.error("Error using this controller:", error);
  }
};

export const SelectAllCheckbox = () => {
  const selectAllCheckbox = document.getElementById("checkbox-for-all");
  const userCheckboxes = document.querySelectorAll(".user-checkbox");

  selectAllCheckbox.addEventListener("change", function () {
    const isChecked = selectAllCheckbox.checked;
    userCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  });

  userCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (!checkbox.checked) {
        selectAllCheckbox.checked = false;
      } else {
        const allChecked = Array.from(userCheckboxes).every((cb) => cb.checked);
        selectAllCheckbox.checked = allChecked;
      }
    });
  });
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

export const handleApiResponse = (response, row) => {
  if (response.successful && row) {
    row.parentNode.removeChild(row);
  } else {
    console.error("Error handling API response:", response, "Row:", row);
  }
};



export { FetchUnverifiedUsers };
