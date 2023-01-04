import { faker } from '@faker-js/faker';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options: ChartOptions<'line'> = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false
  },
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Line Chart - Multi Axis'
    }
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left'
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false
      }
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data: ChartData<'line'> = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y'
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1'
    }
  ]
};

const DummyMultiaxis = () => {
  return (
    <Line options={options} data={data} />
  );
};

export default DummyMultiaxis;