import { faker } from '@faker-js/faker';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import React from 'react';
import { Chart } from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const options = {
  plugins: {
    legend: {
      position: 'top'
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
};

const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 }))
    },
    {
      type: 'line',
      label: 'Dataset 2',
      borderColor: 'rgb(99, 255, 170)',
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 }))
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 }))
    },
    {
      type: 'bar',
      label: 'Dataset 4',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 }))
    }
  ]
};

const DummyComplex = () => {
  return (
    <Chart type='bar' options={options} data={data} />
  );
};

export default DummyComplex;