"use client";

import { useState } from "react";
import { stockData } from "@/data/market";
import StockCard from "../components/StockCard";

const layers = [
  { key: "all", label: "All / 全部" },
  { key: "super", label: "Gamma加速" },
  { key: "institution", label: "机构趋势" },
  { key: "weak", label: "资金流出" },
];

export default function StocksPage() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<"change" | "volume" | "price">("change");

  const filtered = filter === "all"
    ? stockData
    : stockData.filter((s) => s.layer === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "change") return Math.abs(b.changePercent) - Math.abs(a.changePercent);
    if (sort === "volume") return b.volume.localeCompare(a.volume);
    return b.price - a.price;
  });

  const totalChange = stockData.reduce((acc, s) => acc + s.changePercent, 0);
  const avgChange = totalChange / stockData.length;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Watchlist / 行情监控</h1>
          <p className="text-sm text-gray-500 mt-1">15 tracked symbols &middot; May 15, 2026</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={`text-lg font-bold ${avgChange > 0 ? "price-up" : "price-down"}`}>
              Avg {avgChange > 0 ? "+" : ""}{avgChange.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {layers.map((l) => (
          <button
            key={l.key}
            onClick={() => setFilter(l.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === l.key
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-gray-500 border border-transparent hover:bg-white/10"
            }`}
          >
            {l.label}
          </button>
        ))}
        <div className="flex-1" />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "change" | "volume" | "price")}
          className="bg-white/5 border border-[#1e1e2e] rounded-lg px-3 py-1.5 text-xs text-gray-400 outline-none"
        >
          <option value="change">Sort by Change</option>
          <option value="volume">Sort by Volume</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sorted.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
}
