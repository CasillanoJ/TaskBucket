const GetDataBasedOnDate = async () => {
  const endDateElement = document.getElementById('performance-endDate');
  const startDateElement = document.getElementById('performance-startDate');

  const handleDateInput = async () => {
    const endDate = endDateElement.value;
    const startDate = startDateElement.value;

    if (startDate && endDate) {
      UserProgressions(0, 7);
      await Renderchart();
    }
  };

  endDateElement.addEventListener('input', handleDateInput);
  startDateElement.addEventListener('input', handleDateInput);
};


document.addEventListener('DOMContentLoaded',async function () {
  document.getElementById('performance-chart').addEventListener('click',function () {
    window.location.href = "Performance_tab_charts.html"
    })
  
    document.getElementById('performance-overview').addEventListener('click',function () {
      window.location.href = "Performance_tab_overview.html"
      })
 await UserProgressions(0,7)
  await Renderchart()
  GetDataBasedOnDate()
})