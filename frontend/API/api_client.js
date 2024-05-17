<<<<<<< HEAD
const api_client = async (endpoint, options)=>{
    let response = await fetch(endpoint, options)
    if( response.ok){
        return response.json();
    }
    return {
        "message" :"unable to access API ",
        "status": response.status
    }
}
=======
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
>>>>>>> origin/backend/frontend/merge
