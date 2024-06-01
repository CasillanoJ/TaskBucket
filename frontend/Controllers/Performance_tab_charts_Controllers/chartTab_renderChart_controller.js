const Renderchart = async ()=>{

  const startDate = document.getElementById('performance-startDate').value;
  const endDate = document.getElementById('performance-endDate').value;
const data = await GetAllUsersTotalProgression(startDate,endDate);
document.getElementById('total-task-count').innerHTML = data.data.totalTask

document.getElementById('hs-doughnut-chart').innerHTML =''

if(data.data.totalTask == 0 || data.data.totalTask =="0"){
  document.getElementById('hs-doughnut-chart').innerHTML ='<h1>No task Created Yet</h1> '
  return
}
  await createDoughnutChart(
    `#hs-doughnut-chart`,
    [data.data.totalUnassigned, data.data.totalTodo, data.data.totalCompleted, data.data.totalLateTask],
    ['Unassigned','To do', 'In progress', 'Completed', 'Late tasks'],
    ['#3b82f6','#22d3ee', '#FA59A0', '#6CC000', '#FF433E'],
    ['#000000','#000000', '#000000', '#000000', '#000000']
);


}