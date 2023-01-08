import { faker } from '@faker-js/faker';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend , ChartData, ChartOptions } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<'bar'> = {
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart - Stacked'
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data: ChartData<'bar'> = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgb(255, 99, 132)'
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgb(75, 192, 192)'
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgb(53, 162, 235)'
    }
  ]
};

const DummyStackBar = () => {
  return (
    <Bar options={options} data={data} />
  );
};

export default DummyStackBar;
