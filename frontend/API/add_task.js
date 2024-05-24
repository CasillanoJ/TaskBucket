const AddTask = async(Title, Description,PriorityLevel,Assignee,DueDate)=>{
  const AccessToken = GetCookie("accessToken")
  const RefreshToken = GetCookie("refreshToken");


  let options = ()=> {
      return{
          method: "POST",
          body: JSON.stringify({
            title: Title,
            description: Description,
            priorityLevel: PriorityLevel,
            assignee :Assignee,
            dueDate : DueDate

          }),
          headers :{
              "Content-Type" : 'application/json',
              "Authorization" :`${AccessToken}`,
              // "refreshToken" : `${RefreshToken}`,
          }
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("task")}/add`, options())

  

return { "data":data.task , "status": data.status , "message" : data.message }
}
