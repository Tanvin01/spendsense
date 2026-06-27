import { formatCurrency } from "../lib/utils";

interface Summary { income: number; expenses: number; balance: number; savingsRate: number; }

export default function SummaryCards({ summary }: { summary: Summary }) {
  const cards = [
    { label: "Total Income", value: summary.income, color: "text-green-400", bg: "border-green-500/20" },
    { label: "Total Expenses", value: summary.expenses, color: "text-red-400", bg: "border-red-500/20" },
    { label: "Net Balance", value: summary.balance, color: summary.balance >= 0 ? "text-green-400" : "text-red-400", bg: "border-slate-700" },
    { label: "Savings Rate", value: null, rate: summary.savingsRate, color: "text-blue-400", bg: "border-blue-500/20" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, rate, color, bg }) => (
        <div key={label} className={`bg-slate-900 border ${bg} rounded-xl p-5`}>
          <p className="text-slate-400 text-sm mb-1">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {value !== null ? formatCurrency(value) : `${Number(rate).toFixed(1)}%`}
          </p>
        </div>
      ))}
    </div>
  );
}
