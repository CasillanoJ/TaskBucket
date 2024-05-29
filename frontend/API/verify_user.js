
export const updateUserVerification = async (userIds) => {
  try {
    const AccessToken = GetCookie("accessToken");
    const RefreshToken = GetCookie("refreshToken");

    const options = {
      method: "POST",
      body: JSON.stringify({ userIds }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AccessToken}`,
        // "refreshToken" : `${RefreshToken}`,
      },
    };

    const data = await api_client(
      `${getEnv("dev")}${getEndpoint("user")}/verifyUser`,
      options
    );
    return { successful: data.successful };
  } catch (error) {
    console.error("Error updating user verification status:", error);
    return { success: false };
  }
};
