


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
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        messageContainer.innerHTML = `<div role="alert" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Incorrect Password or Email</span>
      </div>`
        return
      }
      
      
      if (!data.successful ){
        return
      }
        

        if(!data.user.isVerified){
          messageContainer.innerHTML = ''
          document.getElementById('email').value = ''
        document.getElementById('password').value = ''
          Unverified.showModal()
          return
        }
       


        document.cookie = `accessToken=${data.accessToken}`;
        document.cookie = `refreshToken=${data.refreshToken}`;
        document.cookie = `isAdmin=${data.user.isAdmin}`;
        document.cookie = `userId =${data.user.userId}`;


        messageContainer.innerHTML =""; 
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        window.location.href = 'dashboard.html'
    })

  
   
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  document.getElementById('email').value = ''
  document.getElementById('password').value = ''
  LoginUser()
}); 