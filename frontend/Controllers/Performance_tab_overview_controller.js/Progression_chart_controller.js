async function createDoughnutChart(selector, seriesData, labels, colors, darkModeColors) {
  buildChart(selector, (mode) => ({
    chart: {
      height: 400, 
      width: 400, 
      type: 'donut',
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%' 
        }
      }
    },
    series: seriesData,
    labels: labels,
    legend: {
      show: true,
      markers: {
        fillColors: colors
      },
      labels: {
        colors: darkModeColors
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '16px'
      },
      formatter: function (val) {
        return Math.round(val) + "%";
      }
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
          mode === 'dark' ? darkModeColors : colors
        );
      }
    }
  }), {
    colors: colors,
    stroke: {
      colors: ['rgb(255, 255, 255)']
    }
  }, {
    colors: colors,
    stroke: {
      colors: ['rgb(255, 255, 255)']
    }
  });
}
