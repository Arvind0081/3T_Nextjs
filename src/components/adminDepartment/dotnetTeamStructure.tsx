'use client';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DotnetTeamStructure = ({ departmentWiseOverallDetails }: any) => {
  if (!departmentWiseOverallDetails || departmentWiseOverallDetails.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className='row'>
      {departmentWiseOverallDetails.map((departmentData: any) => {
        // Summary details
        const workInHand = departmentData.workInHand;
        const pendingPayment = departmentData.pendingPayment;
        const totalEmployeeCount = departmentData.totalEmployeeCount;

        // Define experience ranges
        const experienceRanges = {
          'Below 0': 0,
          '0-2': 0,
          '2-4': 0,
          '4-6': 0,
          '6-8': 0,
          '8-10': 0,
          '10+': 0
        };

        // Categorize employee experience into ranges
        departmentData.employeeDetails?.forEach((employee: any) => {
          const experience = employee.experienceOnJoining;

          if (experience < 0) experienceRanges['Below 0']++;
          else if (experience <= 2) experienceRanges['0-2']++;
          else if (experience <= 4) experienceRanges['2-4']++;
          else if (experience <= 6) experienceRanges['4-6']++;
          else if (experience <= 8) experienceRanges['6-8']++;
          else if (experience <= 10) experienceRanges['8-10']++;
          else experienceRanges['10+']++;
        });

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
              data: Object.entries(experienceRanges).map(([range, count]: any) => ({
                name: `${range} Years`,
                y: count
              }))
            }
          ],
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
                format: '{point.name}: {point.y}'
              },
              center: ['50%', '50%'],
              size: '100%',
              innerSize: '50%',
              states: {
                hover: {
                  enabled: false
                }
              },
              showInLegend: true
            },

        
          },
          subtitle: {
            text: `Total Employees: ${totalEmployeeCount}`,
            align: 'center',
            verticalAlign: 'middle',
            y: -25, // Adjust this value for vertical positioning
            style: {
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#333',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            },
          },
        
        
          credits: {
            enabled: false // Disable credits
          },
        };

        return (
          <div className='col-xl-4 col-lg-6 col-md-12' key={departmentData.departmentId}>
            <div className='card custom-card'>
              <div className='card-header justify-content-between'>
                <div className='card-title'>{departmentData.departmentName} Team Structure</div>
              </div>
              <div className='card-body'>
                <div className='d-flex justify-content-center gap-x-2 mb-3 flex-wrap graph_btns'>
                  <button type='button' className='btn btn-default btn-wave'>
                    <i className='ri-time-line me-2 align-middle'></i>
                    Work in Hand: {workInHand} Hrs
                  </button>
                  <button type='button' className='btn btn-default btn-wave'>
                    <i className='ri-time-line me-2 align-middle'></i>
                    Pending Payment: {pendingPayment} Hrs
                  </button>
                </div>
                <div className='department-Performance'>
                  <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DotnetTeamStructure;
