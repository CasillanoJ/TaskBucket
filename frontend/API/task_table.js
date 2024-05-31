export const getTask = async () => {
  let options = () => {
    return {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNzExNzEzMSwiZXhwIjoxNzE3MTIwNzMxfQ._D3EqNWRdF4FbK0wvqbD_tHac7AmojN3maOaZxeHnoM",
      },
    };
  };

  let data = await api_client(
    `${getEnv("dev")}${getEndpoint("task")}/`,
    options()
  );
  return {
    data: data.tasks,
    status: data.status,
    message: data.message,
    total: data.lenght,
  };
};
