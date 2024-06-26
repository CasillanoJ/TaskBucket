const getTask = async(id)=>{
  const AccessToken = GetCookie("accessToken")
  const RefreshToken = GetCookie("refreshToken");


  let options = ()=> {
      return{
          method: "POST",
          body: JSON.stringify({
              id: `${id}`
          }),
          headers :{
              "Content-Type" : 'application/json',
              "Authorization" :`${AccessToken}`,
              // "refreshToken" : `${RefreshToken}`,
          }
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("user")}/getTask`, options())

  

return { "data":data.data , "status": data.status , "message" : data.message , "count" : data.count ,"total" : data.totalTask}
}
