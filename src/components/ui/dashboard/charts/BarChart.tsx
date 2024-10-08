'use client';
import Highcharts, { SeriesColumnOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

interface BarChartProps {
  title?: string;
  categories: string[];
  seriesData: SeriesColumnOptions[];
}

const BarChart: React.FC<BarChartProps> = ({
  title = '',
  categories,
  seriesData,
}) => {
  const colors = ['#4466D9', '#364EA2', '#778FDF'];

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
        align: 'high',
      },
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#364EA2',
          },
        },
        colorByPoint: true,
      },
    },
    series: seriesData.map((data) => ({
      ...data,
      data: (data.data || []).map((point: any, index: number): any => {
        if (typeof point === 'number') {
          return { y: point, color: colors[index] };
        }
      }),
    })),
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            xAxis: {
              labels: {
                style: {
                  fontSize: '10px',
                },
              },
            },
            yAxis: {
              labels: {
                style: {
                  fontSize: '10px',
                },
              },
            },
          },
        },
      ],
    },
    legend: { enabled: false },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
