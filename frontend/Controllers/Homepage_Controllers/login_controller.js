


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
        

        if(!data.user.isVerified){
         
          Unverified.showModal()
        }else{
       

        document.cookie = `accessToken=${data.accessToken}`;
        document.cookie = `refreshToken=${data.refreshToken}`;
        document.cookie = `isAdmin=${data.user.isAdmin}`;


        messageContainer.innerHTML =""; 

        let key = "accessToken"
        let x = document.cookie.split(";");
        let value = ""
        for (let index = 0; index < x.length; index++) {
          const name = x[index].split("=")[0]
          // console.log(name);
          // console.log(x[index].split("=")[1]);
          if (name.trim() === key){
            value = x[index].split("=")[1]
            break;
          }
          
        }

        console.log(value);
        // window.location.href = '/frontend/views/dashboard.html'

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
  LoginUser()
}); 