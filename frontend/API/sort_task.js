export const sortTask = async (category) => {
  let options = () => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNjU2MjA3MywiZXhwIjoxNzE2NTY1NjczfQ.DgY64OtSgTdk25fDz0a7_0YVi9vU2784cPppjjA-pw0",
      },
    };
  };

  let data = await api_client(
    `${getEnv("dev")}${getEndpoint("task")}/sortBy?category=${category}`,
    options()
  );
  return {
    data: data.data,
    status: data.status,
    message: data.message,
    total: data.lenght,
  };
};
