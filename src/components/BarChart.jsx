import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = () => {
  const data = {
    labels: ["A", "B", "C", "D", "E", "F", "G"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ["rgba(88, 129, 87, 0.5)"],
        borderWidth: 1,
        borderRadius: 10,
        borderColor: ["rgba(88, 129, 87)"],
        label: "",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
        border: {
          display: true,
          color: "#588157", // 👈 your color here
        },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} className="py-2 pr-1" />;
};

export default BarChart;
