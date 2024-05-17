// export const filterTask = async (filter) => {
//   let options = () => {
//     return {
//       method: "POST",
//       body: JSON.stringify(filter),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0NDg4MjJjM2IzMzI1NWUzZWFmODciLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9iZXJ0IiwibGFzdF9uYW1lIjoiSm9obiIsImlzQWRtaW4iOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcxNTkzODQ3MSwiZXhwIjoxNzE1OTQyMDcxfQ.z5-7YxZBjD9fK4Yic96d_qah6gWT6x_FCPWsmvRbk9o",
//       },
//     };
//   };

//   let data = await api_client(
//     `${getEnv("dev")}${getEndpoint("task")}/filter`,
//     options()
//   );

//   console.log(data);
//   return {
//     data: data.tasks,
//     status: data.status,
//     message: data.message,
//     total: data.lenght,
//   };
// };
