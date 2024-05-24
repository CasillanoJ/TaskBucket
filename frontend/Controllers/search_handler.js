import { searchTask } from "../API/search_task.js";
import { FetchTaskList } from "./fetch_tasks.js";

export const search = () => {
  const searchForm = document.getElementById("searchBar");
  const searchInput = document.getElementById("topbar-search");

  // Prevent form submission on Enter key press
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
  });

  // Listen for keypress event
  searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      const searchValue = searchInput.value;
      const data = await searchTask(searchValue);
      await FetchTaskList("searchTask", data); 
    }
  });

  // Listen for input event
  // searchInput.addEventListener("input", async () => {
  //   const searchValue = searchInput.value;
  //   const data = await searchTask(searchValue);
  //   await FetchTaskList("searchTask", data); 
  // });
};
