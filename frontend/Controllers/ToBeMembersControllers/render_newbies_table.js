import { FetchUnverifiedUsers } from "./fetch_newbies.js";
import { AcceptRejectList } from "./fetch_newbies.js";
import { switchButton } from "../ViewTeamControllers/navigate_content.js";
import { SelectAllCheckbox } from "./fetch_newbies.js";
import { CreateRejectModal } from "../../Components/TeamList/reject_modal.js";
import { CreateAcceptModal } from "../../Components/TeamList/accept_modal.js";

const RenderUserTable = async () => {
  await FetchUnverifiedUsers();
};

document.addEventListener("DOMContentLoaded", async function () {
  CreateRejectModal();
  CreateAcceptModal();
  RenderUserTable();
  SelectAllCheckbox();
  switchButton();
  AcceptRejectList();
});
