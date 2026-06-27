import { useEffect, useMemo } from "react";
import { useTransactionStore } from "../store/transactionStore";
import SummaryCards from "./SummaryCards";
import SpendingChart from "./SpendingChart";
import MonthlyTrendChart from "./MonthlyTrendChart";
import RecentTransactions from "./RecentTransactions";
import BudgetProgress from "./BudgetProgress";
import { getCurrentMonth } from "../lib/utils";

export default function Dashboard() {
  const { transactions, fetchTransactions, loading } = useTransactionStore();

  useEffect(() => {
    fetchTransactions({ month: getCurrentMonth() });
  }, []);

  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
    return { income, expenses, balance, savingsRate };
  }, [transactions]);

  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
      });
    return Array.from(map.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} />
      <div className="grid lg:grid-cols-2 gap-6">
        <SpendingChart data={categoryBreakdown} />
        <MonthlyTrendChart />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={transactions.slice(0, 10)} />
        </div>
        <BudgetProgress categoryBreakdown={categoryBreakdown} />
      </div>
    </div>
  );
}
