const UserProgression = async()=>{
  const isAdmin = GetCookie("isAdmin")




  if(isAdmin){
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

const userList = await getUsers();
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




  
}