'use client';
import worldMapData from '@highcharts/map-collection/custom/world.geo.json';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import React, { memo } from 'react';

if (typeof Highcharts === 'object') {
  HighchartsMap(Highcharts);
}

interface MapChartProps {
  title?: string;
  data: Highcharts.SeriesMapDataOptions[];
  visibleCountries: string[];
}

const MapChart: React.FC<MapChartProps> = ({
  title = '',
  data,
  visibleCountries,
}) => {
  // Filter the map data to include only the specified countries
  const filteredMapData = worldMapData.features.filter((country: any) =>
    visibleCountries.includes(country.id),
  );

  const options: Highcharts.Options = {
    chart: {
      map: {
        backgroundColor: '#BEC9ED', // Set background color for the map
        type: 'FeatureCollection',
        features: filteredMapData, // Use only filtered countries
      },
      width: null,
      height: null,
    },
    title: {
      text: title,
    },
    mapNavigation: {
      enabled: false, // Disable map navigation (zoom, pan)
      enableDoubleClickZoom: false, // Disable double-click zoom
    },
    series: [
      {
        type: 'map',
        name: 'Countries',
        data,
        joinBy: ['iso-a2', 'code'], // Matches country code with data (iso-a2 is the standard code)
        states: {
          hover: {
            enabled: false, // Disable hover effects
          },
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}',
        },
        allowPointSelect: false, // Disable point selection
        color: '#BEC9ED', // Set all countries to the desired color
      },
    ],
    tooltip: {
      enabled: false, // Disable tooltips
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            title: {
              style: {
                fontSize: '12px',
              },
            },
            legend: {
              enabled: false,
            },
          },
        },
      ],
    },
    credits: {
      enabled: false,
    },
    legend: { enabled: false },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={'mapChart'}
    />
  );
};

export default memo(MapChart);
