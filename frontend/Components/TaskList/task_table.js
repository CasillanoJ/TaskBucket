export const CreateTable = (task) => {
  const dateTimeString = task.dueDate;
  let datePart = "";
  if (!dateTimeString || dateTimeString === null) {
    datePart = "None";
  } else {
    datePart = dateTimeString.split("T")[0];
  }

  let owner;
  let color;

  if (task.assignee != null) {
    owner = task.assignee.first_name + " " + task.assignee.last_name;
  } else {
    owner = "Pending";
  }

  switch (task.status) {
    case "Unassigned":
      color = "unassigned";
      break;
    case "To do":
      color = "to-do";
      break;
    case "In progress":
      color = "in-progress";
      break;
    case "Completed":
      color = "completed";
      break;
  }
  return `
                <tr class="table-row group" data-id="${task._id}" onclick="Task_modal_${task._id}.showModal()">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    ${task.title}
                  </th>
                  <td class="px-6 py-3">${datePart}</td>
                  <td class="px-6 py-4">
                    <div class="${color} status">${task.status}</div>
                  </td>
                  <td class="px-6 py-4 priority">${task.priorityLevel}</td>
                  <td class="px-6 py-4">${owner}</td>

                  <!-- <td class="px-6 py-4">
                    <button class="p-2 hover:bg-black invisible group-hover:visible" onclick="OpenEditModal(this)" data-id="${task._id}">
                      <svg
                        class="w-6 h-6 text-gray-800 dark:text-primary-100"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                        />
                      </svg>
                    </button>
                    
                  </td> -->
                </tr>

    `;
};

export const CreateSearchResults = (task) => {
  const dateTimeString = task.dueDate;
  let datePart = "";
  if (!dateTimeString || dateTimeString === null) {
    datePart = "None";
  } else {
    datePart = dateTimeString.split("T")[0];
  }

  let owner;
  let color;

  if (task.assignee != null) {
    owner = task.assignee.first_name + " " + task.assignee.last_name;
  } else {
    owner = "Pending";
  }

  switch (task.status) {
    case "Unassigned":
      color = "unassigned";
      break;
    case "To do":
      color = "to-do";
      break;
    case "In progress":
      color = "in-progress";
      break;
    case "Completed":
      color = "completed";
      break;
  }
  return `
                <tr class="table-row group" data-id="${task._id}" onclick="Task_modal_${task._id}.showModal()">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    ${task.title}
                  </th>
                  <td class="px-6 py-3">${datePart}</td>
                  <td class="px-6 py-4">
                    <div class="${color} status">${task.status}</div>
                  </td>
                  <td class="px-6 py-4 priority">${task.priorityLevel}</td>
                  <td class="px-6 py-4">${owner}</td>

                  <td class="px-6 py-4">
                    <button class="px-2 invisible group-hover:visible" onclick="OpenEditModal(this)" data-id="${task._id}">
                      <svg
                        class="w-6 h-6 text-gray-800 dark:text-primary-100"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>

    `;
};
