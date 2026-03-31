export const colourOptions = {
  chart: {
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: { show: true },
  //comparedResult: [2, -3, 8],
  labels: ['Red', 'Yellow', 'Purple'],
  stroke: { width: 0 },
  colors: ['#DF5E5E', '#ECD662', '#9B72AA'],
  grid: {
    padding: {
      right: -20,
      bottom: -8,
      left: -20
    }
  },
  plotOptions: {
    pie: {
      //customScale: 0.2,
      startAngle: -10,
      donut: {
          size: '85%',
        labels: {
          show: true,
          name: {
            offsetY: 15
          },
          value: {
            offsetY: -15,
            formatter(val) {
              return `${parseInt(val)} %`
            }
          },
          total: {
            show: true,
            offsetY: 15,
            label: 'Colour',
            formatter(w) {
                //console.log(w)
              //return '100%' 
            }
          }
        }
      }
    }
  },
  responsive: [
    {
      breakpoint: 1325,
      options: {
        chart: {
          height: 100
        }
      }
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 120
        }
      }
    },
    {
      breakpoint: 1065,
      options: {
        chart: {
          height: 100
        }
      }
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 120
        }
      }
    }
  ]
}


export const PatternOptions = {
  chart: {
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: { show: true },
  //comparedResult: [2, -3, 8],
  labels: ['Stripes', 'Paisley', 'Herringbone', 'Checkered', 'Brocade'],
  stroke: { width: 0 },
  colors: ['#DF5E5E', '#ECD662', '#9B72AA', '#FF7600', '#0A1931', '#BEAEE2'],
  grid: {
    padding: {
      right: -20,
      bottom: -8,
      left: -20
    }
  },
  plotOptions: {
    pie: {
      startAngle: -10,
      donut: {
          size: '85%',
        labels: {
          show: true,
          name: {
            offsetY: 15
          },
          value: {
            offsetY: -15,
            formatter(val) {
              return `${parseInt(val)} %`
            }
          },
          total: {
            show: true,
            offsetY: 15,
            label: 'Pattern',
            formatter(w) {
                //console.log(w)
              //return '100%' 
            }
          }
        }
      }
    }
  },
  responsive: [
    {
      breakpoint: 1325,
      options: {
        chart: {
          height: 100
        }
      }
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 120
        }
      }
    },
    {
      breakpoint: 1065,
      options: {
        chart: {
          height: 100
        }
      }
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 120
        }
      }
    }
  ]
}


export const categoryOptions = {
  chart: {
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: { show: true },
  //comparedResult: [2, -3, 8],
  labels: ['Cotton', 'Wool', 'Jersey', 'Jacquard'],
  stroke: { width: 0 },
  colors: ['#F9CC7B', '#39A2DB', '#9B72AA', '#C84B31'],
  grid: {
    padding: {
      right: -20,
      bottom: -8,
      left: -20
    }
  },
  plotOptions: {
    pie: {
      startAngle: -10,
      donut: {
          size: '85%',
        labels: {
          show: true,
          name: {
            offsetY: 15
          },
          value: {
            offsetY: -15,
            formatter(val) {
              return `${parseInt(val)} %`
            }
          },
          total: {
            show: true,
            offsetY: 15,
            label: 'Category',
            formatter(w) {
                //console.log(w)
              //return '100%' 
            }
          }
        }
      }
    }
  },
  responsive: [
    {
      breakpoint: 1325,
      options: {
        chart: {
          height: 100
        }
      }
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 120
        }
      }
    },
    {
      breakpoint: 1065,
      options: {
        chart: {
          height: 100
        }
      }
    },
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 120
        }
      }
    }
  ]
}
