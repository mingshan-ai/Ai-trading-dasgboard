"use client";

import { SentimentPnLData } from "@/types";

export default function SentimentScatter({ data }: { data: SentimentPnLData[] }) {
  const chartW = 380;
  const chartH = 200;
  const padX = 35;
  const padY = 25;

  const maxSent = 100;
  const minSent = 0;
  const maxPnl = Math.max(...data.map(d => d.pnl), 1);
  const minPnl = Math.min(...data.map(d => d.pnl), -1);

  const x = (sent: number) => padX + ((sent - minSent) / (maxSent - minSent)) * (chartW - padX - 10);
  const y = (pnl: number) => padY + ((maxPnl - pnl) / (maxPnl - minPnl)) * (chartH - padY - padY);

  return (
    <div className="card">
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
        <span className="text-purple-400">&#9673;</span>
        Sentiment vs P&L / 情绪 vs 收益
        <span className="text-[10px] text-gray-500 font-normal ml-1">Caution: High sentiment often = loss</span>
      </h2>
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-[400px]">
          {/* Axes */}
          <line x1={padX} y1={padY} x2={padX} y2={chartH - padY} stroke="#2d3548" strokeWidth={1} />
          <line x1={padX} y1={y(0)} x2={chartW - 10} y2={y(0)} stroke="#2d3548" strokeWidth={1} />

          {/* Zero line */}
          <line x1={padX} y1={y(0)} x2={chartW - 10} y2={y(0)} stroke="#3b4a63" strokeWidth={0.5} strokeDasharray="4,3" />

          {/* Labels */}
          <text x={padX - 5} y={padY - 5} fill="#7d8590" fontSize="8" textAnchor="end">P&L</text>
          <text x={(padX + chartW - 10) / 2} y={chartH - 5} fill="#7d8590" fontSize="8" textAnchor="middle">Sentiment</text>
          <text x={padX - 5} y={y(maxPnl) + 3} fill="#7d8590" fontSize="7" textAnchor="end">+{maxPnl / 1000}k</text>
          <text x={padX - 5} y={y(minPnl) + 3} fill="#7d8590" fontSize="7" textAnchor="end">{minPnl / 1000}k</text>
          <text x={padX} y={chartH - padY + 12} fill="#7d8590" fontSize="7" textAnchor="middle">0</text>
          <text x={chartW - 10} y={chartH - padY + 12} fill="#7d8590" fontSize="7" textAnchor="middle">100</text>

          {/* Danger zone (high sentiment) */}
          <rect x={x(80)} y={padY} width={chartW - 10 - x(80)} height={chartH - padY - padY} fill="rgba(239,68,68,0.05)" rx="2" />
          <text x={x(88)} y={padY + 12} fill="rgba(239,68,68,0.4)" fontSize="7">Danger Zone</text>

          {/* Sweet spot (low-mid sentiment) */}
          <rect x={x(30)} y={padY} width={x(70) - x(30)} height={chartH - padY - padY} fill="rgba(59,130,246,0.03)" rx="2" />
          <text x={x(50)} y={chartH - padY - 5} fill="rgba(59,130,246,0.3)" fontSize="7">Sweet Spot</text>

          {/* Data points */}
          {data.map((d, i) => {
            const cx = x(d.sentiment);
            const cy = y(d.pnl);
            const r = 3 + d.tradeCount * 0.5;
            const fill = d.pnl >= 0 ? "rgba(239,68,68,0.8)" : "rgba(34,197,94,0.8)";
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r} fill={fill} opacity={0.7} />
                <text x={cx + r + 2} y={cy + 3} fill="#7d8590" fontSize="7">{d.date}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 text-[10px] text-gray-600 text-center">
        Bubble size = trade count. High sentiment + overtrading = biggest losses
      </div>
    </div>
  );
}
