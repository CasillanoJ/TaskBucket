import { FetchTaskList } from "./fetch_task_list.js";

export const searchHandler = () => {
  const handleSearchFormSubmit = async (query) => {
    console.log("Search query:", query);
    await FetchTaskList(query);
  };

  const handleDOMContentLoaded = async () => {
    await FetchTaskList(); // Fetch all tasks initially
  };

  document.addEventListener("DOMContentLoaded", () => {
    handleDOMContentLoaded();

    // Listen for keypress event on the document
    document.addEventListener("keydown", (event) => {
      // Check if Enter key (key code 13) was pressed
      if (event.key === "Enter") {
        // Check if the focus is on the search input field
        if (document.activeElement.id === "topbar-search") {
          console.log("Entered")
          // Prevent the default form submission behavior
          event.preventDefault();
          // Get the search query from the input field
          const query = document.getElementById("topbar-search").value;
          // Call the handleSearchFormSubmit function with the query
          handleSearchFormSubmit(query);
        }
      }
    });
  });
};
