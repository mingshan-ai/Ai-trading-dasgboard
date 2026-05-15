"use client";

import { useState } from "react";

const SYMBOLS = [
  { symbol: "NASDAQ:TSLA", label: "TSLA" },
  { symbol: "NASDAQ:AMD", label: "AMD" },
  { symbol: "NASDAQ:NVDA", label: "NVDA" },
  { symbol: "QQQ", label: "QQQ" },
  { symbol: "NASDAQ:MU", label: "MU" },
];

export default function TradingViewWidget() {
  const [activeSymbol, setActiveSymbol] = useState(SYMBOLS[0]);

  // TradingView embed URL
  const tvUrl = `https://www.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${encodeURIComponent(
    activeSymbol.symbol
  )}&interval=15&hidesidetoolbar=0&symboledit=0&saveimage=1&toolbarbg=f1f3f6&studies=MASimple%40tv-basicstudies~60%3Aclose%7C0%2CVolume%40tv-basicstudies~60%3Aclose%7C0%2CRSI%40tv-basicstudies~60%3Aclose%7C0%2CVWAP%40tv-basicstudies~60%3Aclose%7C0&theme=dark&style=1&timezone=America%2FNew_York&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&showpopupbutton=1&locale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=NASDAQ%3AAAPL`;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <span className="text-cyan-400">&#9632;</span>
          Live Chart / 实时行情
          <span className="text-[10px] text-gray-500 font-normal ml-1">TradingView</span>
        </h2>
        <div className="flex items-center gap-1">
          {SYMBOLS.map((s) => (
            <button
              key={s.symbol}
              onClick={() => setActiveSymbol(s)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                activeSymbol.symbol === s.symbol
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-gray-800/50 text-gray-500 border border-gray-800 hover:text-gray-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-lg overflow-hidden border border-gray-800/50" style={{ height: 420 }}>
        <iframe
          id="tradingview_chart"
          src={tvUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          allowTransparency
          scrolling="no"
          allowFullScreen
        />
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-500">
        <span>Indicators: VWAP, EMA(9), Volume, RSI(14)</span>
        <span>|</span>
        <span>Timeframe: 15min</span>
      </div>
    </div>
  );
}
