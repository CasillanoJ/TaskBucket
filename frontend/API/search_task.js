export const searchTask = async (value) => {
  let options = () => {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNTk5ODA1MSwiZXhwIjoxNzE2MDAxNjUxfQ.ni_rjJhtyeWNWAMqgAYZ2hvNxnKecI8Pk2LLNGBd7Zw",
      },
    };
  };

  let data = await api_client(
    `${getEnv("dev")}${getEndpoint("task")}/search?query=${value}`,
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
