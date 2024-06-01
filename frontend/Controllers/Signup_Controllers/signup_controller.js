const RenderSignUp = () => {

  const firstName = document.getElementById('register-firstName');
  const lastName = document.getElementById('register-lastName');
  const email = document.getElementById('register-email');
  const password = document.getElementById('register-password');
  const confirmPassword = document.getElementById('register-confirmPassword');

  const AlertFirstName = document.getElementById('alert-container-firstName');
  const AlertLastName = document.getElementById('alert-container-lastName');
  const AlertEmail = document.getElementById('alert-container-email');
  const AlertPassword = document.getElementById('alert-container-password');
  const AlertConfirmPassword = document.getElementById('alert-container-confirmPassword');

  const SubmitButton = document.getElementById('register-signUp');

  const AlertMessage = (text) => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 mt-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
   </svg>
   <span>${text} is Required</span>
    `;
  };

  const isStrongPassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  SubmitButton.addEventListener('click', async function () {

    let isValid = true;

    if (firstName.value === "") {
      firstName.classList.add("border-warning");
      AlertFirstName.innerHTML = AlertMessage("First Name");
      isValid = false;
    } else {
      firstName.classList.remove("border-warning");
      AlertFirstName.innerHTML = '';
    }
    
    if (lastName.value === "") {
      lastName.classList.add("border-warning");
      AlertLastName.innerHTML = AlertMessage("Last Name");
      isValid = false;
    } else {
      lastName.classList.remove("border-warning");
      AlertLastName.innerHTML = '';
    }
    
    if (email.value === "") {
      email.classList.add("border-warning");
      AlertEmail.innerHTML = AlertMessage("Email");
      isValid = false;
    } else {
      email.classList.remove("border-warning");
      AlertEmail.innerHTML = '';
    }
    
    if (confirmPassword.value === "") {
      confirmPassword.classList.add("border-warning");
      AlertConfirmPassword.innerHTML = AlertMessage("Confirm Password");
      isValid = false;
    } else {
      confirmPassword.classList.remove("border-warning");
      AlertConfirmPassword.innerHTML = '';
    }
    
    if (password.value === "") {
      password.classList.add("border-warning");
      AlertPassword.innerHTML = AlertMessage("Password");
      isValid = false;
    } else {
      if (!isStrongPassword(password.value)) {
        password.classList.add("border-warning");
        AlertPassword.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span> Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character</span>';
        isValid = false;
      } else {
        password.classList.remove("border-warning");
        AlertPassword.innerHTML = '';
      }
    }

    if (isValid) {
      AlertFirstName.innerHTML = '';
      AlertLastName.innerHTML = '';
      AlertEmail.innerHTML = '';
      AlertConfirmPassword.innerHTML = '';
      AlertPassword.innerHTML = '';

      if (password.value != confirmPassword.value) {
        AlertPassword.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span> Password does not match with Confirm Password</span>';
        AlertPassword.classList.remove("text-warning")
        AlertPassword.classList.add("text-error")
        return
      } else {
        AlertPassword.innerHTML = '';
        AlertPassword.classList.add("text-warning")
        AlertPassword.classList.remove("text-error")
        
      }
     const  data = await AddUser(firstName.value,lastName.value,email.value,password.value)
     console.log(data)
     if(data.successful == true){
      document.getElementById('register-firstName').value =''
      document.getElementById('register-lastName').value= ''
      document.getElementById('register-email').value = ''
      document.getElementById('register-password').value =''
      document.getElementById('register-confirmPassword').value =''
      Succesfully_registered.showModal()

     }
  
    }
  });
};



document.addEventListener("DOMContentLoaded", async function() {
  RenderSignUp()
})

