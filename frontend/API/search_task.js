export const searchTask = async (value) => {
  const AccessToken = GetCookie("accessToken")

  let options = () => {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${AccessToken}`,
      },
    };
  };

  try {
     let data = await api_client(
       `${getEnv("dev")}${getEndpoint("task")}/search?query=${value}`,
       options()
     );
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
