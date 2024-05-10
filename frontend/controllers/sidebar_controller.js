const toggleButton = document.getElementById("toggle-sidebar");
const sidebar = document.getElementById("default-sidebar");
const svgContainer = document.getElementById("sidebar-toggle-icon");
const mainContainer = document.getElementById("main-container");

const leftArrow = `<svg class="w-6 h-6 dark:text-black text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
</svg>
`;

const rightArrow = `
  <svg class="w-6 h-6 dark:text-black text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
</svg>

  `;
toggleButton.addEventListener("click", () => {
  if (sidebar.classList.contains("sidebar-expanded")) {
    sidebar.classList.remove("sidebar-expanded");
    sidebar.classList.add("sidebar-collapsed");
    svgContainer.innerHTML = rightArrow;

    const textElements = document.querySelectorAll(
      ".dashboard-item .dashboard-text"
    );
    textElements.forEach((el) => el.classList.add("hidden-text"));

    mainContainer.classList.remove("lg:ml-64");
    mainContainer.classList.add("lg:ml-32");
  } else {
    sidebar.classList.remove("sidebar-collapsed");
    sidebar.classList.add("sidebar-expanded");
    svgContainer.innerHTML = leftArrow;
    const textElements = document.querySelectorAll(
      ".dashboard-item .dashboard-text"
    );
    textElements.forEach((el) => el.classList.remove("hidden-text"));
    mainContainer.classList.remove("lg:ml-32");
    mainContainer.classList.add("lg:ml-64");
  }
});
