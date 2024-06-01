const CreateTeamTable = (user) => {
  let role;

  if (user.isAdmin && user.isVerified) {
    role = "Admin";
  } else if (!user.isAdmin && user.isVerified) {
    role = "User";
  }

  return `
        <tr class="table-row group" data-user-id="${user._id}">
                  <td class="px-6 py-3">${user.first_name} ${user.last_name}</td>
                  <td class="px-6 py-3">${user.email}</td>
                  <td class="px-6 py-3">${role}</td>

                  <td class="px-6 py-4">
                    <button class="deleteMember px-2 invisible group-hover:visible" data-id="${user._id}">
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
