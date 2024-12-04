'use client';

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ProjectBillingHistoryChart = ({ projectBillingHistory }: any) => {
 
  const transformedData = projectBillingHistory?.map((item: { date: string, billingHours: number }) => [
    new Date(item.date).getTime(),  // Convert date to timestamp
    item.billingHours                    // Billing amount
  ]);

  // Highcharts options
  const options = {
    chart: {
      type: 'line',
      zooming: { type: 'x' },
      panning: true,
      panKey: 'shift',
      scrollablePlotArea: { minWidth: 600 }
    },
    title: {
      text: '',
      align: 'left'
    },
    xAxis: {
      type: 'datetime', // Use datetime for x-axis
      title: { text: 'Date' },
      labels: {
        format: '{value:%b %d, %Y}', // Format the date (e.g., Jan 01, 2024)
      },
    },
    yAxis: {
      title: { text: 'Billing Hours' },
      labels: {
        format: '{value} ', // You can adjust the formatting to your needs
      }
    },
    tooltip: {
      headerFormat: 'Date: {point.x:%b %d, %Y}<br>', // Format the date in tooltip
      pointFormat: 'Billing Hours: {point.y}',
      shared: true
    },
    legend: { enabled: false },
    credits: { enabled: false },
    series: [
      {
        data: transformedData,
        name: 'Billing Amount',
        lineColor: '#9966ff',
        color: '#4400cc',
        fillOpacity: 0.5,
        marker: { enabled: false },
        threshold: null
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ProjectBillingHistoryChart;
