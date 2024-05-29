import { sortTask } from "../API/sort_task.js";
import { FetchTaskList } from "./fetch_tasks.js";

export const sort = () => {
  const sortOptions = document.querySelectorAll(".sort-option");
  sortOptions.forEach(function (selectedSort) {
    selectedSort.addEventListener("click", async (event) => {
      event.preventDefault();
      const sortTextContent = document.getElementById("sortLabel")
      const sortCat = selectedSort.getAttribute("category");
      let sortLabel = selectedSort.textContent
      sortTextContent.innerHTML = sortLabel
      const data = await sortTask(sortCat);
      await FetchTaskList("sortedTask", data);
    });
  });
};
