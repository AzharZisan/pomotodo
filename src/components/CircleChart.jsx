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
  scales,
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
const CircleChart = ({CirLabels, CirDataValues}) => {
    const data = {
      labels: CirLabels,
      datasets: [
        {
          data: CirDataValues,
          backgroundColor: ["rgba(88, 129, 87, 0.5)"],
          borderWidth: 1,
          borderColor: ["rgba(88, 129, 87)"],
          label: "",
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgb(52, 78, 65)",
          titleColor: "#dad7cd",
          titleAlign: "center",
          padding: 10,
          callbacks: {
            label: () => null,
          },
          displayColors: false,
          bodyAlign: "center",
        },
      },
    };

  return <Doughnut data={data} options={options}/>;
};

export default CircleChart;
