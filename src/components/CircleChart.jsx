import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const CircleChart = () => {
    const data = {
      labels: ["A"],
      datasets: [
        {
          data: [65],
          backgroundColor: ["rgba(88, 129, 87, 0.5)"],
          borderWidth: 1,
          borderColor: ["rgba(88, 129, 87)"],
          label: "",
        },
      ],
    }
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };

  return <Doughnut data={data} options={options}/>;
};

export default CircleChart;
