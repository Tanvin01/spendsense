import { formatCurrency, formatDate } from "../lib/utils";
import { useTransactionStore } from "../store/transactionStore";
import type { Transaction } from "../store/transactionStore";

interface Props { transactions: Transaction[]; }

export default function TransactionList({ transactions }: Props) {
  const { deleteTransaction } = useTransactionStore();
  if (!transactions.length) return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center text-slate-500">
      No transactions found.
    </div>
  );
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700 font-semibold text-white">Recent Transactions</div>
      <div className="divide-y divide-slate-800">
        {transactions.map((tx) => (
          <div key={tx._id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-800/40 group">
            <div>
              <p className="text-white text-sm font-medium">{tx.description}</p>
              <p className="text-slate-500 text-xs">{tx.category} · {formatDate(tx.date)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${tx.type === "income" ? "text-green-400" : "text-red-400"}`}>
                {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
              </span>
              <button onClick={() => deleteTransaction(tx._id)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 text-xs transition-opacity">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
