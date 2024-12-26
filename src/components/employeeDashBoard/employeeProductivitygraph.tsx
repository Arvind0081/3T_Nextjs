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
  value: any;
}

const SixMonthProductivity: React.FC<SpeedometerProps> = ({ value }) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'gauge',
      plotBackgroundColor: '#FFFFFF',
      plotBorderWidth: 0,
      plotShadow: false,
      height: '30%',
    },
    title: {
      text: '',
    },
    pane: {
      startAngle: -90,
      endAngle: 90,
      background: undefined,
      center: ['50%', '75%'],
      size: '140%',
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
        distance: 10,
        style: {
          fontSize: '14px',
        },
        formatter: function () {
          const value = Number(this.value);
          // Hide the 0 and 100 labels
          if (value === 0 || value === 100) {
            return '';
          }
          return '';
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to: 20,
          color: '#ff0000',
          thickness: 40,
          label: {
            text: 'Very Poor',
            align: 'center',
            style: {
              fontSize: '11px',
              fontWeight: 'bold',
            },
            x: 100,
            y: 45,
          },
        },
        {
          from: 20,
          to: 40,
          color: '#ffa500',
          thickness: 40,
          label: {
            text: 'Poor',
            align: 'center',
            style: {
              fontSize: '11px',
              fontWeight: 'bold',
            },
            x: 160,
            y: 0,
          },
        },
        {
          from: 40,
          to: 60,
          color: '#ffff00',
          thickness: 40,
          label: {
            text: 'Fair',
            align: 'center',
            style: {
              fontSize: '11px',
              fontWeight: 'bold',
            },
            x: 250,
            y: 0,
          },
        },
        {
          from: 60,
          to: 80,
          color: '#00b300',
          thickness: 40,
          label: {
            text: 'Good',
            align: 'center',
            style: {
              fontSize: '11px',
              fontWeight: 'bold',
            },
            x: -130,
            y: 20,
          },
        },
        {
          from: 80,
          to: 100,
          color: '#008000',
          thickness: 40,
          label: {
            text: 'Excellent',
            align: 'center',
            style: {
              fontSize: '11px',
              fontWeight: 'bold',
            },
            x: -98,
            y: 40,
          },
        },
      ],
    },
    series: [
      {
        type: 'gauge',
        name: 'Productivity',
        data: [Number(value) || 0],
        tooltip: {
          valueSuffix: '%',
        },
        dataLabels: {
          format: 'Project Productivity: {y}% ',
          borderWidth: 0,
          color: '#333333',
          style: {
            fontSize: '16px',
          },
        },
        dial: {
          radius: '80%',
          backgroundColor: 'gray',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%',
        },
        pivot: {
          backgroundColor: 'gray',
          radius: 6,
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SixMonthProductivity;
