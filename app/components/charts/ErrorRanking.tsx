import { TradingError } from "@/types";
import { AlertTriangle, TrendingUp, TrendingDown, Brain, Zap, Target, Clock, Eye } from "lucide-react";

const errorIcons: Record<string, React.ReactNode> = {
  "FOMO Entry": <TrendingUp className="w-3.5 h-3.5" />,
  "Late Exit": <Clock className="w-3.5 h-3.5" />,
  "Oversized Position": <Zap className="w-3.5 h-3.5" />,
  "Ignoring IV Crush": <AlertTriangle className="w-3.5 h-3.5" />,
  "Revenge Trade": <Brain className="w-3.5 h-3.5" />,
  "No Stop Loss": <Target className="w-3.5 h-3.5" />,
  "Overtrading": <TrendingDown className="w-3.5 h-3.5" />,
  "Wrong Direction": <Eye className="w-3.5 h-3.5" />,
};

const frequencyColors = {
  high: "text-red-400 bg-red-500/10 border-red-500/20",
  medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  low: "text-gray-400 bg-gray-500/10 border-gray-500/20",
};

export default function ErrorRanking({ errors, compact = false }: { errors: TradingError[]; compact?: boolean }) {
  const sorted = [...errors].sort((a, b) => b.totalLoss - a.totalLoss);
  const totalLoss = sorted.reduce((sum, e) => sum + e.totalLoss, 0);

  if (compact) {
    return (
      <div className="card">
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          Top Errors / 交易错误排行
          <span className="text-[10px] text-gray-500 font-normal ml-1">by Total Loss</span>
        </h2>
        <div className="space-y-2">
          {sorted.slice(0, 5).map((e, i) => (
            <div key={e.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/30">
              <span className={`text-sm font-bold w-6 text-center ${i === 0 ? "text-red-400" : i === 1 ? "text-amber-400" : i === 2 ? "text-orange-400" : "text-gray-600"}`}>
                #{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white">{e.type}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border ${frequencyColors[e.frequency]}`}>
                    {e.frequency}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500 truncate">{e.description}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-red-400 font-medium">-${e.totalLoss.toLocaleString()}</div>
                <div className="text-[10px] text-gray-600">{e.count}x</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card text-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Total Loss</div>
          <div className="text-xl font-bold text-red-400 mt-1">-${totalLoss.toLocaleString()}</div>
          <div className="text-[10px] text-gray-600">from errors</div>
        </div>
        <div className="card text-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Error Types</div>
          <div className="text-xl font-bold text-amber-400 mt-1">{sorted.length}</div>
          <div className="text-[10px] text-gray-600">identified</div>
        </div>
        <div className="card text-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Most Frequent</div>
          <div className="text-sm font-bold text-white mt-1">{sorted[0]?.type}</div>
          <div className="text-[10px] text-red-400">{sorted[0]?.count} occurrences</div>
        </div>
        <div className="card text-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Avg Loss / Error</div>
          <div className="text-xl font-bold text-orange-400 mt-1">-${Math.round(totalLoss / sorted.length).toLocaleString()}</div>
          <div className="text-[10px] text-gray-600">per error type</div>
        </div>
      </div>

      {/* Full ranking list */}
      <div className="card">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          Error Leaderboard / 错误排行榜
        </h2>
        <div className="space-y-3">
          {sorted.map((e, i) => (
            <div key={e.id} className="p-3 rounded-lg bg-gray-800/30 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`text-lg font-bold w-8 text-center pt-0.5 ${i === 0 ? "text-red-400" : i === 1 ? "text-amber-400" : i === 2 ? "text-orange-400" : "text-gray-600"}`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400">{errorIcons[e.type] || <AlertTriangle className="w-3.5 h-3.5" />}</span>
                    <span className="text-sm font-semibold text-white">{e.type}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${frequencyColors[e.frequency]}`}>
                      {e.frequency}
                    </span>
                    <span className="text-[10px] text-gray-600 ml-auto">{e.count} times</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{e.description}</div>
                  <div className="text-[10px] text-gray-500 mb-2">
                    <span className="text-amber-400/70">Example:</span> {e.example}
                  </div>
                  <div className="text-[10px] text-green-400/80 bg-green-500/5 rounded px-2 py-1 border border-green-500/10">
                    <span className="text-green-400 font-medium">Solution:</span> {e.solution}
                  </div>
                </div>
                <div className="text-right shrink-0 pl-3">
                  <div className="text-lg font-bold text-red-400">-${e.totalLoss.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-600">last: {e.lastOccurred}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
