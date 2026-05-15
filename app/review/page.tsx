"use client";

import { dailyReview, stockData } from "@/data/market";
import { Calendar, TrendingUp, TrendingDown, AlertTriangle, Zap, ArrowRight } from "lucide-react";

export default function ReviewPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold">Daily Review / 每日复盘</h1>
          <p className="text-sm text-gray-500 mt-1">
            <Calendar className="w-3 h-3 inline mr-1" />
            {dailyReview.date} (May 11, 2026)
          </p>
        </div>
      </div>

      {/* Market Structure */}
      <div className="card bg-gradient-to-r from-purple-500/5 to-blue-500/5">
        <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-400" />
          Market Structure / 市场结构
        </h2>
        <p className="text-lg text-purple-300 font-medium">{dailyReview.marketStructure}</p>
        <p className="text-sm text-gray-400 mt-2">{dailyReview.sectorRotation}</p>
      </div>

      {/* Top Movers */}
      <div>
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          Top Movers Analysis / 核心标的分析
        </h2>
        <div className="space-y-3">
          {dailyReview.topMovers.map((mover, i) => {
            const stock = stockData.find((s) => s.symbol === mover.symbol);
            if (!stock) return null;
            const isUp = stock.change > 0;

            return (
              <div key={mover.symbol} className="card">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Header */}
                  <div className="flex items-center gap-3 lg:min-w-[200px]">
                    <div className="text-2xl font-bold text-gray-600">{i + 1}</div>
                    <div>
                      <div className="text-lg font-bold text-white">{mover.symbol}</div>
                      <div className={`text-sm font-medium ${isUp ? "price-up" : "price-down"}`}>
                        ${stock.price.toFixed(2)} ({isUp ? "+" : ""}{stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 leading-relaxed mb-2">
                      {mover.reason}
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-blue-400 font-medium">{mover.action}</span>
                    </div>
                  </div>

                  {/* Price Stats */}
                  <div className="flex gap-4 text-xs text-gray-500 lg:min-w-[200px] justify-end">
                    <div>
                      <div>Open</div>
                      <div className="text-white">${stock.open.toFixed(2)}</div>
                    </div>
                    <div>
                      <div>High</div>
                      <div className="text-red-400">${stock.high.toFixed(2)}</div>
                    </div>
                    <div>
                      <div>Low</div>
                      <div className="text-green-400">${stock.low.toFixed(2)}</div>
                    </div>
                    <div>
                      <div>Vol</div>
                      <div className="text-white">{stock.volume}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AMD Analysis */}
        <div className="card glow-red">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-red-400">AMD</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              Gamma Squeeze
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>收在最高 458.79 = 空头完全失控，Gamma squeeze持续中。</p>
            <p>已远离均线/VWAP，进入极度危险阶段。</p>
            <p className="text-amber-400">5/12策略：不追高，等回踩448-452不破VWAP再做ATM Call。</p>
            <p className="text-red-400">风险：跌破450 + NVDA转弱 = Put可能单日翻倍。</p>
          </div>
        </div>

        {/* TSLA Analysis */}
        <div className="card glow-red">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-red-400">TSLA</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              情绪高潮
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>振幅30+，完全进入情绪阶段。核心逻辑已不是汽车，而是AI机器人 + Gamma。</p>
            <p>IV已极高，即使继续涨Call也未必再暴涨。</p>
            <p className="text-amber-400">5/12策略：不追开盘，等第一波回踩435-438站稳再Call。</p>
            <p className="text-red-400">更适合日内，不适合重仓隔夜。</p>
          </div>
        </div>

        {/* MU Analysis */}
        <div className="card glow-blue">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-blue-400">MU</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              机构趋势
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>高818收795，虽然回落但整体趋势极健康。</p>
            <p>已成为AI Memory龙头，机构趋势 vs AMD情绪逼空。</p>
            <p className="text-green-400">5/12策略：继续Call优先，回踩780-785不破再进，目标25-45%。</p>
            <p>最适合波段的AI股之一。</p>
          </div>
        </div>

        {/* Gamma Status */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold">Gamma Status / Gamma状态</span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>{dailyReview.gammaStatus}</p>
            <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
              <p className="text-amber-300 text-xs font-medium">
                AI后半段疯狂阶段：涨最快、赚钱最快，但也最容易大回撤。
              </p>
            </div>
            <p className="text-green-400 font-medium">
              最佳打法：回踩买 + 快止盈 + 分批减仓
            </p>
          </div>
        </div>
      </div>

      {/* Next Day Preview */}
      <div className="card">
        <h2 className="text-base font-semibold mb-3">Next Day / 5月12日预览</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-4">
            <div className="text-green-400 font-medium mb-2">Best for Call / 最佳Call</div>
            <div className="space-y-1 text-gray-400">
              <div>1. MU (机构趋势最健康)</div>
              <div>2. NVDA (AI核心)</div>
              <div>3. ORCL (防守型AI)</div>
            </div>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-4">
            <div className="text-amber-400 font-medium mb-2">High Volatility / 高爆发日内</div>
            <div className="space-y-1 text-gray-400">
              <div>1. AMD (Gamma squeeze)</div>
              <div>2. TSLA (情绪高潮)</div>
              <div>3. CRDO (AI妖股)</div>
            </div>
          </div>
          <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-4">
            <div className="text-red-400 font-medium mb-2">Put Watch / Put观察</div>
            <div className="space-y-1 text-gray-400">
              <div>AMD 跌破 $450</div>
              <div>TSLA 跌破 $435</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
