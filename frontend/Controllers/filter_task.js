export const toggleFilter = () => {
  try {
    const toggleFilterButton = document.getElementById("toggleFilter");
    const toggleFilterIcon = document.getElementById("toggleFilterIcon");
    const filterSidebar = document.getElementById("filter-sidebar");
    const mainContainer = document.getElementById("main-container");
    const closeFilterSidebar = document.getElementById("closeFilterSidebar");

    if (!toggleFilterButton && !toggleFilterIcon && !closeFilterSidebar) {
      console.error("Toggle elements not found");
      return;
    }

    const toggleFilterSection = (section, container) => {
      section.classList.toggle("block");

      if (section.classList.contains("block")) {
        container.classList.add("lg:mr-64");
        container.classList.remove("lg:mr-10");
        section.classList.remove("hidden");
      } else {
        container.classList.add("lg:mr-10");
        container.classList.remove("lg:mr-64");
        section.classList.add("hidden");
      }
    };

    if (toggleFilterButton) {
      toggleFilterButton.addEventListener("click", function () {
        toggleFilterSection(filterSidebar, mainContainer);
      });
    }

    if (toggleFilterIcon) {
      toggleFilterIcon.addEventListener("click", function () {
        toggleFilterSection(filterSidebar, mainContainer);
      });
    }

    if (closeFilterSidebar) {
      closeFilterSidebar.addEventListener("click", function () {
        toggleFilterSection(filterSidebar, mainContainer);
      });
    }
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
    const tbody = document.getElementById("rows");

    function resetVisibility() {
      statusElements.forEach(function (statusElement) {
        const trElement = statusElement.closest("tr");
        trElement.classList.remove("hidden");
      });
      priorityElements.forEach(function (priorityElement) {
        const trElement = priorityElement.closest("tr");
        trElement.classList.remove("hidden");
      });
      const noTasksRow = document.getElementById("noTasksRow");
      if (noTasksRow) {
        noTasksRow.remove();
      }
    }

    function updateVisibility(selectedStatusFilters, selectedPriorityFilters) {
      let anyVisible = false;

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

      tbody.querySelectorAll("tr").forEach(function (trElement) {
        if (!trElement.classList.contains("hidden")) {
          anyVisible = true;
        }
      });

      const noTasksRow = document.getElementById("noTasksRow");

      if (!anyVisible) {
        if (!noTasksRow) {
          const newNoTasksRow = document.createElement("tr");
          newNoTasksRow.id = "noTasksRow";
          const noTasksCell = document.createElement("td");
          noTasksCell.colSpan = 6;
          noTasksCell.textContent = "No tasks found";
          noTasksCell.classList.add(
            "text-center",
            "text-gray-500",
            "dark:text-gray-400",
            "py-3"
          );
          newNoTasksRow.appendChild(noTasksCell);
          tbody.appendChild(newNoTasksRow);
        }
      } else if (noTasksRow) {
        noTasksRow.remove();
      }
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

          filterButton.classList.add("secondary-btn")
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
