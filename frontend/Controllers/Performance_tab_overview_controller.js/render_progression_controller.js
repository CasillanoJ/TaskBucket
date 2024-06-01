const RenderProgressionTab = () => {
  const endDate = document.getElementById('performance-endDate');
  const startDate = document.getElementById('performance-startDate')


  endDate.addEventListener('input', async function() {

      await UserProgression()
    
  });

};

document.addEventListener("DOMContentLoaded", async function() {
  document.getElementById('performance-chart').addEventListener('click',function () {
    window.location.href = "Performance_tab_charts.html"
    })
  
    document.getElementById('performance-overview').addEventListener('click',function () {
      window.location.href = "Performance_tab_overview.html"
      })
  RenderProgressionTab()
  UserProgression();
 
}); 