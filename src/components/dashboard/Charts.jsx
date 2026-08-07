import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Tooltip, Legend, Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

export function EarningsChart() {
  const data = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [{
      label: "Earnings ($)",
      data: [420, 680, 540, 910, 780, 1120],
      borderColor: "#007BFF",
      backgroundColor: "rgba(0,123,255,0.12)",
      fill: true, tension: 0.35, pointRadius: 4, pointBackgroundColor: "#007BFF",
    }],
  };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6C757D", font: { size: 11 } } },
      y: { grid: { color: "#e6e8eb" }, ticks: { color: "#6C757D", font: { size: 11 } }, beginAtZero: true },
    },
  };
  return <div className="h-[200px] w-full sm:h-[220px]"><Line data={data} options={options} /></div>;
}

export function MixChart() {
  const data = {
    labels: ["Business", "Research", "Brand", "PR", "Other"],
    datasets: [{ data: [32, 24, 18, 16, 10], backgroundColor: ["#007BFF", "#0056b3", "#FFD700", "#6C757D", "#eaf3ff"], borderWidth: 0 }],
  };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 12, font: { size: 11 }, color: "#3a3f47" } } },
    cutout: "62%",
  };
  return <div className="mx-auto h-[200px] w-full max-w-[260px] sm:h-[220px]"><Doughnut data={data} options={options} /></div>;
}
