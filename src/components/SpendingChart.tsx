import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CATEGORY_COLORS } from "../lib/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: Array<{ category: string; amount: number }>;
}

export default function SpendingChart({ data }: Props) {
  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.map((d) => d.amount),
        backgroundColor: data.map(
          (d, i) => CATEGORY_COLORS[d.category] ?? `hsl(${i * 36}, 70%, 55%)`
        ),
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "#94a3b8", padding: 12, font: { size: 11 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` $${ctx.raw.toLocaleString()}`,
        },
      },
    },
  };

  if (data.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 flex items-center justify-center h-64">
        <p className="text-slate-500 text-sm">No expense data this month</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
      <h3 className="text-white font-semibold mb-4">Spending by Category</h3>
      <div className="flex justify-center">
        <div className="w-56 h-56">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
