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
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
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
        text: 'Values',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: seriesData,
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
      enabled: false, // Disable tooltip
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
