'use client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

interface AreasplineChartProps {
  categories: string[];
  data: number[];
  title?: string;
  subtitle?: string;
  color?: string;
  fillColorStart?: string;
  fillColorEnd?: string;
  width?: string | number;
  height?: string | number;
}

const AreasplineChart: React.FC<AreasplineChartProps> = ({
  categories,
  data,
  color = 'transparent',
  fillColorStart = '#778FDF',
  fillColorEnd = 'transparent',
  width = '100%',
  height = '100%',
}) => {
  const options: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      type: 'areaspline',
      width: typeof width === 'number' ? width : undefined,
      height: typeof height === 'number' ? height : undefined,
      reflow: true,
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: categories,
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },
    series: [
      {
        type: 'areaspline',
        name: 'Data',
        color: color,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, fillColorStart],
            [1, fillColorEnd],
          ],
        },
        data: data.map((y) => ({ y, marker: { enabled: false } })),
        marker: {
          enabled: false,
          fillColor: fillColorStart,
        },
      },
    ],
    legend: { enabled: false },
    credits: {
      enabled: false,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.3,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AreasplineChart;
