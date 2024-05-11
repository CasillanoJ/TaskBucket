window.addEventListener('load', () => {
    // Apex Doughnut Chart
    (function () {
      buildChart('#hs-doughnut-chart', (mode) => ({
        chart: {
          height: 350,
          width: 450,
          type: 'donut',
          zoom: {
            enabled: false
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '76%'
            }
          }
        },
        series: [20, 20, 20, 20, 20],
        labels: ['Unassgined', 'To do', 'In progress', 'Completed', 'Late tasks'],
        legend: {
          show: false
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
          width: 5
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
          }
        }
      }), {
        colors: ['#3b82f6', '#22d3ee', '#e5e7eb', '#FF433E', '#FF433E'],
        stroke: {
          colors: ['rgb(255, 255, 255)']
        }
      }, {
        colors: ['#3b82f6', '#22d3ee', '#e5e7eb', '#FF433E', '#FF433E'],
        stroke: {
          colors: ['rgb(255, 255, 255)']
        }
      });
    })();
  });