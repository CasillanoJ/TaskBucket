const getUsers = async(skip,limit)=>{
  const AccessToken = GetCookie("accessToken")
  const RefreshToken = GetCookie("refreshToken");


  let options = ()=> {
      return{
          method: "POST",
          body: JSON.stringify({
             
          }),
          headers :{
              "Content-Type" : 'application/json',
              "Authorization" :`${AccessToken}`,
              // "refreshToken" : `${RefreshToken}`,
          }
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("user")}/?limit=${limit}&count=${skip}`, options())


return { "data":data.data , "status": data.status , "message" : data.message , "count" : data.count ,"total" : data.totalUsers, "successful": data.successful}
}

