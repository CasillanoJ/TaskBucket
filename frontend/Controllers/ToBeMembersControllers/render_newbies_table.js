import { FetchUnverifiedUsers } from "./fetch_newbies.js";
import { AcceptRejectList } from "./fetch_newbies.js";
import { switchButton } from "../ViewTeamControllers/navigate_content.js";

const RenderUserTable = async () => {
  await FetchUnverifiedUsers();
};


document.addEventListener("DOMContentLoaded", async function () {
  switchButton()
  AcceptRejectList()
  await RenderUserTable();
});
