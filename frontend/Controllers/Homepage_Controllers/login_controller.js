


const LoginUser =async()=>{
  try {

    const form = document.getElementById('login-form');

    const email = document.getElementById('email')

    
    const password = document.getElementById('password')

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      const messageContainer = document.getElementById('message-container');

      const data = await Login(email,password)

      if(data.status == 400){
        email = ''
        password = ''
        messageContainer.innerHTML = `<h1 class="text-urgent"> *Incorrect password or Email</h1>`
        return
      }
  

      if (data.successful ){
        console.log(data.accessToken)
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        email = ''
        password = ''
        messageContainer.innerHTML =""; 

        // window.location.href = '/frontend/views/dashboard.html'

        

      }
     
    })

  
   
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  LoginUser()
}); 