import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { TrendingUp, LogOut, User } from "lucide-react";
export default function Navbar() {
  const { user, logout } = useAuthStore(); const navigate = useNavigate();
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-white"><TrendingUp className="w-5 h-5 text-emerald-400"/>SpendSense</Link>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{user?.name}</span>
          <button onClick={() => { logout(); navigate("/login"); }} className="text-slate-400 hover:text-white"><LogOut className="w-4 h-4"/></button>
        </div>
      </div>
    </nav>
  );
}
