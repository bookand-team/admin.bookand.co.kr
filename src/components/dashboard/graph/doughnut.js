import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
};

const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

const data = {
  labels,
  datasets: [
    {
      label: '# of Votes',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
      backgroundColor: [
        'rgba(255, 99, 132, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(255, 206, 86, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(153, 102, 255, 0.3)',
        'rgba(255, 159, 64, 0.3)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const DummyDoughnut = () => {
  return (
    <Doughnut options={options} data={data} />
  );
};

export default DummyDoughnut;