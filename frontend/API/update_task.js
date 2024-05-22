const UpdateSpecificTask = async(id,title,description,assignee,dueDate,priorityLevel)=>{
  const AccessToken = GetCookie("accessToken")
  const RefreshToken = GetCookie("refreshToken");


  let options = ()=> {

        if(assignee == null || assignee == ""){
            assignee = null
        }
      return{
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description ,
            priorityLevel: priorityLevel ,
            assignee: assignee,
            dueDate: dueDate,

          }),
          headers :{
              "Content-Type" : 'application/json',
              "Authorization" :`${AccessToken}`,
              // "refreshToken" : `${RefreshToken}`,
          }
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("task")}/${id}`, options())

  

return { "data":data.data , "status": data.status , "message" : data.message , "count" : data.count ,"total" : data.totalTask}
}
