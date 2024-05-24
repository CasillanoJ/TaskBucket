import { searchTask } from "../API/search_task.js";
import { FetchTaskList } from "./fetch_tasks.js";

export const search = () => {
  const searchForm = document.getElementById("searchBar");
  const searchInput = document.getElementById("topbar-search");

  // Prevent form submission on Enter key press
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
  });

  // Listen for keypress event
  searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault(); // Prevent the default form submission behavior
      const searchValue = searchInput.value;
      console.log("Search Value Enter:", searchValue);
      // Call the searchTask function with the search value
      const data = await searchTask(searchValue);
      await FetchTaskList("searchTask", data); // Ensure the function waits for FetchTaskList to complete
    }
  });

  // Listen for input event
  // searchInput.addEventListener("input", async () => {
  //   const searchValue = searchInput.value;
  //   console.log("Search Value Input:", searchValue);
  //   // Call the searchTask function with the search value
  //   const data = await searchTask(searchValue);
  //   await FetchTaskList("searchTask", data); // Ensure the function waits for FetchTaskList to complete
  // });
};
