import { useEffect } from "react";
import { useTransactionStore } from "../store/transactionStore";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
export default function DashboardPage() {
  const { fetchTransactions } = useTransactionStore();
  useEffect(() => { fetchTransactions(); }, []);
  return (<div className="min-h-screen bg-slate-950"><Navbar /><main className="container mx-auto px-4 py-6"><Dashboard /></main></div>);
}
