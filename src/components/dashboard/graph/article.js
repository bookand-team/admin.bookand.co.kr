import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

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
        display: true,
        text: 'Month'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Value'
      },
      min: 0,
      max: 100,
      ticks: {
        // forces step size to be 50 units
        stepSize: 15
      }
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: '아티클',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

const Article = () => {
  return (
    <Bar options={options} data={data} />
  );
};

export default Article;