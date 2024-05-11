// function getTaskList(skip, limit, status) {
//     return fetch(`http://localhost:8000/users/getTaskList/${skip}?limit=${limit}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxMzQxNjM2MywiZXhwIjoxNzEzNDE5OTYzfQ.MXJGeqrDtmNFAG4JaHDzCQ8Pf4Z08yJVY40W1b0yZRo'
//       },
//       body:{
  
//       }
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       throw error;
//     });
//   }


const getTaskList = async(skip,limit)=>{

    let options = ()=> {
        return{
            method: "POST",
            body: JSON.stringify({}),
            headers :{
                "Content-Type" : 'application/json',
                "Authorization" :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNTQwMDc2MSwiZXhwIjoxNzE1NDA0MzYxfQ.1_KHJNc7yV6uhK1knNEeWXlLe8_dDdKWTkLUQHhX4Tw'
            }
        }
    }

    let data = await api_client(`${getEnv("dev")}${getEndpoint("user")}/getTaskList/${skip}?limit=${limit}`, options())

    return data.data
}