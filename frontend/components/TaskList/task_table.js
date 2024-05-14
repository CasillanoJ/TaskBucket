const CreateTable = (task) => {
  const dateTimeString = task.dueDate;
  let datePart = "";
  if (!dateTimeString) {
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
                <tr class="table-row group">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    ${task.title}
                  </th>
                  <td class="px-6 py-3">${task.dueDate}</td>
                  <td class="px-6 py-4">
                    <div class="unassigned status">${task.status}</div>
                  </td>
                  <td class="px-6 py-4 priority">${task.priorityLevel}</td>
                  <td class="px-6 py-4">${owner}</td>

                  <td class="px-6 py-4">
                    <button class="px-2 invisible group-hover:visible">
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
                    <button class="px-2 invisible group-hover:visible">
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
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>

    `;
};
