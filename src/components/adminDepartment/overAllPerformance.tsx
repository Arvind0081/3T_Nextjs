'use client';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const OverAllPerformance = ({ allDepartmentproductivity }: any) => {
    // Extract data from the response
    const departments = allDepartmentproductivity?.map((item:any) => item.departmentName);
    const requiredProductivity = allDepartmentproductivity?.map((item:any) => item.requiredProductivity);
    const currentProductivity = allDepartmentproductivity?.map((item:any)=> item.currentProductivity);

    // Configure the Highcharts options
    const chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: departments,
            title: {
                text: ''
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                },
                pointWidth: 40
            }
        },
        credits: {
            enabled: false // Disable credits
          },
        series: [
            {
                name: 'Required Productivity',
                data: requiredProductivity
            },
            {
                name: 'Current Productivity',
                data: currentProductivity
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default OverAllPerformance;
