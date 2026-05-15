"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
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
  LogOut,
  User,
  ChevronDown,
  Crown,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", labelCn: "仪表盘", icon: LayoutDashboard },
  { href: "/stocks", label: "Watchlist", labelCn: "行情", icon: TrendingUp },
  { href: "/options", label: "Options", labelCn: "期权链", icon: BarChart3 },
  { href: "/greeks", label: "Greeks", labelCn: "希腊值", icon: Activity },
  { href: "/strategy", label: "Strategy", labelCn: "AI策略", icon: Brain },
  { href: "/review", label: "Review", labelCn: "复盘", icon: FileText },
  { href: "/performance", label: "Performance", labelCn: "绩效", icon: Target },
  { href: "/errors", label: "Error Radar", labelCn: "错误识别", icon: AlertTriangle },
];

const planLabels: Record<string, string> = {
  FREE: "Free",
  BASIC: "Basic",
  PRO: "Pro",
};

const planColors: Record<string, string> = {
  FREE: "text-gray-500",
  BASIC: "text-blue-400",
  PRO: "text-purple-400",
};

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const userPlan = (session?.user?.plan as string) || "FREE";
  const isAdmin = session?.user?.isAdmin || false;

  return (
    <aside className={`${collapsed ? 'w-14' : 'w-14 lg:w-56'} bg-[var(--bg-sidebar)] border-r border-[var(--border-primary)] flex flex-col shrink-0 transition-all duration-200`}>
      {/* Logo */}
      <div className="p-2.5 lg:p-3 border-b border-[var(--border-primary)]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
            <Zap className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-bold text-[var(--text-primary)]">Mingshan</div>
            <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
              Capital
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-1.5 lg:p-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-150 group relative
                ${isActive
                  ? "bg-[var(--accent-blue-bg)] text-[var(--accent-blue)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03]"
                }`}
            >
              <Icon
                className={`w-4.5 h-4.5 shrink-0 ${
                  isActive
                    ? "text-[var(--accent-blue)]"
                    : "text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]"
                }`}
              />
              <div className="hidden lg:block">
                <span className="text-[13px]">{item.label}</span>
              </div>
              {item.href === "/errors" && (
                <span className="hidden lg:flex w-2 h-2 rounded-full bg-amber-500 ml-auto" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-[var(--border-primary)]">
        {/* Plan badge - only show for logged-in users */}
        <div className="px-2.5 lg:px-3 pt-2">
          {session?.user && userPlan !== "PRO" && (
            <Link
              href="/pricing"
              className="hidden lg:flex items-center gap-1.5 text-[11px] text-[var(--text-tertiary)] hover:text-[var(--accent-blue)] transition-colors py-1"
            >
              <Crown className="w-3 h-3" />
              <span>Upgrade to {userPlan === "FREE" ? "Basic" : "Pro"}</span>
            </Link>
          )}
        </div>

        {/* User menu */}
        {session?.user ? (
          <div className="p-2 lg:p-3 relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 w-full text-left hover:bg-white/[0.03] rounded-md p-1.5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="hidden lg:block flex-1 min-w-0">
                <div className="text-[13px] text-[var(--text-primary)] truncate">
                  {session.user.name || "User"}
                </div>
                <div className={`text-[10px] ${planColors[userPlan]}`}>
                  {planLabels[userPlan]} Plan
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] hidden lg:block" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute bottom-full left-1 lg:left-2 right-1 lg:right-2 mb-1 bg-[var(--bg-sidebar)] border border-[var(--border-primary)] rounded-lg shadow-xl z-50 overflow-hidden">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition-colors border-t border-[var(--border-primary)]"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Crown className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-red-400 hover:text-red-300 hover:bg-white/[0.03] transition-colors w-full border-t border-[var(--border-primary)]"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="p-2.5 lg:p-3">
            <Link
              href="/login"
              className="block w-full text-center text-[13px] text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 rounded-md py-1.5 hover:bg-[var(--accent-blue-bg)] transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Live indicator */}
      <div className="px-2.5 lg:px-3 py-2 border-t border-[var(--border-primary)]">
        <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-live" />
          <span className="hidden lg:inline">Market Closed</span>
        </div>
      </div>
    </aside>
  );
}
