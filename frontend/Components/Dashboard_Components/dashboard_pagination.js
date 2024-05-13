const DashboardPagination = ( limit,total, skip, status) =>{
  let leftButton = ``
  let  rightButton = `
  <button class ='px-2' onclick="PaginationController(${skip + limit}, ${limit},'${status}')"> <svg class="w-6 h-6 text-black  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
              </svg>
              
              </button>`

    if(limit <= skip){
      leftButton = `<button class='px-2' onclick="PaginationController(${skip - limit}, ${limit},'${status}')"> <svg class="w-6 h-6 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
    </svg>
    </button>`
    }

    if(skip +limit >= total){
      rightButton = ``
    }

    let count = skip + limit;

    if(count > total){
      count = total
    }

  return `
  <div>
              <ul class="flex justify-center">
                <li>
                  ${leftButton}
                </li>
                <li>
                  <span class="text-black dark:text-white">${count}/${total}</span>
                </li>
                <li>
                  ${rightButton}
                </li>
              </ul>
            </div>
            `
}