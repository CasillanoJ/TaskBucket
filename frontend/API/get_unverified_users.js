export const getUnverifiedUsers = async () => {
  const AccessToken = GetCookie("accessToken");

  let options = () => {
    return {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AccessToken}`,
      },
    };
  };

  let data = await api_client(
    `${getEnv("dev")}${getEndpoint("user")}/unverified`,
    options()
  );

  return {
    data: data.data,
    message: data.message,
    count: data.count,
  };
};
