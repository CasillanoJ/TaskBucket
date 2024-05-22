async function OpenEditModal(button) {
  const dataId = button.getAttribute("data-id");

  const taskTitle = document.getElementById("edit-modal-title");
  const taskStatus = document.getElementById("edit-modal-status");
  const taskAssignee = document.getElementById("edit-modal-assignee");
  const taskDueDate = document.getElementById("edit-modal-dueDate");
  const taskPriorityLevel = document.getElementById("edit-modal-priorityLevel");
  const taskDescription = document.getElementById("edit-modal-description");

  const users = await getUsers();
  const data = await getTask(dataId);
  const taskData = data.data[0];


  taskTitle.value = taskData.title;
  taskStatus.innerHTML = `Status: ${taskData.status}`;

  const userOptions = (users, assignee) => {
    let selectHtml = assignee
      ? `<option value="assignee._id" selected >${assignee.first_name} ${assignee.last_name}</option>`
      : '<option value="" selected>None</option>';


    users.forEach(user => {
      const userName = `${user.first_name} ${user.last_name}`;
      const assigneeName = assignee ? `${assignee.first_name} ${assignee.last_name}` : null;

      if (!assigneeName || userName !== assigneeName) {
        selectHtml += `<option value="${user._id}">${userName}</option>`;
      }
    });

    return selectHtml;
  };

  const selectOption = (status) => {
    const statusList = ["Neutral", "High", "Urgent"];
    let selectHtml = `<option selected>${status}</option>`;

    statusList.forEach(element => {
      if (element !== status) {
        selectHtml += `<option value="${element}">${element}</option>`;
      }
    });

    return selectHtml;
  };

  taskPriorityLevel.innerHTML = selectOption(taskData.priorityLevel);
  taskAssignee.innerHTML = userOptions(users.data, taskData.assignee);


  const dateTimeString = taskData.dueDate;
  const datePart = dateTimeString
    ? new Date(dateTimeString).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  taskDueDate.defaultValue = datePart;
  taskDueDate.setAttribute("min", new Date().toISOString().split('T')[0]);
  taskDescription.value = taskData.description;

  const saveBttn = document.getElementById('edit-modal-save-bttn')
  saveBttn.setAttribute("data-id",dataId);

  


  edit_modal.showModal();
}

async function SaveEditModal(button) {
  const dataId = button.getAttribute("data-id");

  const saveBttn = document.getElementById('edit-save-modal-bttn')
  saveBttn.setAttribute("data-id",dataId);

  console.log(saveBttn.getAttribute("data-id"))

  confirm_save_modal.showModal()
  
  
}

async function ConfirmSaveBtn(button){
  const dataId = button.getAttribute("data-id");
  console.log(dataId)

  const taskTitle = document.getElementById("edit-modal-title");
  const taskAssignee = document.getElementById("edit-modal-assignee");
  const taskDueDate = document.getElementById("edit-modal-dueDate");
  const taskPriorityLevel = document.getElementById("edit-modal-priorityLevel");
  const taskDescription = document.getElementById("edit-modal-description");

 const data = await UpdateSpecificTask(dataId,taskTitle.value,taskDescription.value,taskAssignee.value,taskDueDate.value,taskPriorityLevel.value)

 confirm_save_modal.close()
 edit_modal.close()

 const modalId = `Task_modal_${dataId}`;
 const modalElement = document.getElementById(modalId);
 modalElement.close();
 succesfully_saved_modal.showModal()






}