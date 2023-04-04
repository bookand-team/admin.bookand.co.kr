import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'doughnut'> = {
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: false
    }
  },
  responsive: true
};

const backgroundColor = [
  'rgba(255, 99, 132, 0.4)',
  'rgba(54, 162, 235, 0.4)',
  'rgba(255, 206, 86, 0.4)',
  'rgba(75, 192, 192, 0.4)',
  'rgba(153, 102, 255, 0.4)',
  'rgba(255, 159, 64, 0.4)'
];

const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

const borderWidth = 1;

type PropsType = {
  labels: string[];
  values: number[];
};

const DoughtnutChart = ({ labels, values }: PropsType) => {
  const data: ChartData<'doughnut'> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor,
        borderColor,
        borderWidth
      }
    ]
  };
  return (
    <Doughnut options={options} data={data} />
  );
};

export default DoughtnutChart;