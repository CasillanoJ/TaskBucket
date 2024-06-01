
const AddUser = async(firstName, lastName,email, password)=>{

  let options = ()=> {
      return{
          method: "POST",
          headers :{
              "Content-Type" : 'application/json',
          },
          body: JSON.stringify({
            first_name :firstName,
            last_name : lastName,
            email : email,
            password: password
          }),
      }
  }

  let data = await api_client(`${getEnv("dev")}${getEndpoint("register")}`, options())

    console.log(data);

  return { "message":data.message ,"successful": data.successful}
}