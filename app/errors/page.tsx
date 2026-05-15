import { tradingErrors } from "@/data/market";
import ErrorRanking from "@/app/components/charts/ErrorRanking";
import {
  AlertTriangle,
  Brain,
  TrendingUp,
  Clock,
  Zap,
  Target,
  Eye,
  TrendingDown,
} from "lucide-react";

const errorIcons: Record<string, React.ReactNode> = {
  "FOMO Entry": <TrendingUp className="w-4 h-4" />,
  "Late Exit": <Clock className="w-4 h-4" />,
  "Oversized Position": <Zap className="w-4 h-4" />,
  "Ignoring IV Crush": <AlertTriangle className="w-4 h-4" />,
  "Revenge Trade": <Brain className="w-4 h-4" />,
  "No Stop Loss": <Target className="w-4 h-4" />,
  "Overtrading": <TrendingDown className="w-4 h-4" />,
  "Wrong Direction": <Eye className="w-4 h-4" />,
};

const frequencyStyles = {
  high: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", dot: "bg-red-500" },
  medium: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", dot: "bg-amber-500" },
  low: { bg: "bg-gray-500/10", border: "border-gray-500/20", text: "text-gray-400", dot: "bg-gray-500" },
};

export default async function ErrorRadarPage() {
  const totalLoss = tradingErrors.reduce((s, e) => s + e.totalLoss, 0);
  const totalCount = tradingErrors.reduce((s, e) => s + e.count, 0);
  const sorted = [...tradingErrors].sort((a, b) => b.totalLoss - a.totalLoss);
  const highFreq = tradingErrors.filter(e => e.frequency === "high");

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          Error Radar / 错误识别系统
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          AI-powered trading mistake identification &amp; prevention / AI驱动的交易错误识别与防范
        </p>
      </div>

      {/* Full Error Ranking */}
      <ErrorRanking errors={tradingErrors} />

      {/* Error Frequency Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* By Frequency */}
        <div className="card">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Error Frequency / 错误频率分析
          </h2>
          <div className="space-y-3">
            {["high", "medium", "low"].map((freq) => {
              const items = tradingErrors.filter(e => e.frequency === freq);
              const count = items.reduce((s, e) => s + e.count, 0);
              const loss = items.reduce((s, e) => s + e.totalLoss, 0);
              const pct = Math.round((count / totalCount) * 100);
              const style = frequencyStyles[freq as keyof typeof frequencyStyles];
              return (
                <div key={freq} className={`p-4 rounded-lg border ${style.border} ${style.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                      <span className={`text-sm font-semibold ${style.text} capitalize`}>{freq} Frequency</span>
                    </div>
                    <span className="text-xs text-gray-500">{items.length} types</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">{count}</div>
                      <div className="text-[10px] text-gray-500">occurrences</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-400">-${loss.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-500">total loss</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-amber-400">{pct}%</div>
                      <div className="text-[10px] text-gray-500">of all errors</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {items.map(e => (
                      <span key={e.id} className="text-[10px] px-2 py-0.5 rounded bg-gray-800/50 text-gray-300">
                        {e.type}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Pattern Analysis */}
        <div className="card">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            Pattern Analysis / 模式分析
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="text-sm font-medium text-white mb-2">Most Destructive Error</div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-red-400">{errorIcons[sorted[0]?.type]}</div>
                <div>
                  <div className="text-white font-medium">{sorted[0]?.type}</div>
                  <div className="text-xs text-gray-500">{sorted[0]?.description}</div>
                </div>
              </div>
              <div className="text-xs text-red-400">
                Loss: -${sorted[0]?.totalLoss.toLocaleString()} | {sorted[0]?.count} times
              </div>
            </div>

            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="text-sm font-medium text-white mb-2">Most Frequent Error</div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-amber-400">{errorIcons[highFreq[0]?.type]}</div>
                <div>
                  <div className="text-white font-medium">{highFreq[0]?.type}</div>
                  <div className="text-xs text-gray-500">{highFreq[0]?.description}</div>
                </div>
              </div>
              <div className="text-xs text-amber-400">
                {highFreq[0]?.count} occurrences | Loss: -${highFreq[0]?.totalLoss.toLocaleString()}
              </div>
            </div>

            <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg">
              <div className="text-sm font-medium text-purple-400 mb-2">AI Insight / AI洞察</div>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">1.</span>
                  <span><strong>FOMO + 情绪化交易</strong>贡献了最大亏损($37,500)，建议在开盘前30分钟不追涨</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">2.</span>
                  <span><strong>仓位管理</strong>是第二大问题($22,800)，建议启用单笔仓位上限自动提醒</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">3.</span>
                  <span><strong>过度交易</strong>频率最高(22次)，建议设置每日交易次数上限为5笔</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">4.</span>
                  <span>如果能消除<strong>Top 3错误</strong>，可挽回约$56,500亏损，胜率可从85%提升至92%</span>
                </li>
              </ul>
            </div>

            {/* Summary stat */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-800/30 rounded-lg text-center">
                <div className="text-[10px] text-gray-500 uppercase">Recoverable Loss</div>
                <div className="text-xl font-bold text-green-400 mt-1">${totalLoss.toLocaleString()}</div>
                <div className="text-[10px] text-gray-600">by eliminating errors</div>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg text-center">
                <div className="text-[10px] text-gray-500 uppercase">Potential Win Rate</div>
                <div className="text-xl font-bold text-amber-400 mt-1">92%</div>
                <div className="text-[10px] text-gray-600">if errors eliminated</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Trend Over Time */}
      <div className="card">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-green-400" />
          Error Reduction Target / 错误减少目标
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tradingErrors.slice(0, 4).map((e) => (
            <div key={e.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-800/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-400">{errorIcons[e.type]}</span>
                <span className="text-sm font-medium text-white">{e.type}</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-gray-500">Current</span>
                    <span className="text-red-400">{e.count} times</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500/60 rounded-full" style={{ width: `${Math.min(e.count * 2.5, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-gray-500">Target</span>
                    <span className="text-green-400">-50%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500/40 rounded-full" style={{ width: `${Math.min(e.count * 1.25, 100)}%` }} />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-gray-500 bg-green-500/5 rounded px-2 py-1 border border-green-500/10">
                {e.solution.slice(0, 60)}...
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
