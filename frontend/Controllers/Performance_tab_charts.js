window.addEventListener('load', () => {
    // Apex Doughnut Chart
    (function () {
      buildChart('#hs-doughnut-chart', (mode) => ({
        chart: {
          height: 380,
          width: 460,
          type: 'donut',
          zoom: {
            enabled: false
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '55%'
            }
          }
        },
        series: [20, 20, 20, 20, 20],
        labels: ['Unassgined', 'To do', 'In progress', 'Completed', 'Late tasks'],
         legend: {
                show: false,
                markers: {
                    fillColors: ['#3b82f6', '#22d3ee', '#FA59A0', '#FF433E', '#6CC000']
                },
                labels: {
                    colors: ['#000000', '#000000', '#000000', '#000000', '#000000'] // Specify text color of legend labels here
                }
            },
        dataLabels: {
          enabled: true,
          style: {
              fontSize: '50px' 
          },
          formatter: function (val) {
              return val + "%"
          },
          
      },
        stroke: {
          width: 0
        },
        grid: {
          padding: {
            top: -12,
            bottom: -11,
            left: -12,
            right: -12
          }
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          }
        },
        tooltip: {
          enabled: true,
          custom: function (props) {
            return buildTooltipForDonut(
              props,
              mode === 'dark' ? ['#000000', '#000000', '#000000', '#000000'] : ['#000000', '#000000',
                '#000000', '#000000', '#000000'
              ]
            );
          },
          style:{
           
          }
        }
      }), {
        colors: ['#3b82f6', '#22d3ee', '#FA59A0', '#FF433E', '#6CC000'],
        stroke: {
          colors: ['rgb(255, 255, 255)']
        }
      }, {
        colors: ['#3b82f6', '#22d3ee', '#FA59A0', '#FF433E', '#6CC000'],
        stroke: {
          colors: ['rgb(255, 255, 255)']
        }
      });
    })();
  });