"use client";

import { useState } from "react";
import { strategyRecommendations } from "@/data/market";
import { TrendingUp, AlertTriangle, Eye, Pause, ArrowUpRight, ArrowDownRight, Minus, CalendarDays } from "lucide-react";

const actionConfig = {
  BUY_CALL: { label: "BUY CALL", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", icon: ArrowUpRight },
  BUY_PUT: { label: "BUY PUT", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: ArrowDownRight },
  SELL_CALL: { label: "SELL CALL", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: ArrowDownRight },
  SELL_PUT: { label: "SELL PUT", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", icon: ArrowUpRight },
  HOLD: { label: "HOLD", color: "text-gray-400", bg: "bg-gray-500/10 border-gray-500/20", icon: Pause },
  WATCH: { label: "WATCH", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: Eye },
};

export default function StrategyPage() {
  const [activeTab, setActiveTab] = useState<"today" | "nextweek">("today");

  const todayRecs = strategyRecommendations.filter((r) => r.timeframe.includes("5/15") || r.timeframe.includes("Intraday"));
  const nextWeekRecs = strategyRecommendations.filter((r) => r.timeframe.includes("5/19") || r.timeframe.includes("Weekly"));
  const watchList = strategyRecommendations.filter((r) => r.action === "WATCH" || r.action === "HOLD");

  const renderStrategyCard = (rec: typeof strategyRecommendations[0]) => {
    const config = actionConfig[rec.action];
    const Icon = config.icon;
    const isPut = rec.action === "BUY_PUT";
    return (
      <div key={`${rec.symbol}-${rec.timeframe}`} className={`card ${isPut ? "border-red-500/10" : "border-green-500/10"}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">{rec.symbol}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${config.bg} ${config.color} flex items-center gap-1`}>
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${isPut ? "text-red-400" : "text-green-400"}`}>{rec.confidence}%</div>
            <div className="text-[10px] text-gray-600">confidence</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white/[0.03] rounded-lg p-2 text-center">
            <div className="text-[10px] text-gray-600">{isPut ? "Entry Put" : "Entry Call"}</div>
            <div className="text-sm font-medium text-white">${rec.entryPrice}</div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-2 text-center">
            <div className="text-[10px] text-gray-600">Target</div>
            <div className={`text-sm font-medium ${isPut ? "text-green-400" : "text-green-400"}`}>${rec.targetPrice}</div>
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
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Strategy / AI策略推荐</h1>
        <p className="text-sm text-gray-500 mt-1">May 15-23, 2026 &middot; 盘前数据策略更新</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("today")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "today"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-white/5 text-gray-500 border border-transparent hover:bg-white/10"
          }`}
        >
          Today 今日操作
        </button>
        <button
          onClick={() => setActiveTab("nextweek")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
            activeTab === "nextweek"
              ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
              : "bg-white/5 text-gray-500 border border-transparent hover:bg-white/10"
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          Next Week 下周策略
        </button>
      </div>

      {/* Key Strategy Rules - Dynamic */}
      {activeTab === "today" ? (
        <div className="card bg-red-500/5 border-red-500/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h2 className="text-sm font-semibold text-red-400">今日核心策略 / Today's Strategy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-red-300 font-medium">不追空</div>
              <div className="text-gray-500 mt-1">盘前暴跌后等反弹确认再进场Put</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-red-300 font-medium">严控仓位</div>
              <div className="text-gray-500 mt-1">单笔不超过5%，Put波动大</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-green-300 font-medium">反向做多机会</div>
              <div className="text-gray-500 mt-1">NVDA/QQQ企稳可轻仓Call反弹</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card bg-amber-500/5 border-amber-500/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-amber-400">下周核心策略 / Next Week Strategy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-amber-300 font-medium">趋势跟随</div>
              <div className="text-gray-500 mt-1">确认本周破位后，下周继续做空Put为主</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-amber-300 font-medium">板块轮动</div>
              <div className="text-gray-500 mt-1">Space(RKLB)独立行情可单独建仓</div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-amber-300 font-medium">Weekly期权</div>
              <div className="text-gray-500 mt-1">时间价值衰减快，选择本周到期降低成本</div>
            </div>
          </div>
        </div>
      )}

      {/* Today Recommendations */}
      {activeTab === "today" && (
        <>
          {/* Buy Call */}
          {todayRecs.filter(r => r.action === "BUY_CALL").length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-400" />
                Buy Call / 推荐买入Call
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {todayRecs.filter(r => r.action === "BUY_CALL").map(renderStrategyCard)}
              </div>
            </div>
          )}

          {/* Buy Put */}
          {todayRecs.filter(r => r.action === "BUY_PUT").length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4 text-red-400" />
                Buy Put / 推荐买入Put
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {todayRecs.filter(r => r.action === "BUY_PUT").map(renderStrategyCard)}
              </div>
            </div>
          )}

          {/* Watch List */}
          {watchList.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                Watch List / 观察名单
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {watchList.map(renderStrategyCard)}
              </div>
            </div>
          )}
        </>
      )}

      {/* Next Week Recommendations */}
      {activeTab === "nextweek" && (
        <>
          {/* Buy Put Next Week */}
          {nextWeekRecs.filter(r => r.action === "BUY_PUT").length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4 text-red-400" />
                下周Put策略 / Next Week Put Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {nextWeekRecs.filter(r => r.action === "BUY_PUT").map(renderStrategyCard)}
              </div>
            </div>
          )}

          {/* Buy Call Next Week */}
          {nextWeekRecs.filter(r => r.action === "BUY_CALL").length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-400" />
                下周Call策略 / Next Week Call Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {nextWeekRecs.filter(r => r.action === "BUY_CALL").map(renderStrategyCard)}
              </div>
            </div>
          )}
        </>
      )}

      {/* AI Market Analysis Panel */}
      <div className="card bg-blue-500/5 border-blue-500/10">
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-blue-400" />
          AI行情分析 / AI Market Analysis (5/15)
        </h2>
        <div className="space-y-3 text-xs text-gray-400 leading-relaxed">
          <div>
            <span className="text-red-400 font-medium">盘前分析：</span>
            13只标的中11只走弱，仅RKLB大涨+102%。AI板块整体回调，半导体(MU/AMD/INTC)跌幅最大，大科技(AAPL/GOOGL/NVDA)跟跌。今日以Put策略为主，反弹后做空。
          </div>
          <div>
            <span className="text-green-400 font-medium">做多机会：</span>
            NVDA盘前接近昨日低，若开盘站稳$230可做Call；QQQ在$710有支撑；RKLB独立行情可继续持有。
          </div>
          <div>
            <span className="text-red-400 font-medium">高风险Put：</span>
            CRDO跌幅超15%最危险，Put收益可能翻倍；AMD从Gamma Squeeze反转；INTC最弱-6.6%；QCOM暴跌15%趋势破坏。
          </div>
          <div>
            <span className="text-amber-400 font-medium">下周预判：</span>
            若本周确认破位，下周以Put为主。MU目标$720，QQQ看$695，NVDA下探$218。RKLB是唯一可做Call的标的。
          </div>
        </div>
      </div>
    </div>
  );
}
