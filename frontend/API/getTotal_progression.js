const GetAllUsersTotalProgression = async(startDate, endDate)=>{
  
    const AccessToken = GetCookie("accessToken")
    const RefreshToken = GetCookie("refreshToken");
  
  
    let options = ()=> {
        return{
            method: "POST",
            body: JSON.stringify({
                startDate :startDate,
                endDate : endDate
            }),
            headers :{
                "Content-Type" : 'application/json',
                "Authorization" :`${AccessToken}`,
                // "refreshToken" : `${RefreshToken}`,
            }
        }
    }
  
    let data = await api_client(`${getEnv("dev")}${getEndpoint("user")}/getTotalProgression`, options())
  
   
  
  return { "data":data.data , "status": data.status , "message" : data.message , "count" : data.count ,"total" : data.totalTask}

}