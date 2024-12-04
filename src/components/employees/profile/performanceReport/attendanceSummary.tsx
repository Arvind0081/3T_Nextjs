'use client';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AttendanceSummary = ({ attendanceSummary }: any) => {
 
  const options = {
    chart: {
      type: 'pie',
      height: 400 // Adjust the height as needed
    },
    title: {
      text: ''
    },
    tooltip: {
      valueSuffix: '%'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: ['#6f42c1', '#90ee90', '#ffa500'], // Purple, light green, orange
        dataLabels: {
          enabled: false,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        },
        showInLegend: true
      }
     
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: [
          {
            name: 'Present',
            y: attendanceSummary?.presentPercentage
          },
          {
            name: 'Leave',
            y: attendanceSummary?.leavePercentage
          },
        
          {
            name: 'Absent',
            y: attendanceSummary?.absentPercentage
          }
        ]
      }
    ],
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      y: 0 // Adjusts vertical position
    },
    credits: {
      enabled: false // Disable credits
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AttendanceSummary;