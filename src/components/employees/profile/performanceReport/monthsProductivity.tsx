'use client';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

const MonthsProductivity = ({ monthlyBilllingSummary }: any) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Prepare data for the last 12 months
    const months = [];
    const data = [];

    let cumulativeTotal = 0; // To keep track of the cumulative total

    // Get the current year and month from the system date
    const now = moment();
    const currentYear = now.year();
    const currentMonth = now.month() + 1;

    for (let i = 11; i >= 0; i--) {
      const date = moment().year(currentYear).month(currentMonth - 1).subtract(i, 'months');
      const year = date.year();
      const month = date.month() + 1; 
      const monthName = date.format('MMM'); 

      const summary = monthlyBilllingSummary?.find((entry: { year: any; month: any; }) => entry.year === year && entry.month === month);
      const totalBillingHours = summary ? summary.totalBillingHours : 0;

      cumulativeTotal = totalBillingHours > 0 ? totalBillingHours : cumulativeTotal;

      months.push(monthName);
      data.push(cumulativeTotal);
    }

    setChartOptions({
      chart: {
        type: 'spline',
        height: 400 
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: months 
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      tooltip: {
        valueSuffix: ' hours'
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: false,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.y:.1f} hours',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'y',
              value: 10
            }
          }]
        }
      },
      series: [
        {
          name: 'Total Billing Hours',
          color: '#6f42c1', // Purple color
          data: data
        }
      ],
      credits: {
        enabled: false // Disable credits
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
      }
    });
  }, [monthlyBilllingSummary]);

  return (
    <div>
      {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </div>
  );
};

export default MonthsProductivity;
