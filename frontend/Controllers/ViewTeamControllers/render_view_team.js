import { switchButton } from "./navigate_content.js";

const RenderTeamTable = async () => {
  await FetchTeam();
};

document.addEventListener("DOMContentLoaded", async function () {
  switchButton()
  RenderTeamTable();
});
