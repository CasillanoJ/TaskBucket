const ChangePassword = async(oldpassword,newPassword,confirmPassword) =>{
  const AccessToken = GetCookie("accessToken")
  const RefreshToken = GetCookie("refreshToken");


  let options = ()=> {
      return{
          method: "POST",
          body: JSON.stringify({
            oldPassword:oldpassword ,
            newPassword: newPassword,
            confirmPassword: confirmPassword
          }),
          headers :{
              "Content-Type" : 'application/json',
              "Authorization" :`${AccessToken}`,
              // "refreshToken" : `${RefreshToken}`,
          }
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("user")}/changePassword`, options())

  

return { "status": data.status , "message" : data.message , "successful": data.successful}
}