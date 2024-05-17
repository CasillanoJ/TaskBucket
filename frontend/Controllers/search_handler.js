import { FetchTaskList } from "./fetch_task_list.js";

export const searchHandler = () => {
  const handleSearchFormSubmit = async () => {
    const query = document.getElementById("topbar-search").value;
    console.log("Search query:", query);
    await FetchTaskList(query);
  };

  const handleDOMContentLoaded = async () => {
    await FetchTaskList();
  };

  document.addEventListener("DOMContentLoaded", () => {
    handleDOMContentLoaded();

    // Listen for keypress event on the document
    document.addEventListener("keypress", (event) => {
      // Check if Enter key (key code 13) was pressed
      if (event.key === 13) {
        // Check if the focus is on the search input field
        if (document.activeElement.id === "topbar-search") {
          // Prevent the default form submission behavior
          event.preventDefault();
          // Call the handleSearchFormSubmit function
          handleSearchFormSubmit();
        }
      }
    });
  });
};
