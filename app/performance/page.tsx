"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { performanceMetrics, performanceHistory } from "@/data/market";
import { TrendingUp, Target, Activity, Award, TrendingDown, BarChart3 } from "lucide-react";

export default function PerformancePage() {
  const monthlyReturn = performanceHistory.map((m) => ({
    month: m.month,
    return: m.return,
    trades: m.trades,
    winRate: m.winRate,
  }));

  const cumulativeReturn = monthlyReturn.reduce((acc, m) => {
    const prev = acc.length > 0 ? acc[acc.length - 1].cumulative : 0;
    acc.push({ month: m.month, cumulative: prev + m.return });
    return acc;
  }, [] as { month: string; cumulative: number }[]);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Performance / 绩效分析</h1>
        <p className="text-sm text-gray-500 mt-1">YTD 2026 &middot; Target: 85% Win Rate / 60% Annual Return</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Total P&L"
          value={`$${performanceMetrics.totalPnL.toLocaleString()}`}
          color="text-red-400"
          bg="bg-red-500/10"
        />
        <MetricCard
          icon={<Target className="w-5 h-5" />}
          label="Win Rate"
          value={`${performanceMetrics.winRate}%`}
          subLabel={`${performanceMetrics.totalTrades} trades`}
          color="text-blue-400"
          bg="bg-blue-500/10"
        />
        <MetricCard
          icon={<Activity className="w-5 h-5" />}
          label="Avg Return"
          value={`${performanceMetrics.avgReturn}%`}
          color="text-green-400"
          bg="bg-green-500/10"
        />
        <MetricCard
          icon={<TrendingDown className="w-5 h-5" />}
          label="Max Drawdown"
          value={`${performanceMetrics.maxDrawdown}%`}
          color="text-red-400"
          bg="bg-red-500/10"
        />
        <MetricCard
          icon={<Award className="w-5 h-5" />}
          label="Sharpe Ratio"
          value={performanceMetrics.sharpeRatio.toFixed(2)}
          color="text-purple-400"
          bg="bg-purple-500/10"
        />
        <MetricCard
          icon={<BarChart3 className="w-5 h-5" />}
          label="Annual Return"
          value={`${performanceMetrics.annualizedReturn}%`}
          color="text-amber-400"
          bg="bg-amber-500/10"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cumulative Return */}
        <div className="card">
          <h2 className="text-sm font-semibold mb-4">Cumulative Return / 累计收益曲线</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={cumulativeReturn} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="cumulativeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#666" }} />
              <YAxis tick={{ fontSize: 10, fill: "#666" }} unit="%" />
              <Tooltip
                contentStyle={{ background: "#1a1a28", border: "1px solid #2a2a3e", borderRadius: 8, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="cumulative" stroke="#ef4444" fill="url(#cumulativeGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Returns */}
        <div className="card">
          <h2 className="text-sm font-semibold mb-4">Monthly Returns / 月度收益</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyReturn} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#666" }} />
              <YAxis tick={{ fontSize: 10, fill: "#666" }} unit="%" />
              <Tooltip
                contentStyle={{ background: "#1a1a28", border: "1px solid #2a2a3e", borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="return" name="Return %" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Win Rate Trend */}
      <div className="card">
        <h2 className="text-sm font-semibold mb-4">Win Rate Trend / 胜率趋势</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyReturn} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#666" }} />
              <YAxis tick={{ fontSize: 10, fill: "#666" }} domain={[75, 95]} unit="%" />
              <Tooltip
                contentStyle={{ background: "#1a1a28", border: "1px solid #2a2a3e", borderRadius: 8, fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="winRate" name="Win Rate" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
              <Line type="monotone" dataKey="return" name="Return %" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex flex-col justify-center space-y-3">
            <h3 className="text-sm font-semibold text-gray-400">Monthly Breakdown / 月度明细</h3>
            {performanceHistory.map((m) => (
              <div key={m.month} className="flex items-center justify-between p-2 bg-white/[0.02] rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white w-10">{m.month}</span>
                  <span className="text-xs text-gray-500">{m.trades} trades</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-medium ${m.return > 4 ? "text-red-400" : "text-gray-400"}`}>
                    {m.return > 0 ? "+" : ""}{m.return}%
                  </span>
                  <span className={`text-xs ${m.winRate >= 85 ? "text-green-400" : "text-amber-400"}`}>
                    {m.winRate}% WR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals Tracker */}
      <div className="card">
        <h2 className="text-sm font-semibold mb-4">Goals Tracker / 目标跟踪</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GoalBar label="Win Rate Target" current={performanceMetrics.winRate} target={85} unit="%" color="#3b82f6" />
          <GoalBar label="Annual Return Target" current={performanceMetrics.annualizedReturn} target={60} unit="%" color="#22c55e" />
          <GoalBar label="Sharpe Ratio Target" current={performanceMetrics.sharpeRatio} target={2.0} unit="" color="#a855f7" />
          <GoalBar label="Max Drawdown Limit" current={Math.abs(performanceMetrics.maxDrawdown)} target={10} unit="%" color="#ef4444" invert />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  subLabel,
  color,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subLabel?: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="card">
      <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center ${color} mb-3`}>
        {icon}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      {subLabel && <div className="text-[10px] text-gray-600 mt-1">{subLabel}</div>}
    </div>
  );
}

function GoalBar({
  label,
  current,
  target,
  unit,
  color,
  invert = false,
}: {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  invert?: boolean;
}) {
  const pct = Math.min((current / target) * 100, 150);
  const met = invert ? current <= target : current >= target;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="text-white">{current}{unit} / {target}{unit}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
        />
      </div>
      <div className={`text-[10px] mt-1 ${met ? "text-green-400" : "text-amber-400"}`}>
        {met ? "Target Met" : `${(100 - pct).toFixed(0)}% to target`}
      </div>
    </div>
  );
}
