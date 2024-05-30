export const CreateNewbieTable = (user) => {
  return `
    <tr class="table-item-row group" data-user-id="${user._id}">
      <td class="w-4 p-4">
        <div class="flex items-center">
          <input id="${user._id}" type="checkbox" class="user-checkbox w-5 h-5 text-primary-100 bg-gray-100 border-black rounded focus:ring-blue-500 dark:focus:ring-primary-100 dark:ring-offset-gray-800 dark:focus:ring-offset-primary-100 focus:ring-2 dark:bg-transparent dark:border-black">
          <label for="${user._id}" class="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
        ${user.first_name} ${user.last_name}
      </th>
      <td class="px-6 py-4">
        ${user.email}
      </td>
      <td class="px-20 py-4 text-black font-medium text-right">
        <div class="space-x-10 space-y-2">
          <button class="bg-green-400 w-24 px-4 py-0.5 rounded-xl accept-btn">
            Accept
          </button>
          <button class="bg-red-500 w-24 px-4 py-0.5 rounded-xl reject-btn">
            Reject
          </button>
        </div>
      </td>
    </tr>
  `;
};
