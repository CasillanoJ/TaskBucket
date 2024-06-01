const ChangeUserPassword = async () => {
  const oldPassword = document.getElementById('oldPassword')
  const newPassword = document.getElementById('newPassword')
  const confirmPassword = document.getElementById('confirmPassword')
  
  const submitButton = document.getElementById('submitChangePassword')


  submitButton.addEventListener('click', function () {
      if (oldPassword.value === "") {
          alert("Old password missing");
          return;
      }
      if (newPassword.value === "") {
          alert("New password missing");
          return;
      }
      if (confirmPassword.value === "") {
          alert("Confirm password missing");
          return;
      }
      if (newPassword.value !== confirmPassword.value) {
          alert("New password and confirm password do not match");
          return;
      }
      confirm_change_password.showModal()
  });

 
}

const ConfirmChangePassword = ()=>{
  const oldPassword = document.getElementById('oldPassword')
  const newPassword = document.getElementById('newPassword')
  const confirmPassword = document.getElementById('confirmPassword')
  
  const submitButton = document.getElementById('submitChangePassword')
  const confirmChangePasswordButton = document.getElementById('confirm_Change_Password');
  confirmChangePasswordButton.addEventListener('click', async function () {
    const data = await ChangePassword(oldPassword.value, newPassword.value, confirmPassword.value);

    if(data.status == 400){
      document.getElementById('oldPassword-message-container').innerHTML = "Invalid current password"
      oldPassword.value = ''
      newPassword.value=''
      confirmPassword.value = ''
      confirm_change_password.close()
      return
    }
      changePassword.close()
      confirm_change_password.close()
      sucessfully_changed_password.showModal()
   
    


});
}