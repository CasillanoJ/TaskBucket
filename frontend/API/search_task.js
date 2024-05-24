export const searchTask = async (value) => {
  let options = () => {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNjUzMzY0MywiZXhwIjoxNzE2NTM3MjQzfQ.Xyl09xGimrGyO2ar6RXkIeFtdECQ11vnM8zIuHWCfUo",
      },
    };
  };

  try {
     let data = await api_client(
       `${getEnv("dev")}${getEndpoint("task")}/search?query=${value}`,
       options()
     );

    console.log(data);

    return {
      data: data.data,
      status: data.status,
      message: data.message,
      total: data.length,
    };
  } catch (error) {
    console.error("Error filtering tasks:", error);
    return { data: [], status: 500, message: error.message };
  }
};
