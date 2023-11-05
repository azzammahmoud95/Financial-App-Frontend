import { Box } from "@mui/system";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
// const data = [
//   {
//     id: "1",
//     balance: "40",
//     start_date: "2022-01-02",
//   },
//   {
//     id: "2",
//     balance: "20",
//     start_date: "2022-02-02",
//   },
//   {
//     id: "3",
//     balance: "60",
//     start_date: "2022-03-02",
//   },
//   {
//     id: "4",
//     balance: "90",
//     start_date: "2022-04-02",
//   },
//   {
//     id: "5",
//     balance: "30",
//     start_date: "2022-05-02",
//   },
// ];

// const chartData = data.map((e) => ({
//   x: new Date(e.start_date),
//   y: e.balance,
// }));

// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// };

const BalanceChart = ({transactions}) => {
  
  const monthlyBalances = {};

transactions.forEach((transaction) => {
  const createdDate = new Date(transaction.start_date);
  const monthKey = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;

  if (!monthlyBalances[monthKey]) {
    monthlyBalances[monthKey] = 0;
  }

  if (transaction.type_code === 'expenses') {
    monthlyBalances[monthKey] -= parseFloat(transaction.amount);
  } else {
    monthlyBalances[monthKey] += parseFloat(transaction.amount);
  }
});

console.log(monthlyBalances);
const data = {
  labels: Object.keys(monthlyBalances),
  datasets: [
    {
      label: 'Monthly Balance',
      data: Object.values(monthlyBalances),
      fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box>
      <Line data={data} options={options} />
    </Box>
  );
};

export default BalanceChart;
