


const Login = async(email, password)=>{

  let options = ()=> {
      return{
          method: "POST",
          headers :{
              "Content-Type" : 'application/json'
             
          },
          body: JSON.stringify({
            "email": email,
            "password":password
          }),
      }
  }
  console.log(`${getEnv("dev")}${getEndpoint("login")}`)

  let data = await api_client(`${getEnv("dev")}${getEndpoint("login")}`, options())



  return { "message":data.message , "accessToken": data["Access Token"], "refreshToken": data["Refresh Token"]}
}