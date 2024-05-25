export const sortTask = async (category) => {
  const AccessToken = GetCookie("accessToken")

  let options = () => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" :`${AccessToken}`,
    
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
