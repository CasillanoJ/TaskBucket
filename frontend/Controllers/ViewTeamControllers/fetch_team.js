import { getUnverifiedUsers } from "../../API/get_unverified_users.js";

export const FetchTeam = async (query) => {
  const teamContainer = document.getElementById("rows-team");
  const unverifiedCount = document.getElementById("unverifiedCount");

  teamContainer.innerHTML = "";

  try {
    let data;
    
    data = await getUsers();

    let tableHtml = ``;

    if (data.data && data.data.length > 0) {
      data.data.forEach((user) => {
        tableHtml += CreateTeamTable(user);
      });
    }
    teamContainer.innerHTML += tableHtml;

    let unverifiedUsers = await getUnverifiedUsers()

    if (unverifiedUsers.count > 0) {
      unverifiedCount.classList.remove("hidden");
      unverifiedCount.innerHTML = unverifiedUsers.count;
    } else {
      unverifiedCount.classList.add("hidden");
    }

  } catch (error) {
    console.error("Error fetching team list:", error);
  }
};



