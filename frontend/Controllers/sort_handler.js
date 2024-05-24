import { sortTask } from "../API/sort_task.js";
import { FetchTaskList } from "./fetch_tasks.js";

export const sort = () => {
  const sortOptions = document.querySelectorAll(".sort-option");
  console.log(sortOptions); // Check if you're getting the correct elements
  sortOptions.forEach(function (selectedSort) {
    selectedSort.addEventListener("click", async () => {
      const sortCat = selectedSort.getAttribute("category");
      console.log(sortCat); // Check if you're getting the correct category value
      const data = await sortTask(sortCat);
      await FetchTaskList("sortedTask", data);
    });
  });
};
