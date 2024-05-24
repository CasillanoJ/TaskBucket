import { sortTask } from "../API/sort_task.js";
import { FetchTaskList } from "./fetch_tasks.js";

export const sort = () => {
  const sortOptions = document.querySelectorAll(".sort-option");
  sortOptions.forEach(function (selectedSort) {
    selectedSort.addEventListener("click", async () => {
      const sortCat = selectedSort.getAttribute("category");
      const data = await sortTask(sortCat);
      await FetchTaskList("sortedTask", data);
    });
  });
};
