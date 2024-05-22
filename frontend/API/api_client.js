const api_client = async (endpoint, options) => {
  let response = await fetch(endpoint, options);
  if (response.ok) {
    return response.json();
  }
  return {
    message: "unable to access API ",
    status: response.status,
  };
};
