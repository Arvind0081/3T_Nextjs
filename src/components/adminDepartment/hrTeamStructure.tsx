'use client'
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HrTeamStructure = ({ departmentWiseOverallDetails }: any) => {
  // Extract data for the 'Dot Net' department
  const departmentData = departmentWiseOverallDetails.find(
    (dept: any) => dept.departmentName === 'Blazor'
  );

  if (!departmentData) {
    return <div>No data available</div>;
  }

  // Summary details
  const workInHand = departmentData.workInHand;
  const pendingPayment = departmentData.pendingPayment;
  const totalEmployeeCount = departmentData.totalEmployeeCount;

  // Prepare data for the pie chart
  const experienceCounts = departmentData.employeeDetails.reduce((acc: any, employee: any) => {
    const experience = employee.experienceOnJoining;
    acc[experience] = (acc[experience] || 0) + 1;
    return acc;
  }, {});

  const pieChartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    series: [
      {
        name: 'Employees',
        data: Object.entries(experienceCounts).map(([experience, count]: any) => ({
          name: `Experience ${experience} Years`,
          y: count
        }))
      }
    ],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}'
        },
        center: ['50%', '50%'],
        size: '100%',
        innerSize: '50%',
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    subtitle: {
      text: `Total : ${totalEmployeeCount}`,
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    credits: {
      enabled: false // Disable credits
    },
  };

  return (
    <div className='card-body'>
      <div className='d-flex justify-content-center gap-x-2 mb-3 flex-wrap graph_btns'>
        <button type='button' className='btn btn-default btn-wave'>
          <i className='ri-time-line me-2 align-middle'></i>
          Work in Hand : {workInHand} Hrs
        </button>
        <button type='button' className='btn btn-default btn-wave'>
          <i className='ri-time-line me-2 align-middle'></i>
          Pending Payment : {pendingPayment} Hrs
        </button>
      </div>
      <div className='department-Performance'>
        <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default HrTeamStructure;
