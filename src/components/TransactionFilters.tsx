import { useState } from "react";
import { useTransactionStore } from "../store/transactionStore";
import { CATEGORIES } from "../lib/utils";
export default function TransactionFilters() {
  const { filters, setFilters, fetchTransactions } = useTransactionStore();
  const apply = (k: string, v: string) => { const f = {...filters,[k]:v||undefined}; setFilters(f); fetchTransactions(f); };
  return (
    <div className="flex flex-wrap gap-3">
      <input type="month" value={filters.month||""} onChange={e=>apply("month",e.target.value)}
        className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"/>
      <select value={filters.type||""} onChange={e=>apply("type",e.target.value)}
        className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500">
        <option value="">All types</option><option value="income">Income</option><option value="expense">Expense</option>
      </select>
      <select value={filters.category||""} onChange={e=>apply("category",e.target.value)}
        className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500">
        <option value="">All categories</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}
      </select>
    </div>
  );
}
