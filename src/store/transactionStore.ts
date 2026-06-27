import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "../lib/api";

export interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  recurring?: "daily" | "weekly" | "monthly" | null;
  currency: string;
  createdAt: string;
}

export interface TransactionFilters {
  month?: string; // "YYYY-MM"
  category?: string;
  type?: "income" | "expense";
  search?: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  filters: TransactionFilters;
  total: number;
  fetchTransactions: (filters?: TransactionFilters) => Promise<void>;
  createTransaction: (data: Omit<Transaction, "_id" | "createdAt">) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  setFilters: (filters: TransactionFilters) => void;
}

export const useTransactionStore = create<TransactionState>()(
  devtools(
    (set, get) => ({
      transactions: [],
      loading: false,
      error: null,
      filters: {},
      total: 0,

      fetchTransactions: async (filters) => {
        set({ loading: true, error: null });
        try {
          const params = filters ?? get().filters;
          const { data } = await api.get("/transactions", { params });
          set({ transactions: data.transactions, total: data.total, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      createTransaction: async (txData) => {
        const { data } = await api.post("/transactions", txData);
        set((s) => ({ transactions: [data, ...s.transactions], total: s.total + 1 }));
      },

      updateTransaction: async (id, txData) => {
        const { data } = await api.put(`/transactions/${id}`, txData);
        set((s) => ({
          transactions: s.transactions.map((t) => (t._id === id ? data : t)),
        }));
      },

      deleteTransaction: async (id) => {
        await api.delete(`/transactions/${id}`);
        set((s) => ({
          transactions: s.transactions.filter((t) => t._id !== id),
          total: s.total - 1,
        }));
      },

      setFilters: (filters) => set({ filters }),
    }),
    { name: "TransactionStore" }
  )
);
