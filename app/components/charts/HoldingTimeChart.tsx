"use client";

import { HoldingTimeData } from "@/types";

export default function HoldingTimeChart({ data }: { data: HoldingTimeData[] }) {
  const sorted = [...data].sort((a, b) => a.holdingHours - b.holdingHours);
  const maxAbs = Math.max(...sorted.map(d => Math.abs(d.returnPct)));
  const barWidth = (pct: number) => Math.max(4, (Math.abs(pct) / maxAbs) * 100);

  return (
    <div className="card">
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
        <span className="text-cyan-400">&#9679;</span>
        Holding Time vs Return / 持仓时间 vs 收益
      </h2>
      <div className="space-y-1.5">
        {sorted.map(d => (
          <div key={d.symbol} className="flex items-center gap-2 text-[11px]">
            <span className="w-10 text-gray-400 font-medium shrink-0">{d.symbol}</span>
            <div className="flex-1 relative h-4 bg-gray-800/50 rounded-sm overflow-hidden">
              {d.returnPct >= 0 ? (
                <div
                  className="absolute left-1/2 top-0 h-full bg-red-500/60 rounded-sm flex items-center justify-end pr-1"
                  style={{ width: `${barWidth(d.returnPct)}%` }}
                >
                  <span className="text-[9px] text-white font-medium">+{d.returnPct}%</span>
                </div>
              ) : (
                <div
                  className="absolute right-1/2 top-0 h-full bg-green-500/60 rounded-sm flex items-center justify-start pl-1"
                  style={{ width: `${barWidth(d.returnPct)}%` }}
                >
                  <span className="text-[9px] text-white font-medium">{d.returnPct}%</span>
                </div>
              )}
              {/* Center line */}
              <div className="absolute left-1/2 top-0 h-full w-px bg-gray-600" />
            </div>
            <span className="w-16 text-right text-gray-500 shrink-0">{d.holdingHours}h</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-gray-600 text-center">
        <span className="text-red-400">Profit (Red) / 盈利</span> &nbsp;|&nbsp; <span className="text-green-400">Loss (Green) / 亏损</span> &nbsp;|&nbsp; Left = longer hold
      </div>
    </div>
  );
}
