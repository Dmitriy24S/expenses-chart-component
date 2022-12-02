const ctx = document.getElementById('myChart')

function generateChart() {
  fetch('./data.json').then((res) =>
    res.json().then((chartData) => {
      //   console.log({ chartData })
      //[
      //   {
      // "day": "mon",
      // "amount": 17.45
      //   },
      //  etc...

      const data = {
        labels: chartData.map((item) => item.day),
        datasets: [
          {
            data: chartData.map((item) => item.amount),
            backgroundColor: 'hsl(10, 79%, 65%)',
            hoverBackgroundColor: chartData.map((item) => 'hsl(10, 79%, 72%)'),
            borderRadius: 3
          }
        ]
      }
      // console.log({ data })
      // {data: {…}}
      // data:
      // datasets: Array(1)
      // 0:
      // backgroundColor: "hsl(10, 79%, 65%)"
      // borderWidth: 1
      // data: (7) [17.45, 34.91, 52.36, 31.07, 23.39, 43.28, 25.48, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
      // labels: Array(7)
      // 0: "mon"
      // 1: "tue"
      // etc...

      const options = {
        onClick: (event, elements, chart) => {
          // var element = this.getElementAtEvent(event)
          console.log(elements[0], 'elements') // {element: BarElement, datasetIndex: 0, index: 6}
          console.log(chart, 'chart')

          if (elements.length) {
            const dataset = chart.data.datasets[0]
            dataset.backgroundColor = []
            // const ticks = chart.options.scales.x.ticks
            console.log(dataset, 'dataset')
            // const i = elements[0].index
            for (let i = 0; i < dataset.data.length; i++) {
              if (elements[0].index == i) {
                dataset.backgroundColor[i] = 'hsl(186, 34%, 60%)'
                dataset.hoverBackgroundColor[i] = 'hsl(186, 34%, 68%)'
              } else {
                dataset.backgroundColor[i] = 'hsl(10, 79%, 65%)'
                dataset.hoverBackgroundColor[i] = 'hsl(10, 79%, 72%)'
              }
            }
            chart.update()
          }
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
            suggestedMax: 70
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            caretSize: 0,
            xAlign: 'center',
            yAlign: 'bottom',
            caretPadding: 5,
            displayColors: false,
            backgroundColor: () => 'hsl(25, 47%, 15%)',
            titleColor: function (context) {
              // ?
              //   return 'red'
              //   return 'hsl(33, 100%, 98%)'
            },
            labelColor: (context) => {
              // ?
              //   return 'red'
              //   return 'hsl(33, 100%, 98%)'
            },
            callbacks: {
              labelTextColor: function (context) {
                // give cream color to bar hover tooltip text
                return 'hsl(33, 100%, 98%)'
              },
              title: (context, value) => {
                //   hides mon tue ... on bar hover tooltip
                return ''
              }
            }
          }
        }
      }

      let barChart = new Chart(ctx, {
        type: 'bar',
        data,
        options
      })
    })
  )
}

generateChart()
