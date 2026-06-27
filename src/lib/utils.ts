export const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

export const formatCurrency = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const CATEGORIES = [
  "Food & Dining","Transportation","Shopping","Entertainment","Bills & Utilities",
  "Healthcare","Education","Travel","Personal Care","Housing","Investments","Salary","Freelance","Other"
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "#f97316","Transportation": "#3b82f6","Shopping": "#a855f7",
  "Entertainment": "#ec4899","Bills & Utilities": "#ef4444","Healthcare": "#10b981",
  "Education": "#06b6d4","Travel": "#f59e0b","Salary": "#22c55e","Freelance": "#84cc16",
};
