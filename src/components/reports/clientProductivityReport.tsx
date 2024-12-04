'use client';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ClientProductivityReport = ({ clientReports }: any) => {
    const clientNames = clientReports?.map((client: any) => client.clientName);
    const billingHours = clientReports?.map(
        (client: any) => client.billingHours
    );

    // Configure the Highcharts options
    const chartOptions = {
        chart: {
            type: 'bar',
             height:'700'
        },
        title: {
            text: 'Client Productivity Report',
        },
        xAxis: {
            categories: clientNames,
            title: {
                text: 'Clients',
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Hours',
                align: 'high',
            },
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
                pointWidth: 40,
            },
        },
        series: [
            {
                name: 'Billing Hours',
                data: billingHours,
                color: '#6f42c1', // Purple color
            },
        ],
        credits: {
            enabled: false // Disable credits
          },
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default ClientProductivityReport;
