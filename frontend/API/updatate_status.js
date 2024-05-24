const UpdateTaskStatus = async(id,status)=>{
  const AccessToken = GetCookie("accessToken")
  const RefreshToken = GetCookie("refreshToken");


  let options = ()=> {
      return{
          method: "POST",
          body: JSON.stringify({
            status : status
          }),
          headers :{
              "Content-Type" : 'application/json',
              "Authorization" :`${AccessToken}`,
              // "refreshToken" : `${RefreshToken}`,
          }
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("task")}/stats/${id}`, options())


return { "data":data.data , "status": data.status , "message" : data.message }
}
