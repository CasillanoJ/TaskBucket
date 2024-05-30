import { switchButton } from "./navigate_content.js";
import { FetchTeam } from "./fetch_team.js";

const RenderTeamTable = async () => {
  await FetchTeam();
};

document.addEventListener("DOMContentLoaded", async function () {
  RenderTeamTable();
  switchButton()
});
