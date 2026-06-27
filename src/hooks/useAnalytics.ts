import { useState, useEffect } from "react";
import api from "../lib/api";
export function useAnalytics(month?: string) {
  const [summary, setSummary] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      api.get("/analytics/summary", { params: { month } }),
      api.get("/analytics/trends"),
    ]).then(([s, t]) => { setSummary(s.data); setTrends(t.data); }).finally(() => setLoading(false));
  }, [month]);
  return { summary, trends, loading };
}
