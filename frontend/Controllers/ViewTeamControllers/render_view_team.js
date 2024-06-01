import { switchButton, deleteMember } from "./navigate_content.js";
import { FetchTeam } from "./fetch_team.js";
import { CreateDeleteModal } from "../../Components/TeamList/delete_modal.js";

const RenderTeamTable = async () => {
  await FetchTeam();
};

document.addEventListener("DOMContentLoaded", async function () {
  CreateDeleteModal();
  RenderTeamTable();
  switchButton()
  deleteMember();
});
