


const getTaskList = async(skip,limit,status)=>{

    let options = ()=> {
        return{
            method: "POST",
            body: JSON.stringify({
                status: status
            }),
            headers :{
                "Content-Type" : 'application/json',
                "Authorization" :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNTU5MjE5NSwiZXhwIjoxNzE1NTk1Nzk1fQ.8wGwIJF9xfHK1ExkHUwJNnvA4EzwtmboYGBjZEg78f4'
            }
        }
    }

    let data = await api_client(`${getEnv("dev")}${getEndpoint("user")}/getTaskList/${skip}?limit=${limit}`, options())


    return { "data":data.data , "status": data.status , "message" : data.message , "count" : data.count ,"total" : data.totalTask}
}