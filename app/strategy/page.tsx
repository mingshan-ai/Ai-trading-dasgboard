"use client";

import { strategyRecommendations } from "@/data/market";
import { TrendingUp, AlertTriangle, Eye, Pause, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

const actionConfig = {
  BUY_CALL: { label: "BUY CALL", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", icon: ArrowUpRight },
  BUY_PUT: { label: "BUY PUT", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: ArrowDownRight },
  SELL_CALL: { label: "SELL CALL", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: ArrowDownRight },
  SELL_PUT: { label: "SELL PUT", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", icon: ArrowUpRight },
  HOLD: { label: "HOLD", color: "text-gray-400", bg: "bg-gray-500/10 border-gray-500/20", icon: Pause },
  WATCH: { label: "WATCH", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: Eye },
};

export default function StrategyPage() {
  const buyCalls = strategyRecommendations.filter((r) => r.action === "BUY_CALL");
  const watchList = strategyRecommendations.filter((r) => r.action === "WATCH" || r.action === "HOLD");

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Strategy / AI策略推荐</h1>
        <p className="text-sm text-gray-500 mt-1">Week of May 12-16, 2026 &middot; AI后半段疯狂阶段</p>
      </div>

      {/* Key Strategy Rules */}
      <div className="card bg-amber-500/5 border-amber-500/10">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-amber-400">本周核心策略 / Core Strategy</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-black/20 rounded-lg p-3">
            <div className="text-amber-300 font-medium">回踩买</div>
            <div className="text-gray-500 mt-1">不追高，等回踩关键支撑再进Call</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <div className="text-amber-300 font-medium">快止盈</div>
            <div className="text-gray-500 mt-1">达到目标价立即分批减仓</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <div className="text-amber-300 font-medium">分批减仓</div>
            <div className="text-gray-500 mt-1">不赌翻倍，保住利润优先</div>
          </div>
        </div>
      </div>

      {/* Active Buy Recommendations */}
      <div>
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          Active Calls / 推荐买入Call
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {buyCalls.map((rec) => {
            const config = actionConfig[rec.action];
            const Icon = config.icon;
            return (
              <div key={rec.symbol} className="card border-green-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{rec.symbol}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${config.bg} ${config.color} flex items-center gap-1`}>
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">{rec.confidence}%</div>
                    <div className="text-[10px] text-gray-600">confidence</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center">
                    <div className="text-[10px] text-gray-600">Entry</div>
                    <div className="text-sm font-medium text-white">${rec.entryPrice}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center">
                    <div className="text-[10px] text-gray-600">Target</div>
                    <div className="text-sm font-medium text-green-400">${rec.targetPrice}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center">
                    <div className="text-[10px] text-gray-600">Stop</div>
                    <div className="text-sm font-medium text-red-400">${rec.stopLoss}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-500">Risk/Reward</span>
                  <span className="font-medium text-blue-400">{rec.riskReward}x</span>
                </div>

                <div className="text-xs text-gray-500 leading-relaxed">
                  {rec.reason}
                </div>

                <div className="mt-3 text-[10px] text-gray-600">
                  Timeframe: {rec.timeframe}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Watch List */}
      <div>
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-400" />
          Watch List / 观察名单
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {watchList.map((rec) => {
            const config = actionConfig[rec.action];
            const Icon = config.icon;
            return (
              <div key={rec.symbol} className="card border-amber-500/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{rec.symbol}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${config.bg} ${config.color} flex items-center gap-1`}>
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-amber-400">{rec.confidence}%</div>
                    <div className="text-[10px] text-gray-600">confidence</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center">
                    <div className="text-[10px] text-gray-600">Entry</div>
                    <div className="text-sm font-medium text-white">${rec.entryPrice}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center">
                    <div className="text-[10px] text-gray-600">Target</div>
                    <div className="text-sm font-medium text-gray-400">${rec.targetPrice}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2 text-center">
                    <div className="text-[10px] text-gray-600">Stop</div>
                    <div className="text-sm font-medium text-red-400">${rec.stopLoss}</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 leading-relaxed">
                  {rec.reason}
                </div>
                <div className="mt-3 text-[10px] text-gray-600">
                  Timeframe: {rec.timeframe}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Put Watch Signals */}
      <div className="card">
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <ArrowDownRight className="w-4 h-4 text-red-400" />
          Put Signals / Put观察信号
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
            <span className="font-bold text-red-400">AMD</span>
            <div className="text-gray-400">跌破 $450 + NVDA同步转弱 = Put可能单日翻倍</div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
            <span className="font-bold text-red-400">TSLA</span>
            <div className="text-gray-400">跌破 $435 = Put会非常猛，波动极大</div>
          </div>
        </div>
      </div>
    </div>
  );
}
