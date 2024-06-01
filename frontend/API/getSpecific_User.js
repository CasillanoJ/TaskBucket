const GetSpecificUser =async()=>{
  const AccessToken = GetCookie("accessToken")
  const RefreshToken = GetCookie("refreshToken");


  let options = ()=> {
      return{
          method: "GET",
          headers :{
              "Content-Type" : 'application/json',
              "Authorization" :`${AccessToken}`,
              // "refreshToken" : `${RefreshToken}`,
          }
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("user")}/getSpecificUser`, options())


return { "data":data.data , "status": data.status , "message" : data.message , "successful": data.successful}
}