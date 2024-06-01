export const CreateFeatures = () => {
  return `  
          <div id="add-buttons">
            <button
               
               class="feature-button btn xl:inline-flex items-center hidden me-3 lg:me-5 mb-2 lg:mb-0 lg:mr-4 lg:order-1  bg-light-primary focus:ring-4 dark:hover:bg-primary-200 focus:outline-none focus:ring-primary-200 font-semibold rounded-xl w-full lg:w-auto lg:px-10 py-2.5 text-center dark:bg-primary-100  dark:focus:ring-primary-100" onclick="OpenAddTaskModal()"
            >
              ADD TASK
            </button>

            <button
              class="feature-button btn mb-2 lg:mb-0 xl:hidden inline-flex items-center text-main-body bg-primary-100 hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-200 font-semibold rounded-xl w-fit lg:px-4 py-2.5 text-center dark:bg-primary-100 dark:hover:bg-primary-200 dark:focus:ring-primary-100" onclick="OpenAddTaskModal()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            </div>

            <div class="flex items-center lg:order-3">
              <!-- Grouping Filter and Search buttons -->
              <form
                action="javascript:void(0)" novalidate
                method="GET"
                class="md:pl-2 me-3 lg:me-5 mb-2 lg:mb-0 lg:order-2"
                id="searchBar"
              >
                <label for="topbar-search" class="sr-only">Search</label>
                <div class="feature-button relative lg:w-full 2xl:w-96">
                  <div
                    class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="topbar-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>

              <button
                class="feature-button secondary-btn xl:inline-flex items-center hidden me-3 mb-2 lg:mb-0 lg:me-5 lg:order-3"
                id="toggleFilter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-light-primary dark:text-primary-100"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
                <span class="text-light-primary dark:text-primary-100 font-semibold">Filter</span>
              </button>

              <button
                class="feature-button secondary-btn xl:hidden inline-flex items-center me-3 mb-2 lg:mb-0 lg:me-5 lg:order-3"
                id="toggleFilterIcon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-6 h-6 text-light-primary dark:text-primary-100"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>

            <button
              class="feature-button secondary-btn lg:order-2 xl:inline-flex items-center hidden"
              type="button"
              id="dropdownDefaultButton1"
              data-dropdown-toggle="sortBtn1"
            >
              <?xml version="1.0" encoding="UTF-8"?>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                fill="currentColor"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                class="h-auto w-4 text-light-primary dark:text-primary-100"
              >
                <path
                  d="M12.067,17.445c.582,.589,.577,1.539-.012,2.121l-3.793,3.75c-.484,.483-1.121,.726-1.759,.726s-1.282-.243-1.77-.731l-3.787-3.744c-.589-.582-.594-1.532-.012-2.121,.582-.59,1.533-.594,2.122-.012l1.945,1.923V1.5c0-.828,.671-1.5,1.5-1.5s1.5,.672,1.5,1.5V19.357l1.945-1.923c.59-.582,1.539-.578,2.122,.012ZM23.055,4.477l-3.787-3.744c-.974-.975-2.56-.975-3.529-.006l-3.793,3.75c-.589,.582-.594,1.532-.012,2.121,.582,.59,1.533,.594,2.122,.012l1.945-1.923V22.5c0,.828,.671,1.5,1.5,1.5s1.5-.672,1.5-1.5V4.686l1.945,1.923c.292,.289,.674,.434,1.055,.434,.387,0,.773-.148,1.067-.445,.582-.589,.577-1.539-.012-2.121Z"
                />
              </svg>

              <span class="text-light-primary dark:text-primary-100 font-semibold" id="sortLabel">Oldest Task</span>
            </button>
            
              <button
                class="feature-button secondary-btn lg:order-2 xl:hidden inline-flex "
                id="dropdownDefaultButton2"
                data-dropdown-toggle="sortBtn2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  class="h-6 w-6 text-light-primary dark:text-primary-100"
                >
                  <path
                    d="M12.067,17.445c.582,.589,.577,1.539-.012,2.121l-3.793,3.75c-.484,.483-1.121,.726-1.759,.726s-1.282-.243-1.77-.731l-3.787-3.744c-.589-.582-.594-1.532-.012-2.121,.582-.59,1.533-.594,2.122-.012l1.945,1.923V1.5c0-.828,.671-1.5,1.5-1.5s1.5,.672,1.5,1.5V19.357l1.945-1.923c.59-.582,1.539-.578,2.122,.012ZM23.055,4.477l-3.787-3.744c-.974-.975-2.56-.975-3.529-.006l-3.793,3.75c-.589,.582-.594,1.532-.012,2.121,.582,.59,1.533,.594,2.122,.012l1.945-1.923V22.5c0,.828,.671,1.5,1.5,1.5s1.5-.672,1.5-1.5V4.686l1.945,1.923c.292,.289,.674,.434,1.055,.434,.387,0,.773-.148,1.067-.445,.582-.589,.577-1.539-.012-2.121Z"
                  />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div id="sortBtn1" class="z-30 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-nav">
                  <ul
                  class="py-2 text-md text-gray-700 dark:text-task"
                  aria-labelledby="dropdownDefaultButton1"
                  >
                    <li>
                      <a href="#" category="1" class="priority-lvl-item sort-option">Latest Task</a>
                    </li>
                    <li>
                      <a href="#" category="2" class="priority-lvl-item sort-option">Oldest Task</a>
                    </li>
                    <li>
                      <a href="#" category="3" class="priority-lvl-item sort-option">Highest Priority </a>
                    </li>
                    <li>
                      <a href="#" category="4" class="priority-lvl-item sort-option">Lowest Priority </a>
                    </li>
                    <li>
                      <a href="#" category="5" class="priority-lvl-item sort-option">Due Date</a>
                    </li>
                  </ul>
              </div>

              <!-- Dropdown menu for the second button -->
              <div id="sortBtn2" class="z-30 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-nav">
                <ul class="py-2 text-md text-gray-700 dark:text-task" aria-labelledby="dropdownButton2">
                  <li>
                      <a href="#" category="1" class="priority-lvl-item sort-option">Latest Task</a>
                    </li>
                    <li>
                      <a href="#" category="2" class="priority-lvl-item sort-option">Oldest Task</a>
                    </li>
                    <li>
                      <a href="#" category="3" class="priority-lvl-item sort-option">Highest Priority </a>
                    </li>
                    <li>
                      <a href="#" category="4" class="priority-lvl-item sort-option">Lowest Priority </a>
                    </li>
                    <li>
                      <a href="#" category="5" class="priority-lvl-item sort-option">Due Date</a>
                    </li>
                </ul>
              </div>
          `;
};
