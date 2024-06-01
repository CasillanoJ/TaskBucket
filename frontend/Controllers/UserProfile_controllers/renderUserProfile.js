const RenderUserProfile = async()=>{
  const userID = GetCookie('userId')

 const startDate = document.getElementById('performance-endDate').value
 const endDate = document.getElementById('performance-startDate').value
  const data = await GetEachUserProgression(userID,startDate,endDate)

  const userProfileProgression = await UserProfileProgression(data.data)
  document.getElementById('user-profile-progression').innerHTML = userProfileProgression;



  if(data.data.totalTask == 0){
    document.getElementById('user-profile-chart'). innerHTML ='<h1 class="flex justify-center text-3xl">No Task Yet</h1>'
    return
  }
  await createDoughnutChart('#user-profile-chart',

  [data.data.totalToDo, data.data.totalInprogress, data.data.completedCount, data.data.totalLateTask],
        ['To do', 'In progress', 'Completed', 'Late tasks'],
        ['#22d3ee', '#FA59A0', '#6CC000', '#FF433E'],
        ['#000000', '#000000', '#000000', '#000000']
  )
}



const RenderProgressionTab = () => {
  const endDate = document.getElementById('performance-endDate');
  const startDate = document.getElementById('performance-startDate')


  endDate.addEventListener('input', async function() {
    await RenderUserProfile()
    
  });

};


const RenderUserProfileProgress  = async(isAdmin)=>{

  const user = await GetSpecificUser()
  
  console.log(user)

  if(user.status == 400 || user.status == 401){
    return
  }

  const dateToday = new Date().toISOString().split('T')[0]

  const data = await GetEachUserProgression(user.data._id,dateToday,dateToday)

  document.getElementById('user-name').innerHTML = `${user.data.first_name} ${user.data.last_name}`
  if(isAdmin == true){
    document.getElementById('completed-for-today').innerHTML = ` Total Task Created: ${data.data.totalTask}`
  }else{
    document.getElementById('completed-for-today').innerHTML = ` Task Completed: ${data.data.completedCount}`
  }

}


document.addEventListener("DOMContentLoaded", async function() {
  const isAdmin = GetCookie('isAdmin')
  


  if(isAdmin == false || isAdmin == "false"){
    const userProfile = await UserProfile()
    document.getElementById('user-profile-progress-tab').innerHTML = userProfile
    await RenderUserProfile()
    RenderProgressionTab()
  }

  await RenderUserProfileProgress(isAdmin)

  ChangeUserPassword()
  ConfirmChangePassword()



 
}); 