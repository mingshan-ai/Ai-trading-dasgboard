"use client";

import { useState } from "react";
import { optionChainSample } from "@/data/market";

const symbols = ["All", "AMD", "TSLA", "MU", "NVDA", "ORCL"];

export default function OptionsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("All");

  const filtered = selectedSymbol === "All"
    ? optionChainSample
    : optionChainSample.filter((o) => o.symbol === selectedSymbol);

  const calls = filtered.filter((o) => o.type === "CALL");
  const puts = filtered.filter((o) => o.type === "PUT");

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Options Chain / 期权链</h1>
        <p className="text-sm text-gray-500 mt-1">Expiry: May 16, 2026 &middot; Weekly Options</p>
      </div>

      {/* Symbol filter */}
      <div className="flex flex-wrap gap-2">
        {symbols.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSymbol(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedSymbol === s
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-gray-500 border border-transparent hover:bg-white/10"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Calls Table */}
      <div>
        <h2 className="text-sm font-semibold text-green-400 mb-3">CALLS / 看涨期权</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-[#1e1e2e]">
                <th className="text-left py-2 px-2">Symbol</th>
                <th className="text-right py-2 px-2">Strike</th>
                <th className="text-right py-2 px-2">Premium</th>
                <th className="text-right py-2 px-2">Bid / Ask</th>
                <th className="text-right py-2 px-2">Delta</th>
                <th className="text-right py-2 px-2">Gamma</th>
                <th className="text-right py-2 px-2">Theta</th>
                <th className="text-right py-2 px-2">Vega</th>
                <th className="text-right py-2 px-2">IV</th>
                <th className="text-right py-2 px-2">OI</th>
                <th className="text-right py-2 px-2">Vol</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((opt, i) => (
                <tr key={`${opt.symbol}-${opt.strike}-call-${i}`} className="border-b border-[#1e1e2e]/50 hover:bg-white/[0.02] transition-colors">
                  <td className="py-2 px-2 font-medium text-white">{opt.symbol}</td>
                  <td className="py-2 px-2 text-right text-white">${opt.strike}</td>
                  <td className="py-2 px-2 text-right text-green-400">${opt.premium.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right text-gray-400">${opt.bid.toFixed(2)} / ${opt.ask.toFixed(2)}</td>
                  <td className={`py-2 px-2 text-right ${opt.delta > 0.5 ? "text-green-400" : "text-gray-400"}`}>
                    {opt.delta.toFixed(3)}
                  </td>
                  <td className="py-2 px-2 text-right text-cyan-400">{opt.gamma.toFixed(4)}</td>
                  <td className="py-2 px-2 text-right text-red-400">{opt.theta.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right text-purple-400">{opt.vega.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right text-amber-400">{opt.iv.toFixed(1)}%</td>
                  <td className="py-2 px-2 text-right text-gray-400">{(opt.oi / 1000).toFixed(1)}K</td>
                  <td className="py-2 px-2 text-right text-gray-400">{(opt.volume / 1000).toFixed(1)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Puts Table */}
      <div>
        <h2 className="text-sm font-semibold text-red-400 mb-3">PUTS / 看跌期权</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-[#1e1e2e]">
                <th className="text-left py-2 px-2">Symbol</th>
                <th className="text-right py-2 px-2">Strike</th>
                <th className="text-right py-2 px-2">Premium</th>
                <th className="text-right py-2 px-2">Bid / Ask</th>
                <th className="text-right py-2 px-2">Delta</th>
                <th className="text-right py-2 px-2">Gamma</th>
                <th className="text-right py-2 px-2">Theta</th>
                <th className="text-right py-2 px-2">Vega</th>
                <th className="text-right py-2 px-2">IV</th>
                <th className="text-right py-2 px-2">OI</th>
                <th className="text-right py-2 px-2">Vol</th>
              </tr>
            </thead>
            <tbody>
              {puts.map((opt, i) => (
                <tr key={`${opt.symbol}-${opt.strike}-put-${i}`} className="border-b border-[#1e1e2e]/50 hover:bg-white/[0.02] transition-colors">
                  <td className="py-2 px-2 font-medium text-white">{opt.symbol}</td>
                  <td className="py-2 px-2 text-right text-white">${opt.strike}</td>
                  <td className="py-2 px-2 text-right text-red-400">${opt.premium.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right text-gray-400">${opt.bid.toFixed(2)} / ${opt.ask.toFixed(2)}</td>
                  <td className={`py-2 px-2 text-right ${Math.abs(opt.delta) > 0.5 ? "text-red-400" : "text-gray-400"}`}>
                    {opt.delta.toFixed(3)}
                  </td>
                  <td className="py-2 px-2 text-right text-cyan-400">{opt.gamma.toFixed(4)}</td>
                  <td className="py-2 px-2 text-right text-red-400">{opt.theta.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right text-purple-400">{opt.vega.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right text-amber-400">{opt.iv.toFixed(1)}%</td>
                  <td className="py-2 px-2 text-right text-gray-400">{(opt.oi / 1000).toFixed(1)}K</td>
                  <td className="py-2 px-2 text-right text-gray-400">{(opt.volume / 1000).toFixed(1)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IV Rank Legend */}
      <div className="card">
        <h3 className="text-xs font-semibold text-gray-500 mb-3">IV Interpretation / 隐含波动率解读</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-3">
            <div className="text-green-400 font-medium">IV &lt; 40%</div>
            <div className="text-gray-500 mt-1">低波动 - 适合卖出期权</div>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
            <div className="text-amber-400 font-medium">IV 40-60%</div>
            <div className="text-gray-500 mt-1">中等波动 - 波段交易</div>
          </div>
          <div className="bg-orange-500/5 border border-orange-500/10 rounded-lg p-3">
            <div className="text-orange-400 font-medium">IV 60-80%</div>
            <div className="text-gray-500 mt-1">高波动 - 买Call需谨慎</div>
          </div>
          <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
            <div className="text-red-400 font-medium">IV &gt; 80%</div>
            <div className="text-gray-500 mt-1">极端波动 - Gamma squeeze</div>
          </div>
        </div>
      </div>
    </div>
  );
}
