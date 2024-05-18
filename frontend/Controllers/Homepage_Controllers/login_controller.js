


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
        messageContainer.innerHTML = `<h1 class=" text-xl text-urgent "> *Incorrect password or Email</h1>`
        return
      }
  

      if (data.successful ){
        

        if(!data.user.isVerified){
          messageContainer.innerHTML = ''
          document.getElementById('email').value = ''
        document.getElementById('password').value = ''
          Unverified.showModal()
        }else{
       

        document.cookie = `accessToken=${data.accessToken}`;
        document.cookie = `refreshToken=${data.refreshToken}`;
        document.cookie = `isAdmin=${data.user.isAdmin}`;


        messageContainer.innerHTML =""; 
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        window.location.href = '/frontend/views/dashboard.html'
        

        }
        
       
        email = ''
        password=''
        

      }
     
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