


const Login = async(email, password)=>{

  let options = ()=> {
      return{
          method: "POST",
          headers :{
              "Content-Type" : 'application/json',
            
             
          },
          body: JSON.stringify({
            "email": email,
            "password":password
          }),
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("login")}`, options())

 
    

  return { "message":data.message ,"successful": data.successful, "status": data.status, "accessToken": data["Access Token"], "refreshToken": data["Refresh Token"], "user": data.user}
}