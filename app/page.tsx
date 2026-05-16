import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  BarChart3,
  Zap,
  AlertTriangle,
  Brain,
  Shield,
  Radio,
} from "lucide-react";
import { stockData, performanceMetrics, dailyReview, strategyRecommendations, aiDailyAnalysis, tradingErrors, pnlHeatmapData, holdingTimeData, sentimentPnLData } from "@/data/market";
import PnLHeatmap from "@/app/components/charts/PnLHeatmap";
import HoldingTimeChart from "@/app/components/charts/HoldingTimeChart";
import ErrorRanking from "@/app/components/charts/ErrorRanking";
import SentimentScatter from "@/app/components/charts/SentimentScatter";
import TradingViewWidget from "@/app/components/charts/TradingViewWidget";

export default async function Home() {
  const superStocks = stockData.filter((s) => s.layer === "super");
  const instStocks = stockData.filter((s) => s.layer === "institution");
  const weakStocks = stockData.filter((s) => s.layer === "weak");
  const topCall = strategyRecommendations.filter((r) => r.action === "BUY_CALL").slice(0, 3);
  const topWatch = strategyRecommendations.filter((r) => r.action === "WATCH" || r.action === "HOLD").slice(0, 3);

  const gammaColor = aiDailyAnalysis.gammaLevel === "extreme" ? "text-red-400 bg-red-500/10 border-red-500/20" : "text-amber-400 bg-amber-500/10 border-amber-500/20";

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Trading Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Mingshan Capital &middot; May 15, 2026 &middot; AI板块回调 + Put策略主导
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="w-2 h-2 rounded-full bg-green-500 pulse-live" />
          <span className="text-gray-400">Market Updated</span>
          <span className="text-gray-600">|</span>
          <Link href="/errors" className="text-red-400 hover:text-red-300 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Error Radar
          </Link>
        </div>
      </div>

      {/* Key Metrics Row - visible to all */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <MetricCard title="Total P&L" value={`$${performanceMetrics.totalPnL.toLocaleString()}`} subtitle="Total Profit" positive icon={<TrendingUp className="w-4 h-4" />} />
        <MetricCard title="Win Rate" value={`${performanceMetrics.winRate}%`} subtitle={`${performanceMetrics.totalTrades} Trades`} positive icon={<Target className="w-4 h-4" />} />
        <MetricCard title="Annual Return" value={`${performanceMetrics.annualizedReturn}%`} subtitle="YTD Performance" positive icon={<BarChart3 className="w-4 h-4" />} />
        <MetricCard title="Sharpe Ratio" value={performanceMetrics.sharpeRatio.toFixed(2)} subtitle="Risk-Adjusted" positive icon={<Activity className="w-4 h-4" />} />
        <MetricCard title="Error Loss" value={`-$${tradingErrors.reduce((s, e) => s + e.totalLoss, 0).toLocaleString()}`} subtitle="Total from mistakes" positive={false} icon={<AlertTriangle className="w-4 h-4" />} />
      </div>

      {/* === AI Daily Analysis Panel === */}
        <div className="card card-accent-purple">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            AI Daily Analysis / AI每日分析
            <span className="text-[10px] px-2 py-0.5 rounded border ml-auto font-normal">May 15, 2026</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Gamma & IV Status */}
            <div className="space-y-3">
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">Gamma Status</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${gammaColor}`}>
                    {aiDailyAnalysis.gammaLevel.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{aiDailyAnalysis.gammaAlert}</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Delta Exposure</div>
                <p className="text-xs text-gray-300">{aiDailyAnalysis.deltaExposure}</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">IV Rank</span>
                  <span className="text-sm font-bold text-amber-400">{aiDailyAnalysis.ivPercentile}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500 rounded-full" style={{ width: `${aiDailyAnalysis.ivPercentile}%` }} />
                </div>
                <div className="text-[10px] text-gray-500 mt-1">{aiDailyAnalysis.ivRank}</div>
              </div>
            </div>

            {/* Key Levels */}
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Key Support &amp; Resistance / 关键价位</div>
              <div className="space-y-2">
                {aiDailyAnalysis.keyLevels.map((k) => (
                  <div key={k.symbol} className="flex items-center gap-3 p-2 bg-gray-800/30 rounded-lg">
                    <span className="w-10 font-bold text-white text-xs">{k.symbol}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-5 bg-gray-800 rounded relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-1/2 bg-green-500/10 border-r border-green-500/20" />
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-green-400">S: {k.support}</span>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-red-400">R: {k.resistance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation + Risk Warnings */}
            <div className="space-y-3">
              <div className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                <div className="flex items-center gap-1 mb-1">
                  <Brain className="w-3 h-3 text-purple-400" />
                  <span className="text-[10px] text-purple-400 font-medium">AI Recommendation</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{aiDailyAnalysis.aiRecommendation}</p>
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Risk Warnings / 风险预警</div>
              {aiDailyAnalysis.riskWarnings.map((w, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-red-500/5 border border-red-500/10 rounded-lg">
                  <Shield className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-[11px] text-gray-300 leading-relaxed">{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === TradingView Live Chart === */}
        <div className="mt-5">
          <TradingViewWidget />
        </div>

        {/* === Market Structure + Error Summary === */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Market Structure */}
          <div className="card lg:col-span-2">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Market Structure / 市场结构
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Layer 1 */}
              <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-4">
                <div className="text-xs font-medium text-red-400 mb-2">第一层 - 超级主升浪</div>
                <div className="text-[11px] text-gray-500 mb-2">Gamma加速 | 高频逼空 | OTM Call爆炸</div>
                {superStocks.map((s) => (
                  <div key={s.symbol} className="flex justify-between text-sm py-1">
                    <span className="font-medium text-white">{s.symbol}</span>
                    <span className={s.change > 0 ? "price-up" : "price-down"}>
                      {s.change > 0 ? "+" : ""}{s.changePercent.toFixed(2)}%
                    </span>
                  </div>
                ))}
                <div className="mt-2 text-[10px] text-red-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> 极度危险阶段
                </div>
              </div>
              {/* Layer 2 */}
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4">
                <div className="text-xs font-medium text-blue-400 mb-2">第二层 - 机构趋势</div>
                <div className="text-[11px] text-gray-500 mb-2">更稳 | 波段友好 | 回调健康</div>
                {instStocks.slice(0, 5).map((s) => (
                  <div key={s.symbol} className="flex justify-between text-sm py-1">
                    <span className="font-medium text-white">{s.symbol}</span>
                    <span className={s.change > 0 ? "price-up" : "price-down"}>
                      {s.change > 0 ? "+" : ""}{s.changePercent.toFixed(2)}%
                    </span>
                  </div>
                ))}
                <div className="mt-2 text-[10px] text-blue-300 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> 最适合波段交易
                </div>
              </div>
              {/* Layer 3 */}
              <div className="bg-gray-500/5 border border-gray-500/10 rounded-lg p-4">
                <div className="text-xs font-medium text-gray-400 mb-2">第三层 - 开始掉队</div>
                <div className="text-[11px] text-gray-500 mb-2">资金流出 | AI热度不足</div>
                {weakStocks.map((s) => (
                  <div key={s.symbol} className="flex justify-between text-sm py-1">
                    <span className="font-medium text-white">{s.symbol}</span>
                    <span className="price-down">{s.changePercent.toFixed(2)}%</span>
                  </div>
                ))}
                <div className="mt-2 text-[10px] text-gray-500 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> 不适合短线
                </div>
              </div>
            </div>
          </div>

          {/* Error Summary (compact) */}
          <ErrorRanking errors={tradingErrors} compact />
        </div>

        {/* === Top Recommendations + Strategy Actions === */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Best for Call / 最佳Call
            </h2>
            <div className="space-y-3">
              {topCall.map((r, i) => (
                <div key={r.symbol} className="flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg">
                  <div className="text-lg font-bold text-gray-600 w-6">{i + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{r.symbol}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">
                        {r.confidence}% confidence
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{r.reason.slice(0, 50)}...</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-400 font-medium">R:R {r.riskReward}x</div>
                    <div className="text-[10px] text-gray-600">{r.timeframe}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              High Volatility Watch / 高波动观察
            </h2>
            <div className="space-y-3">
              {topWatch.map((r, i) => (
                <div key={r.symbol} className="flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg">
                  <div className="text-lg font-bold text-gray-600 w-6">{i + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{r.symbol}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        r.action === "WATCH" ? "bg-amber-500/10 text-amber-400" : "bg-gray-500/10 text-gray-400"
                      }`}>
                        {r.action}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{r.reason.slice(0, 50)}...</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-amber-400 font-medium">R:R {r.riskReward}x</div>
                    <div className="text-[10px] text-gray-600">{r.timeframe}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === Charts Row: P&L Heatmap + Error Ranking === */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PnLHeatmap data={pnlHeatmapData} />
          <HoldingTimeChart data={holdingTimeData} />
        </div>

        {/* === Sentiment Scatter + Quick Actions === */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <SentimentScatter data={sentimentPnLData} />
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4 text-blue-400" />
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link href="/strategy" className="block p-3 bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/10 rounded-lg transition-colors">
                <div className="text-sm font-medium text-blue-400">AI Strategy / AI策略</div>
                <div className="text-[11px] text-gray-500 mt-1">View all recommendations</div>
              </Link>
              <Link href="/review" className="block p-3 bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/10 rounded-lg transition-colors">
                <div className="text-sm font-medium text-purple-400">Daily Review / 每日复盘</div>
                <div className="text-[11px] text-gray-500 mt-1">May 15 analysis</div>
              </Link>
              <Link href="/options" className="block p-3 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/10 rounded-lg transition-colors">
                <div className="text-sm font-medium text-amber-400">Options Chain / 期权链</div>
                <div className="text-[11px] text-gray-500 mt-1">Active options data</div>
              </Link>
              <Link href="/greeks" className="block p-3 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/10 rounded-lg transition-colors">
                <div className="text-sm font-medium text-cyan-400">Greeks Dashboard / 希腊值</div>
                <div className="text-[11px] text-gray-500 mt-1">Risk metrics</div>
              </Link>
              <Link href="/errors" className="block p-3 bg-red-500/10 hover:bg-red-500/15 border border-red-500/10 rounded-lg transition-colors">
                <div className="text-sm font-medium text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Error Radar / 错误识别
                </div>
                <div className="text-[11px] text-gray-500 mt-1">Trading mistakes analysis</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row: Sector Rotation + Next Day Preview */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card">
            <h2 className="text-base font-semibold mb-3">Sector Rotation / 板块轮动</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{dailyReview.sectorRotation}</p>
            <div className="mt-3 text-xs text-amber-400/70">
              Gamma Status: {dailyReview.gammaStatus}
            </div>
          </div>

          <div className="card">
            <h2 className="text-base font-semibold mb-3">Next Day / 5月16日（周五）预览</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{dailyReview.nextDayPreview}</p>
            <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
              <div className="text-xs text-amber-400 font-medium">
                AI后半段疯狂阶段：涨最快、赚钱最快，但也最容易大回撤
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                最佳打法：回踩买 + 快止盈 + 分批减仓，不赌翻倍
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  positive,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  positive: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">{title}</span>
        <span className={`p-1.5 rounded-lg ${positive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
          {icon}
        </span>
      </div>
      <div className={`text-2xl font-bold ${positive ? "price-up" : "price-down"}`}>{value}</div>
      <div className="text-xs text-gray-600 mt-1">{subtitle}</div>
    </div>
  );
}
