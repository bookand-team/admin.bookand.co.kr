import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: 'Month'
      }
    },
    y: {
      title: {
        display: false,
        text: 'Value'
      },
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20
      }
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const DummyBar = () => {
  return (
    <Bar options={options} data={data} />
  );
};

export default DummyBar;