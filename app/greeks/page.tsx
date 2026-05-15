"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { greeksData } from "@/data/market";

const COLORS = {
  delta: "#3b82f6",
  gamma: "#06b6d4",
  theta: "#ef4444",
  vega: "#a855f7",
  iv: "#f59e0b",
  hv: "#22c55e",
};

function formatGreek(value: number): string {
  if (Math.abs(value) >= 100) return value.toFixed(0);
  if (Math.abs(value) >= 1) return value.toFixed(2);
  return value.toFixed(4);
}

export default function GreeksPage() {
  const [selected, setSelected] = useState(0);
  const current = greeksData[selected];

  const barData = [
    { name: "Delta", value: current.delta * 100, fill: COLORS.delta, label: "Delta", unit: "" },
    { name: "Gamma", value: current.gamma * 10000, fill: COLORS.gamma, label: "Gamma", unit: "" },
    { name: "Theta", value: Math.abs(current.theta) * 100, fill: COLORS.theta, label: "Theta", unit: "(abs)" },
    { name: "Vega", value: current.vega * 10, fill: COLORS.vega, label: "Vega", unit: "" },
  ];

  const ivData = greeksData.map((g) => ({
    name: g.symbol,
    iv: g.iv,
    hv: g.historicalVol,
  }));

  const radarData = [
    { metric: "Delta", value: current.delta * 100, fullMark: 100 },
    { metric: "Gamma", value: Math.min(current.gamma * 10000, 100), fullMark: 100 },
    { metric: "Theta", value: Math.min(Math.abs(current.theta) * 50, 100), fullMark: 100 },
    { metric: "Vega", value: Math.min(current.vega * 20, 100), fullMark: 100 },
    { metric: "IV", value: current.iv, fullMark: 100 },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Greeks Dashboard / 希腊值面板</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time options risk metrics</p>
      </div>

      {/* Symbol selector */}
      <div className="flex flex-wrap gap-2">
        {greeksData.map((g, i) => (
          <button
            key={g.symbol}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selected === i
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-gray-500 border border-transparent hover:bg-white/10"
            }`}
          >
            {g.symbol}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Current Greeks Card */}
        <div className="card lg:col-span-1">
          <h2 className="text-sm font-semibold mb-4">
            {current.symbol} Greeks
          </h2>
          <div className="space-y-3">
            <GreekRow label="Delta (Δ)" value={formatGreek(current.delta)} color="text-blue-400" desc="方向敏感度" />
            <GreekRow label="Gamma (Γ)" value={formatGreek(current.gamma)} color="text-cyan-400" desc="Delta变化率" />
            <GreekRow label="Theta (Θ)" value={formatGreek(current.theta)} color="text-red-400" desc="时间衰减" />
            <GreekRow label="Vega (ν)" value={formatGreek(current.vega)} color="text-purple-400" desc="波动率敏感度" />
            <GreekRow label="Rho (ρ)" value={formatGreek(current.rho)} color="text-gray-400" desc="利率敏感度" />
            <div className="border-t border-[#1e1e2e] pt-3 mt-3">
              <GreekRow label="IV" value={`${current.iv.toFixed(1)}%`} color="text-amber-400" desc="隐含波动率" />
              <GreekRow label="HV" value={`${current.historicalVol.toFixed(1)}%`} color="text-green-400" desc="历史波动率" />
              <div className="mt-2 text-xs text-gray-500">
                IV/HV Ratio: {(current.iv / current.historicalVol).toFixed(2)}
                {current.iv > current.historicalVol * 1.1 && " - IV偏高，期权昂贵"}
                {current.iv < current.historicalVol * 0.9 && " - IV偏低，适合买期权"}
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card lg:col-span-1">
          <h2 className="text-sm font-semibold mb-4">
            {current.symbol} Greeks Visualization
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#666" }} />
              <YAxis tick={{ fontSize: 10, fill: "#666" }} />
              <Tooltip
                contentStyle={{ background: "#1a1a28", border: "1px solid #2a2a3e", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#888" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <rect key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="card lg:col-span-1">
          <h2 className="text-sm font-semibold mb-4">
            {current.symbol} Risk Profile
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e1e2e" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#888" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: "#555" }} />
              <Radar name={current.symbol} dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* IV vs HV comparison across all symbols */}
      <div className="card">
        <h2 className="text-sm font-semibold mb-4">IV vs Historical Volatility / 隐含 vs 历史波动率</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ivData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#666" }} />
            <YAxis tick={{ fontSize: 10, fill: "#666" }} unit="%" />
            <Tooltip
              contentStyle={{ background: "#1a1a28", border: "1px solid #2a2a3e", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#888" }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="iv" name="IV" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            <Bar dataKey="hv" name="HV" fill="#22c55e" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function GreekRow({ label, value, color, desc }: { label: string; value: string; color: string; desc: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-[10px] text-gray-600">{desc}</div>
      </div>
      <div className={`text-base font-bold ${color}`}>{value}</div>
    </div>
  );
}
