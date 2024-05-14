


const LoginUser =async()=>{
  try {

    const form = document.getElementById('login-form');

    const email = document.getElementById('email')

    
    const password = document.getElementById('password')

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const data = await Login(email,password)

      console.log(data.accessToken)
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    })

  
   
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  LoginUser()
}); 