const SideBar = async()=>{
  return `
  <aside id="default-sidebar" class="fixed mt-14 left-0 z-40 h-screen border-e-2 shadow-md dark:border-gray-700  -translate-x-full sm:translate-x-0 bg-white dark:bg-nav transition-all duration-300 sidebar-expanded">
        
      <div class="overflow-y-auto py-5 px-3 h-full  ">
        <div class="top-0 right-14">
        <button id="toggle-sidebar" class="p-1  bg-nav-toggle-btn rounded-full  ml-8  transition-transform duration-100  absolute top-8 -translate-y-1/2 -right-3  text-white  flex items-center">
          <div id="sidebar-toggle-icon">
            <svg class="w-6 h-6 dark:text-black text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
            </svg>
          </div>
          
          
      </button>
    </div>

    
      <ul class="space-y-2 mt-10">
        <li>
          <a href="#" class="side-nav-item group dashboard-item rounded-full dark:bg-primary-100  bg-light-active">
            <svg class="w-6 h-6 text-light-primary  dark:text-black dark:group-hover:text-black" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
            </svg>

            <span class="ml-3 text-light-primary dark:text-black dashboard-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#" class="side-nav-item group dashboard-item">
            <svg class="w-6 h-6 dark:text-white dark:group-hover:text-black" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z" />
            </svg>

            <span class="ml-3 dashboard-text">View Task List</span>
          </a>
        </li>
        <li>
          <a href="#" class="side-nav-item group dashboard-item  rounded-full ">
            <svg class="w-6 h-6   dark:group-hover:text-black" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
            </svg>

            <span class="ml-3   dashboard-text">View Team</span>
          </a>
        </li>
        <li>
          <a href="#" class="side-nav-item group   dashboard-item  rounded-full">
            <svg class="w-6 h-6  dark:group-hover:text-black" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207" />
            </svg>


            <span class="ml-3  dashboard-text">Performance</span>
          </a>
        </li>
      </ul>
      <ul class="pt-5 mt-5 space-y-2 border-t-2 border-gray-200 dark:border-gray-700">
        <li>
          <a href="#" class="side-nav-item group dashboard-item">
            <svg class="w-6 h-6 dark:text-white dark:group-hover:text-black" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
            </svg>

            <span class="ml-3 dashboard-text">User Profile</span>
          </a>
        </li>
        <li>
          <a href="#"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75  hover:bg-red-600 dark:hover:bg-red-600  dark:text-white group dark:hover:text-primary-100 dashboard-item group">
            <svg width="27" height="27" viewBox="0 0 27 27" class="fill-light-primary dark:fill-primary-100 group-hover:fill-black " xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.4145 13.9241C22.4225 13.9008 22.434 13.8793 22.4417 13.856C22.5197 13.6247 22.5197 13.3754 22.4417 13.1441C22.434 13.1207 22.4224 13.0992 22.4145 13.0761C22.4112 13.068 22.4084 13.0602 22.4049 13.0522C21.5705 10.6488 19.6461 8.73806 17.2309 7.93278C16.6377 7.73445 16.0049 8.05473 15.8083 8.64468C15.6116 9.23407 15.9302 9.87071 16.5191 10.0674C17.7684 10.4835 18.8382 11.3061 19.5703 12.3751H11.25C10.6282 12.3751 10.125 12.8788 10.125 13.5001C10.125 14.1213 10.6282 14.6251 11.25 14.6251H19.5703C18.8381 15.6939 17.7684 16.5165 16.5191 16.9328C15.9302 17.1294 15.6116 17.7661 15.8083 18.3555C15.9653 18.8273 16.4037 19.1256 16.875 19.1256C16.9926 19.1256 17.1123 19.107 17.2309 19.0674C19.6461 18.2621 21.5705 16.3514 22.4049 13.9479C22.4084 13.9399 22.4112 13.9322 22.4145 13.9241Z"
                 />
              <path
                d="M5.25935 20.1752C5.76144 22.3461 7.42363 23.9897 9.49239 24.3627L9.86038 24.4292C11.0491 24.644 12.2444 24.7511 13.4408 24.7511C14.6372 24.7511 15.8337 24.644 17.0212 24.4298C18.4945 24.1639 19.7975 23.2394 20.5951 21.8936C20.9116 21.3591 20.7358 20.6691 20.2007 20.3522C19.6657 20.0353 18.9757 20.2127 18.6593 20.7466C18.1946 21.53 17.452 22.0656 16.6214 22.2155C14.512 22.5957 12.3708 22.5957 10.2614 22.2155L9.89345 22.1485C8.70916 21.9353 7.75111 20.9619 7.45231 19.6689C6.51958 15.633 6.51958 11.367 7.45231 7.33122C7.751 6.03804 8.70905 5.06469 9.89446 4.85094L10.2603 4.78445C12.3697 4.40431 14.512 4.40431 16.6214 4.78445C17.3828 4.92237 18.0617 5.37327 18.5319 6.05559C18.8857 6.56645 19.5854 6.69335 20.0974 6.34179C20.6083 5.98854 20.7369 5.28822 20.3842 4.7768C19.5701 3.59847 18.3758 2.81514 17.0212 2.57079C14.646 2.14126 12.2367 2.14228 9.85925 2.57079L9.49352 2.63671C7.42374 3.01021 5.76144 4.65384 5.25935 6.82475C4.25079 11.1917 4.25079 15.8082 5.25935 20.1752Z"
                />
            </svg>


            <span class="ml-3 text-light-primary dark:text-primary-100 font-medium dashboard-text group-hover:text-black">Logout</span>
          </a>
        </li>
        <li>

        </li>

      </ul>
          <button id="theme-toggle" type="button"
          class="text-black border  border-primary dark:text-yellow-400 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-primary focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 tooltip tooltip-top"
          >
          <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      
  </aside> 
  `
}