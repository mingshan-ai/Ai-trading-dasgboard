"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Activity,
  Brain,
  Target,
  FileText,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, labelCn: "仪表盘" },
  { href: "/stocks", label: "Watchlist", icon: TrendingUp, labelCn: "行情" },
  { href: "/options", label: "Options", icon: BarChart3, labelCn: "期权链" },
  { href: "/greeks", label: "Greeks", icon: Activity, labelCn: "希腊值" },
  { href: "/strategy", label: "Strategy", icon: Brain, labelCn: "AI策略" },
  { href: "/review", label: "Review", icon: FileText, labelCn: "复盘" },
  { href: "/performance", label: "Performance", icon: Target, labelCn: "绩效" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 lg:w-56 bg-[#0d0d14] border-r border-[#1e1e2e] flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-3 lg:p-4 border-b border-[#1e1e2e]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-bold text-white">Mingshan</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">AI Trading</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 lg:p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group
                ${isActive
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-blue-400" : "text-gray-600 group-hover:text-gray-400"}`} />
              <div className="hidden lg:block">
                <div>{item.label}</div>
                <div className="text-[10px] text-gray-600">{item.labelCn}</div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Live indicator */}
      <div className="p-3 lg:p-4 border-t border-[#1e1e2e]">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500 pulse-live" />
          <span className="hidden lg:inline">Market Closed</span>
        </div>
        <div className="hidden lg:block text-[10px] text-gray-600 mt-1">
          Next open: Mon 9:30 ET
        </div>
      </div>
    </aside>
  );
}
