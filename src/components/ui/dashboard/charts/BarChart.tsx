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
  const getColorForBar = (index: number): string => {
    const colors = ['#364EA2'];
    return colors[index % colors.length];
  };

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
        },
        colorByPoint: true,
      },
    },
    series: seriesData.map((data) => ({
      ...data,
      data: (data.data || []).map((point: any): any => {
        if (typeof point === 'number') {
          return { y: point, color: getColorForBar(point) };
        } else if (Array.isArray(point) && typeof point[1] === 'number') {
          return { y: point[1], color: getColorForBar(point[1]) };
        } else if (typeof point === 'object' && point !== null) {
          return { ...point, color: getColorForBar((point as any).y) };
        }
        return point; // Fallback case
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
