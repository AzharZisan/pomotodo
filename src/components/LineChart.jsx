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
import { Backpack } from "lucide-react";
import { callback } from "chart.js/helpers";

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
  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom,
    );
    gradient.addColorStop(0, "rgba(52, 78, 65, 0.7)");
    gradient.addColorStop(0.5, "rgba(52, 78, 65, 0.4)");
    gradient.addColorStop(1, "rgba(52, 78, 65, 0)");
    return gradient
  }
  let labels = ['A', 'B']
  let dataValues = [20, 50]
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        fill: true,
        borderColor: "rgb(52, 78, 65)",
        tension: 0,
        label: "",
        pointBackgroundColor: "rgb(52, 78, 65)",
        backgroundColor: (context) => {
          const chart = context.chart
          const {ctx,  chartArea} = chart
          if(!chartArea) return 'tranparent'
          return getGradient(ctx, chartArea)
        },
        borderRadius :0.5
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
          label: (ctx) => `${ctx.parsed.y} s`,
        },
        displayColors: false,
        bodyAlign: "center",
      },
    },
    scales: {
      y: {
        display: false,
        ticks: {
          display: false,
        },
      },
      x: {
        // display: false,
        grid: {
          display: false,
          color: "#588157",
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };
  return <Line data={data} ref={chartRef} options={options} />;
};

export default LineChart;
