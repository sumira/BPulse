import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: number[];
  timestamps: string[];
}

const TemperatureChart: React.FC<ChartProps> = ({ data, timestamps }) => {
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data,
        borderColor: "#ff6b6b",
        backgroundColor: "rgba(255, 107, 107, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TemperatureChart;
