export const CreateFilterSidebar = () => {
  return `<div
          class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-nav dark:border-gray-700 text-lg border-l-2 border-primary-100"
        >
          <ul class="pt-5 mt-7 space-y-2">
            <div class="space-y-0 ml-5 mb-8">
              <h3 class="text-xl text-black dark:text-txt-100">Status</h3>
              <ul class="filter-options space-y-2">
                <li class="filter-option">
                  <input
                    id="checkbox-unassigned"
                    type="checkbox"
                    name="status"
                    value="Unassigned"
                    data-filter-type="status"
                    class="filterCheckbox cursor-pointer w-4 h-4 text-primary-100 bg-gray-100 border-gray-300 rounded focus:bg-primary-100 dark:focus:ring-primary-100 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="checkbox-unassigned"
                    class="text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                    >Unassigned</label
                  >
                </li>
                <li class="filter-option">
                  <input
                    id="checkbox-todo"
                    type="checkbox"
                    name="status"
                    value="To do"
                    data-filter-type="status"
                    class="filterCheckbox cursor-pointer w-4 h-4 text-primary-100 bg-gray-100 border-gray-300 rounded focus:bg-primary-100 dark:focus:ring-primary-100 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="checkbox-todo"
                    class="text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                    >To do</label
                  >
                </li>
                <li class="filter-option">
                  <input
                    id="checkbox-in-progress"
                    type="checkbox"
                    name="status"
                    value="In progress"
                    data-filter-type="status"
                    class="filterCheckbox cursor-pointer w-4 h-4 text-primary-100 bg-gray-100 border-gray-300 rounded focus:bg-primary-100 dark:focus:ring-primary-100 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="checkbox-in-progress"
                    class="text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                    >In progress</label
                  >
                </li>
                <li class="filter-option">
                  <input
                    id="checkbox-completed"
                    type="checkbox"
                    name="status"
                    value="Completed"
                    data-filter-type="status"
                    class="filterCheckbox cursor-pointer w-4 h-4 text-primary-100 bg-gray-100 border-gray-300 rounded focus:bg-primary-100 dark:focus:ring-primary-100 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="checkbox-completed"
                    class="text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                    >Completed</label
                  >
                </li>
              </ul>
            </div>

            <div class="space-y-0 ml-5">
              <h3 class="text-xl text-black dark:text-txt-100">
                Priority Level
              </h3>
              <ul class="filter-options space-y-2">
                <li class="filter-option">
                  <input
                    id="checkbox-neutral"
                    type="checkbox"
                    name="priorityLevel"
                    data-filter-type="priority"
                    value="Neutral"
                    class="filterCheckbox w-4 h-4 text-primary-100 bg-gray-100 border-gray-300 rounded focus:bg-primary-100 dark:focus:ring-primary-100 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="checkbox-neutral"
                    class="text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                    >Neutral</label
                  >
                </li>
                <li class="filter-option">
                  <input
                    id="checkbox-high"
                    type="checkbox"
                    name="priorityLevel"
                    data-filter-type="priority"
                    value="High"
                    class="filterCheckbox w-4 h-4 text-primary-100 bg-gray-100 border-gray-300 rounded focus:bg-primary-100 dark:focus:ring-primary-100 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="checkbox-high"
                    class="text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                    >High</label
                  >
                </li>
                <li class="filter-option">
                  <input
                    id="checkbox-urgent"
                    type="checkbox"
                    name="priorityLevel"
                    data-filter-type="priority"
                    value="Urgent"
                    class="filterCheckbox w-4 h-4 text-primary-100 bg-gray-100 border-gray-300 rounded focus:bg-primary-100 dark:focus:ring-primary-100 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="checkbox-urgent"
                    class="text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                    >Urgent</label
                  >
                </li>
              </ul>
            </div>
          </ul>
        </div>
        `;
};
