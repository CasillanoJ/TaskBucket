export const getTaskList = async (skip, limit, status) => {
  const AccessToken = localStorage.getItem("accessToken");
  const RefreshToken = localStorage.getItem("refreshToken");

  let options = () => {
    return {
      method: "POST",
      body: JSON.stringify({
        status: status,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AccessToken}`,
        refreshToken: `${RefreshToken}`,
      },
    };
  };

  let data = await api_client(
    `${getEnv("dev")}${getEndpoint("user")}/getTaskList/${skip}?limit=${limit}`,
    options()
  );

  console.log(data.user);
  return {
    data: data.data,
    status: data.status,
    message: data.message,
    count: data.count,
    total: data.totalTask,
  };
};
