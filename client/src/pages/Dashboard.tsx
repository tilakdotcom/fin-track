import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  // Line Chart Data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Income",
        data: [12000, 15000, 14000, 18000, 20000, 17000, 19000],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
      },
      {
        label: "Expenses",
        data: [10000, 13000, 12000, 15000, 18000, 16000, 17000],
        borderColor: "rgba(220, 38, 38, 1)",
        backgroundColor: "rgba(220, 38, 38, 0.1)",
        fill: true,
      },
    ],
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Gold", "Stock", "Warehouse", "Land"],
    datasets: [
      {
        data: [15700, 22500, 120000, 135000],
        backgroundColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(34, 197, 94, 0.5)",
          "rgba(34, 197, 94, 0.3)",
        ],
        hoverBackgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(34, 197, 94, 0.4)",
          "rgba(34, 197, 94, 0.2)",
        ],
      },
    ],
  };

  // Bar Chart Data
  const barData = {
    labels: ["E-commerce", "Google Ads", "My Shop", "Salary"],
    datasets: [
      {
        label: "Income Sources",
        data: [2100, 950, 8000, 13000],
        backgroundColor: "rgba(34, 197, 94, 1)",
      },
    ],
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Net Worth */}
        <div className="col-span-1 md:col-span-3 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-medium">Total Net Worth</h2>
          <p className="text-4xl font-bold text-green-400 mt-4">$278,378</p>
        </div>

        {/* Line Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Income & Expenses</h2>
          <Line data={lineData} />
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Income Sources</h2>
          <Bar data={barData} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Assets</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
