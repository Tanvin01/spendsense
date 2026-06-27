import { useState } from "react";
import { useTransactionStore } from "../store/transactionStore";
import { CATEGORIES } from "../lib/utils";
import toast from "react-hot-toast";
interface Props { onClose: () => void; }
export default function AddTransactionModal({ onClose }: Props) {
  const { createTransaction } = useTransactionStore();
  const [form, setForm] = useState({ type:"expense",amount:"",category:"Food & Dining",description:"",date:new Date().toISOString().slice(0,10),currency:"USD" });
  const [loading,setLoading] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({...f,[k]:v}));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try { await createTransaction({...form,amount:parseFloat(form.amount),date:new Date(form.date),recurring:"none"}); toast.success("Transaction added"); onClose(); }
    catch { toast.error("Failed to add transaction"); }
    finally { setLoading(false); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-white mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            {["income","expense"].map(t => (
              <button key={t} type="button" onClick={() => set("type",t)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${form.type===t ? (t==="income"?"bg-green-600 text-white":"bg-red-600 text-white") : "bg-slate-800 text-slate-400"}`}>{t}</button>
            ))}
          </div>
          <input type="number" placeholder="Amount" value={form.amount} onChange={e=>set("amount",e.target.value)} required min="0" step="0.01"
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"/>
          <select value={form.category} onChange={e=>set("category",e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500">
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
          <input type="text" placeholder="Description" value={form.description} onChange={e=>set("description",e.target.value)} required
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"/>
          <input type="date" value={form.date} onChange={e=>set("date",e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"/>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white rounded-xl text-sm font-medium">{loading?"Adding...":"Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
