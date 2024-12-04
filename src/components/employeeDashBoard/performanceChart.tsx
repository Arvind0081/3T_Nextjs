import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PerformanceChart = ({ dashboardList }: any) => {

  const attendenceList = dashboardList?.attendanceList || [];

  let cumulativeBillingHours = 0;
  const billingHoursSeries = attendenceList.map((item: { day: number; billingHours: any; }) => {
    cumulativeBillingHours += item.billingHours;
    return {
      x: item.day - 1,
      y: cumulativeBillingHours,
    };
  });

  let cumulativeMonthlyPotentialHours = 0;
  const monthlyPotentialHoursSeries = attendenceList.map((item: { monthlyPotentialHours: number; day: number; }) => {
    cumulativeMonthlyPotentialHours += item.monthlyPotentialHours;
    return {
      x: item.day - 1,
      y: cumulativeMonthlyPotentialHours,
    };
  });

  const allDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const options = {
    title: {
      text: '',
    },
    xAxis: {
      title: {
        text: 'Days',
      },
      categories: allDays.map(day => day.toString()),
      tickmarkPlacement: 'on',
    },
    yAxis: {
      title: {
        text: 'Hours',
      },
    },
    series: [
      {
        name: 'Hours/days: Your Productivity',
        data: billingHoursSeries,
        type: 'spline',
      },
      {
        name: 'Total Expected Productivity',
        data: monthlyPotentialHoursSeries,
        type: 'spline',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PerformanceChart;
