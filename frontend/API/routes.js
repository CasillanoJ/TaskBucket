const getEndpoint = (data)=>{
    let endpoint = ""
    switch (data) {
        case "user":
            endpoint = "/users"
            break;
       case "task":
           endpoint = "/task"
          break;
        case "login":
           endpoint = "/login"
          break;
        default:
            endpoint =""
            break;
    }
    return endpoint
}

const getEnv = (data) =>{
    let env = ""
    switch(data){
        case "dev":
            env = "http://localhost:8000"
        break;
        default:
            env = ""
           break; 
    }

    return env
}
