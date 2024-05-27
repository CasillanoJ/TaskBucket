const GetEachUserProgression =async (id,start,end)=>{
    const AccessToken = GetCookie("accessToken")
    const RefreshToken = GetCookie("refreshToken");
  
  
    let options = ()=> {
        return{
            method: "POST",
            body: JSON.stringify({
                startDate: start,
                endDate: end
            }),
            headers :{
                "Content-Type" : 'application/json',
                "Authorization" :`${AccessToken}`,
                // "refreshToken" : `${RefreshToken}`,
            }
        }
    }
  
    let data = await api_client(`${getEnv("dev")}${getEndpoint("task")}/getProgress/${id}`, options())


    return{"data": data}
}