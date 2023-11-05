import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export default function TransactionChart({ transactions }) {
  const monthlyIncomes = {};
  const monthlyOutcomes = {};

  transactions.forEach((transaction) => {
    const createdDate = new Date(transaction.start_date);
    const monthKey = `${createdDate.getFullYear()}-${
      createdDate.getMonth() + 1
    }`;
    if (transaction.type_code === "expenses") {
      if (!monthlyOutcomes[monthKey]) {
        monthlyOutcomes[monthKey] = 0;
      }
      monthlyOutcomes[monthKey] += parseFloat(transaction.amount);
    } else {
      if (!monthlyIncomes[monthKey]) {
        monthlyIncomes[monthKey] = 0;
      }
      monthlyIncomes[monthKey] += parseFloat(transaction.amount);
    }
  });

  const allMonths = new Set([...Object.keys(monthlyIncomes), ...Object.keys(monthlyOutcomes)]);

  const sortedMonths = Array.from(allMonths).sort((a, b) => {
    const [yearA, monthA] = a.split("-");
    const [yearB, monthB] = b.split("-");
    return yearA - yearB || monthA - monthB;
  });

  const data = {
    labels: sortedMonths,
    datasets: [
      {
        label: 'Monthly Incomes',
        data: sortedMonths.map(month => monthlyIncomes[month] || 0),
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: 'Monthly Outcomes',
        data: sortedMonths.map(month => monthlyOutcomes[month] || 0),
        fill: true,
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  };
 
  console.log("income", monthlyIncomes, 'expenses', monthlyOutcomes);
  return <Chart type="bar" data={data} />;
}

