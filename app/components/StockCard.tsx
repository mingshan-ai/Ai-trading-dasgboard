"use client";

import { StockData } from "@/types";

const layerLabels = {
  super: { text: "Gamma加速", class: "gradient-super text-white" },
  institution: { text: "机构趋势", class: "gradient-institution text-white" },
  weak: { text: "资金流出", class: "gradient-weak text-white" },
};

export default function StockCard({ stock }: { stock: StockData }) {
  const isUp = stock.change > 0;
  const isDown = stock.change < 0;
  const layer = layerLabels[stock.layer];

  return (
    <div className={`card group cursor-pointer ${isUp ? "glow-red" : isDown ? "glow-green" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{stock.symbol}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${layer.class}`}>
              {layer.text}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">{stock.name}</div>
        </div>
        <div className="text-right">
          <div className={`text-xl font-bold ${isUp ? "price-up" : isDown ? "price-down" : "price-flat"}`}>
            ${stock.price.toFixed(2)}
          </div>
          <div className={`text-sm font-medium ${isUp ? "price-up" : isDown ? "price-down" : "price-flat"}`}>
            {isUp ? "+" : ""}{stock.change.toFixed(2)} ({isUp ? "+" : ""}{stock.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      {/* Price range bar */}
      <div className="mt-3">
        <div className="flex justify-between text-[10px] text-gray-600 mb-1">
          <span>L: ${stock.low.toFixed(2)}</span>
          <span>H: ${stock.high.toFixed(2)}</span>
        </div>
        <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute h-full rounded-full transition-all duration-500"
            style={{
              width: `${((stock.price - stock.low) / (stock.high - stock.low)) * 100}%`,
              background: isUp
                ? "linear-gradient(90deg, #ef4444, #f87171)"
                : "linear-gradient(90deg, #22c55e, #4ade80)",
            }}
          />
        </div>
      </div>

      {/* Bottom info */}
      <div className="flex items-center justify-between mt-3 text-[11px] text-gray-500">
        <span>{stock.sector}</span>
        <span>Vol: {stock.volume}</span>
      </div>
    </div>
  );
}
