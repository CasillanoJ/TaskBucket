document
  .getElementById("toggleSearchBar")
  .addEventListener("click", function () {
    var searchBar = document.getElementById("searchBar");
    if (searchBar.classList.contains("hidden")) {
      searchBar.classList.remove("hidden");
    } else {
      searchBar.classList.add("hidden");
    }
  });
