import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  BarElement,
  LineElement,
  Legend,
  Title,
  LinearScale,
  Tooltip,
  Filler,
  PointElement,
  plugins,
  scales,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Title,
  LinearScale,
  Tooltip,
  Filler,
)

const LineChart = () => {
  const chartRef = useRef(null)
  const data = {
    labels: ["a", "b", "c", "d", "e", "f", "g"],
    datasets: [
      {
        data: [56, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: "rgb(52, 78, 65)",
        tension: 0,
        label: "",
        pointBackgroundColor: 'rgb(52, 78, 65)',
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales : {
      y: {
        display: false,
        ticks: {
          display: false
        }
      },
      x: {
        grid : {
          display: false
        },
        ticks: {
          display: false
        }
      }
    }
  }
  return <Line data={data} ref={chartRef} options={options} />;
};

export default LineChart;
