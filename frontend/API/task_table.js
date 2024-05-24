export const getTask = async () => {
  let options = () => {
    return {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNjUzMzY0MywiZXhwIjoxNzE2NTM3MjQzfQ.Xyl09xGimrGyO2ar6RXkIeFtdECQ11vnM8zIuHWCfUo",
      },
    };
  };

  let data = await api_client(
    `${getEnv("dev")}${getEndpoint("task")}/`,
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
