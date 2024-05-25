export const getNotification = async (value) => {
    let options = () => {
      return {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNTk1MjU2NywiZXhwIjoxNzE1OTU2MTY3fQ.GG8YMFBeVnn95NP5g4EtGvC9pj8dC6n8voFPT_g4N20",
        },
      };
    };
  
    let data = await api_client(
      `${getEnv("dev")}${getEndpoint("notification")}/get`,
      options()
    );
  
    console.log(data);
    return {
      data: data.tasks,
      status: data.status,
      message: data.message,
      total: data.lenght,
    };
  };
  