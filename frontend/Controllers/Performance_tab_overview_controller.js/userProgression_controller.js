const UserProgression = async()=>{
  const isAdmin = GetCookie("isAdmin")


if(!isAdmin){
    return
}
document.getElementById('total-task-created').innerHTML = '';
document.getElementById('total-task-duedate').innerHTML = '';
document.getElementById('total-task-completed-count').innerHTML = '';
 
document.getElementById('progression-modal-container').innerHTML =  ''
let containerCount = 0;
let userCounter = 0;

const mainContainer = document.getElementById('progress-content');
mainContainer.innerHTML = ''; 


function addCardContainer() {
    const cardContainer = UserProgressionContainer(containerCount);
    mainContainer.innerHTML += cardContainer;
}

addCardContainer(); 

const startDate = document.getElementById('performance-startDate');
const endDate = document.getElementById('performance-endDate');

const getTotalProgression = await GetAllUsersTotalProgression(startDate.value,endDate.value)
document.getElementById('total-task-created').innerHTML = getTotalProgression.data.totalTask;
document.getElementById('total-task-duedate').innerHTML = getTotalProgression.data.totalTaskwithDueDate;
document.getElementById('total-task-completed-count').innerHTML = getTotalProgression.data.totalCompleted;



const userList = await getUsers(0,0);
for (const user of userList.data) {
    const data = await GetEachUserProgression(user._id, startDate.value, endDate.value);
    const userProgressionCard = UserProgressionCard(user._id, user.first_name, user.last_name, data.data);

    if (userCounter > 0 && userCounter % 4 === 0) {
        containerCount++;
        addCardContainer(); 
    }

    const currentContainer = document.getElementById(`performance-tab-${containerCount}`);
    if (currentContainer) {
        currentContainer.innerHTML += userProgressionCard;
    }

    document.getElementById('progression-modal-container').innerHTML += await ProgressionModal(user._id,user.first_name,user.last_name,data.data);

    const totalTodo = parseInt(data.data.totalToDo);
    const totalInProgress = parseInt(data.data.totalInprogress);
    const totalCompleted = parseInt(data.data.completedCount);
    const totalLate = parseInt(data.data.totalLateTask);

    await createDoughnutChart(
        `#user-chart-${user._id}`,
        [totalTodo, totalInProgress, totalCompleted, totalLate],
        ['To do', 'In progress', 'Completed', 'Late tasks'],
        ['#22d3ee', '#FA59A0', '#6CC000', '#FF433E'],
        ['#000000', '#000000', '#000000', '#000000']
    );

    userCounter++;


  }




  
}