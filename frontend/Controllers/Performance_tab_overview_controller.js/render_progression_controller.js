const RenderProgressionTab = () => {
  const endDate = document.getElementById('performance-endDate');

  const executeUserProgression = () => {
    UserProgression();
  };

  endDate.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      executeUserProgression();
    }
  });

};

document.addEventListener("DOMContentLoaded", async function() {
  RenderProgressionTab()
  UserProgression();
 
}); 