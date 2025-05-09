import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ categoryData }) => {
  const labels = Object.keys(categoryData);
  const values = Object.values(categoryData);

  const data = {
    labels,
    datasets: [
      {
        label: "Question Categories",
        data: values,
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
          "#20c997",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="card p-3 mb-4">
      <h5>📊 Category Distribution</h5>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;
