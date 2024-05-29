const FetchTeam = async (query) => {
  const teamContainer = document.getElementById("rows-team");

  teamContainer.innerHTML = "";

  try {
    let data;

    // if (query === "myTeam") {
    //     data = await getUsers()
    // }
    data = await getUsers();

    let tableHtml = ``;

    if (data.data && data.data.length > 0) {
      data.data.forEach((user) => {
        tableHtml += CreateTeamTable(user);
      });
    }
    teamContainer.innerHTML += tableHtml;

  } catch (error) {
    console.error("Error fetching team list:", error);
  }
};

