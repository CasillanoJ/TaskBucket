const UserProgressions = async(skip,limit)=>{

  const isAdmin = GetCookie("isAdmin")




  if(!isAdmin){
    return 
  }



let ProgressionTabHTML =''
const mainContainer = document.getElementById('progress-container');
mainContainer.innerHTML = ''; 


const startDate = document.getElementById('performance-startDate');
const endDate = document.getElementById('performance-endDate');

const userList = await getUsers(skip, limit);


for (const user of userList.data) {
    const data = await GetEachUserProgression(user._id, startDate.value, endDate.value);
 
     ProgressionTabHTML += await EachUserProgressionBar(user.first_name, user.last_name, data.data)

  }
  mainContainer.innerHTML = ProgressionTabHTML
  mainContainer.innerHTML += await DashboardPagination(limit,userList.total,skip)

  
}