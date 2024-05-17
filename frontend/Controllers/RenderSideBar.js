
const RenderSideBar = async ()=>{

  document.getElementById('sidebar-container').innerHTML = await SideBar() ;
  SideBarController()
  DarkMode()
  

}