export const toggleFilter = () => {
  try {
    document.addEventListener("click", function () {
      const toggleFilterButton = document.getElementById("toggleFilter");
      const toggleFilterIcon = document.getElementById("toggleFilterIcon");
      const filterSidebar = document.getElementById("filter-sidebar");
      const mainContainer = document.getElementById("main-container");

      toggleFilterButton.addEventListener("click", function () {
        toggleFilterSection(filterSidebar, mainContainer);
      });

      toggleFilterIcon.addEventListener("click", function () {
        toggleFilterSection(filterSidebar, mainContainer);
      });

      function toggleFilterSection(section, container) {
        section.classList.toggle("hidden");

        if (section.classList.contains("hidden")) {
          container.classList.remove("mr-64");
          container.classList.add("mr-10");
          section.classList.remove("block");
        } else {
          container.classList.remove("mr-10");
          container.classList.add("mr-64");
          section.classList.add("block");
        }
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export const filterTasks = () => {
  document.addEventListener("click", function () {
    const filterCheckboxes = document.querySelectorAll(".filterCheckbox");
    const selectedFiltersContainer = document.getElementById("selectedFilters");
    const statusElements = document.querySelectorAll(".status");
    const priorityElements = document.querySelectorAll(".priority");

    function resetVisibility() {
      statusElements.forEach(function (statusElement) {
        const trElement = statusElement.closest("tr");
        trElement.classList.remove("hidden");
      });
      priorityElements.forEach(function (priorityElement) {
        const trElement = priorityElement.closest("tr");
        trElement.classList.remove("hidden");
      });
    }

    function updateVisibility(selectedStatusFilters, selectedPriorityFilters) {
      statusElements.forEach(function (statusElement) {
        const trElement = statusElement.closest("tr");
        const statusValue = statusElement.textContent.trim();
        if (
          selectedStatusFilters.length > 0 &&
          !selectedStatusFilters.includes(statusValue)
        ) {
          trElement.classList.add("hidden");
        }
      });

      priorityElements.forEach(function (priorityElement) {
        const trElement = priorityElement.closest("tr");
        const priorityValue = priorityElement.textContent.trim();
        if (
          selectedPriorityFilters.length > 0 &&
          !selectedPriorityFilters.includes(priorityValue)
        ) {
          trElement.classList.add("hidden");
        }
      });
    }

    function filterTask() {
      filterCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          resetVisibility();

          const selectedStatusFilters = [];
          const selectedPriorityFilters = [];

          filterCheckboxes.forEach(function (checkbox) {
            const filterType = checkbox.getAttribute("data-filter-type");
            if (checkbox.checked) {
              if (filterType === "status") {
                selectedStatusFilters.push(checkbox.value);
              } else if (filterType === "priority") {
                selectedPriorityFilters.push(checkbox.value);
              }
            }
          });

          updateVisibility(selectedStatusFilters, selectedPriorityFilters);
          updateSelectedFilters();
        });
      });
    }

    function getCategoryLabel(filterType) {
      switch (filterType) {
        case "status":
          return "Status: ";
        case "priority":
          return "Priority Level: ";
        default:
          return "";
      }
    }

    function updateSelectedFilters() {
      const selectedFilters = [];

      filterCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          selectedFilters.push({
            value: checkbox.value,
            type: checkbox.getAttribute("data-filter-type"),
          });
        }
      });

      selectedFiltersContainer.innerHTML = "";
      if (selectedFilters.length > 0) {
        selectedFilters.forEach(function (filter) {
          const listItem = document.createElement("li");

          const filterButton = document.createElement("button");
          const categoryLabel = getCategoryLabel(filter.type);
          const categoryLabelSpan = document.createElement("span");
          categoryLabelSpan.classList.add("category-label");
          categoryLabelSpan.textContent = categoryLabel;
          filterButton.appendChild(categoryLabelSpan);
          filterButton.appendChild(document.createTextNode(filter.value));

          const closeBtn = `
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4 flex justify-center" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          `;

          filterButton.insertAdjacentHTML("beforeend", closeBtn);

          filterButton.classList.add("secondary-btn");
          filterButton.addEventListener("click", function () {
            const selectedStatusFilters = [];
            const selectedPriorityFilters = [];

            filterCheckboxes.forEach(function (checkbox) {
              if (checkbox.value === filter.value) {
                checkbox.checked = false;
              }
              if (checkbox.checked) {
                const filterType = checkbox.getAttribute("data-filter-type");
                if (filterType === "status") {
                  selectedStatusFilters.push(checkbox.value);
                } else if (filterType === "priority") {
                  selectedPriorityFilters.push(checkbox.value);
                }
              }
            });

            resetVisibility();
            updateVisibility(selectedStatusFilters, selectedPriorityFilters);
            updateSelectedFilters();
          });

          listItem.appendChild(filterButton);
          selectedFiltersContainer.appendChild(listItem);
        });
      }

      let clearAllButton = document.getElementById("clearAll");
      if (!clearAllButton) {
        clearAllButton = document.createElement("button");
        clearAllButton.id = "clearAll";
        clearAllButton.classList.add("secondary-btn");
        clearAllButton.textContent = "Clear all";
        clearAllButton.addEventListener("click", function () {
          filterCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false;
          });

          updateSelectedFilters();
          resetVisibility();
        });
        selectedFiltersContainer.appendChild(clearAllButton);
      }
      clearAllButton.style.display =
        selectedFilters.length >= 2 ? "block" : "none";
    }

    filterTask();
    updateSelectedFilters();
  });
};

// import { filterTask } from "../API/get_filter_task.js";
// import { renderTasks } from "../controllers/render_task_table.js"

// export const filterTasks = () => {
//   document
//     .getElementById("filterForm")
//     .addEventListener("submit", async function (event) {
//       event.preventDefault();

//       // Gather filter criteria
//       const priorityLevels = Array.from(
//         document.querySelectorAll('input[name="priorityLevel"]:checked')
//       ).map((el) => el.value);
//       const statuses = Array.from(
//         document.querySelectorAll('input[name="status"]:checked')
//       ).map((el) => el.value);

//       // Create filter object
//       const filter = {};
//       if (priorityLevels.length > 0) {
//         filter.priorityLevel = priorityLevels;
//       }
//       if (statuses.length > 0) {
//         filter.status = statuses;
//       }

//       try {
//         const tasks = await filterTask(filter);
//         renderTasks(tasks);
//       } catch (error) {
//         console.error("Error fetching filtered tasks:", error);
//       }
//     });
// };
