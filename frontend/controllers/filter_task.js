document.getElementById("toggleFilter").addEventListener("click", function () {
  var filterStatus = document.getElementById("filterStatus");
  var filterPriority = document.getElementById("filterPriority");
  var filterTask = document.getElementById("filterTask");
  if (filterTask.classList.contains("hidden")) {
    filterTask.classList.remove("hidden");
  } else {
    filterTask.classList.add("hidden");
    filterStatus.classList.add("hidden");
    filterPriority.classList.add("hidden");
  }
});

document.getElementById("toggleStatus").addEventListener("click", function () {
  var filterTask = document.getElementById("filterStatus");
  var filterPriority = document.getElementById("filterPriority");
  if (filterTask.classList.contains("hidden")) {
    filterTask.classList.remove("hidden");
    filterPriority.classList.add("hidden");
  } else {
    filterTask.classList.add("hidden");
    filterPriority.classList.add("hidden");
  }
});

document
  .getElementById("togglePriority")
  .addEventListener("click", function () {
    var filterTask = document.getElementById("filterPriority");
    var filterStatus = document.getElementById("filterStatus");
    if (filterTask.classList.contains("hidden")) {
      filterTask.classList.remove("hidden");
      filterStatus.classList.add("hidden");
    } else {
      filterTask.classList.add("hidden");
      filterStatus.classList.add("hidden");
    }
  });
