'use client';

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

// Load the required modules
if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
}

// Define the type for props
interface SpeedometerProps {
  value: string;
}

const Speedometer: React.FC<SpeedometerProps> = ({ value }) => {
 
  const options: Highcharts.Options = {
    chart: {
       type: 'gauge',
      plotBackgroundColor: '#FFFFFF',
      // plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '60%'
    },
    title: {
      text: ''
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: undefined,
      center: ['50%', '75%'],
      size: '140%'
    },
    yAxis: {
      min: 0,
      max: 100,
      tickPixelInterval: 0,
      tickPosition: 'inside',
      tickColor: '#FFFFFF',
      tickLength: 40,
      tickWidth: 2,
      labels: {
        distance: 10, // Center labels on the gauge
        style: {
          fontSize: '14px'
        },
        formatter: function () {
          const value = Number(this.value); 
          // Hide the 0 and 100 labels by returning an empty string
        
          if (value === 0 || value === 100) {
            return '';
          }
         
         
          return '';  // Show the rest of the labels
        }
      },
      lineWidth: 0,
      plotBands: [{
        from: 0,
        to: 20,
        color: '#ff0000', // red
        thickness: 40,
        label: {
          text: 'Very Poor', // Label for the red range
          rotation:-75,
          style: {
           // color: '#ffffff',
            fontSize: '11px',
            fontWeight: 'bold',
          },
          x: 32, // Adjust the x-position of the label
          y: 35  // Adjust the y-position of the label
        }
      }, {
        from: 20,
        to: 40,
        color: '#ffa500', // orange
        thickness: 40,
        label: {
          text: 'Poor', // Label for the orange range
          rotation:-40,
          style: {
           // color: '#ffffff',
            fontSize: '11px',
            fontWeight: 'bold',
          },
          x: 65,
          y: 15
        }
      }, {
        from: 40,
        to: 60,
        color: '#ffff00', // yellow
        thickness: 40,
        label: {
          text: 'Fair', // Label for the yellow range
          rotation:0,
          style: {
           // color: '#000000',
            fontSize: '11px',
            fontWeight: 'bold',
          },
          x: 125,
          y: 5
        }
      }, {
        from: 60,
        to: 80,
        color: '#00b300', // light green
        thickness: 40,
        label: {
          text: 'Good', // Label for the green range
          rotation:40,
          style: {
           // color: '#ffffff',
            fontSize: '11px',
            fontWeight: 'bold',
          },
          x: -5,
          y: -3
        }
      }, {
        from: 80,
        to: 100,
        color: '#008000', // dark green
        thickness: 40,
        label: {
          text: 'Excellent', // Label for the dark green range
          rotation:75,
          style: {
          //  color: '#ffffff',
            fontSize: '11px',
            fontWeight: 'bold',
          },
          x: -2,
          y: -15
        }
      }]
    },
    series: [{
      type: 'gauge', // Added type property
      name: 'Productivity',
      data: [Number(value) || 0],
      tooltip: {
        valueSuffix: '%'
      },
      dataLabels: {
        format: 'Project Productivity: {y}% ',
        borderWidth: 0,
        color:'#333333',
        style: {
            fontSize: '16px'
        }
    },
      dial: {
        radius: '80%',
        backgroundColor: 'gray',
        baseWidth: 12,
        baseLength: '0%',
        rearLength: '0%'
      },
      pivot: {
        backgroundColor: 'gray',
        radius: 6
      }
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Speedometer;