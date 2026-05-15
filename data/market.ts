import { StockData, StrategyRecommendation, GreeksData, DailyReview, PerformanceMetrics, OptionData } from "@/types";

// May 11, 2026 Market Data (5月11日)
export const stockData: StockData[] = [
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 458.79,
    change: 15.23,
    changePercent: 3.44,
    high: 458.79,
    low: 450.88,
    open: 452.00,
    volume: "68.2M",
    marketCap: "276B",
    sector: "AI Semiconductor",
    layer: "super"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc",
    price: 445.00,
    change: 28.20,
    changePercent: 6.77,
    high: 449.16,
    low: 416.80,
    open: 418.00,
    volume: "124.5M",
    marketCap: "1.42T",
    sector: "AI Robot/EV",
    layer: "super"
  },
  {
    symbol: "CRDO",
    name: "Credo Technology",
    price: 210.22,
    change: 23.44,
    changePercent: 12.56,
    high: 210.97,
    low: 186.78,
    open: 188.50,
    volume: "32.1M",
    marketCap: "28.5B",
    sector: "AI Infrastructure",
    layer: "super"
  },
  {
    symbol: "MU",
    name: "Micron Technology",
    price: 795.33,
    change: 18.66,
    changePercent: 2.40,
    high: 818.67,
    low: 768.00,
    open: 772.00,
    volume: "42.8M",
    marketCap: "86.9B",
    sector: "AI Memory",
    layer: "institution"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    price: 1085.40,
    change: 12.30,
    changePercent: 1.15,
    high: 1092.50,
    low: 1068.20,
    open: 1070.00,
    volume: "38.6M",
    marketCap: "2.66T",
    sector: "AI GPU",
    layer: "institution"
  },
  {
    symbol: "ORCL",
    name: "Oracle Corp",
    price: 193.84,
    change: 3.16,
    changePercent: 1.66,
    high: 195.68,
    low: 190.60,
    open: 191.20,
    volume: "12.4M",
    marketCap: "535B",
    sector: "AI Database",
    layer: "institution"
  },
  {
    symbol: "QCOM",
    name: "Qualcomm Inc",
    price: 237.53,
    change: 6.33,
    changePercent: 2.74,
    high: 247.90,
    low: 231.20,
    open: 232.50,
    volume: "28.9M",
    marketCap: "260B",
    sector: "AI Mobile",
    layer: "super"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    price: 386.77,
    change: -7.56,
    changePercent: -1.91,
    high: 394.33,
    low: 386.23,
    open: 393.00,
    volume: "22.1M",
    marketCap: "2.38T",
    sector: "Big Tech",
    layer: "weak"
  },
  {
    symbol: "BABA",
    name: "Alibaba Group",
    price: 137.30,
    change: -1.55,
    changePercent: -1.12,
    high: 138.85,
    low: 136.22,
    open: 138.50,
    volume: "18.7M",
    marketCap: "342B",
    sector: "China Tech",
    layer: "weak"
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    price: 528.60,
    change: 3.45,
    changePercent: 0.66,
    high: 530.20,
    low: 522.80,
    open: 523.50,
    volume: "55.2M",
    marketCap: "N/A",
    sector: "ETF",
    layer: "institution"
  },
  {
    symbol: "AAPL",
    name: "Apple Inc",
    price: 242.85,
    change: 1.23,
    changePercent: 0.51,
    high: 244.10,
    low: 240.50,
    open: 241.00,
    volume: "48.3M",
    marketCap: "3.72T",
    sector: "Big Tech",
    layer: "institution"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    price: 468.20,
    change: 2.15,
    changePercent: 0.46,
    high: 470.50,
    low: 464.30,
    open: 465.00,
    volume: "21.4M",
    marketCap: "3.48T",
    sector: "Big Tech",
    layer: "institution"
  },
  {
    symbol: "INTC",
    name: "Intel Corp",
    price: 28.45,
    change: 0.85,
    changePercent: 3.08,
    high: 28.90,
    low: 27.20,
    open: 27.50,
    volume: "56.7M",
    marketCap: "120B",
    sector: "Semiconductor",
    layer: "institution"
  },
  {
    symbol: "RKLB",
    name: "Rocket Lab USA",
    price: 62.80,
    change: 3.40,
    changePercent: 5.72,
    high: 63.50,
    low: 58.90,
    open: 59.50,
    volume: "15.2M",
    marketCap: "29.3B",
    sector: "Space",
    layer: "super"
  },
  {
    symbol: "COIN",
    name: "Coinbase Global",
    price: 312.45,
    change: 8.90,
    changePercent: 2.93,
    high: 315.20,
    low: 302.10,
    open: 304.00,
    volume: "11.8M",
    marketCap: "76.2B",
    sector: "Crypto",
    layer: "institution"
  },
];

export const optionChainSample: OptionData[] = [
  { symbol: "AMD", strike: 455, expiry: "2026-05-16", type: "CALL", premium: 12.50, delta: 0.58, gamma: 0.012, theta: -0.85, vega: 2.10, iv: 68.5, oi: 45200, volume: 18500, bid: 12.20, ask: 12.80, mid: 12.50 },
  { symbol: "AMD", strike: 460, expiry: "2026-05-16", type: "CALL", premium: 8.90, delta: 0.42, gamma: 0.015, theta: -0.92, vega: 2.35, iv: 69.2, oi: 32100, volume: 12300, bid: 8.60, ask: 9.20, mid: 8.90 },
  { symbol: "AMD", strike: 465, expiry: "2026-05-16", type: "CALL", premium: 5.40, delta: 0.28, gamma: 0.011, theta: -0.78, vega: 1.85, iv: 67.8, oi: 28500, volume: 9800, bid: 5.10, ask: 5.70, mid: 5.40 },
  { symbol: "AMD", strike: 450, expiry: "2026-05-16", type: "PUT", premium: 6.80, delta: -0.35, gamma: 0.014, theta: -0.70, vega: 1.95, iv: 70.1, oi: 22300, volume: 8900, bid: 6.50, ask: 7.10, mid: 6.80 },
  { symbol: "MU", strike: 790, expiry: "2026-05-16", type: "CALL", premium: 15.20, delta: 0.52, gamma: 0.008, theta: -1.10, vega: 3.20, iv: 52.3, oi: 38500, volume: 14200, bid: 14.80, ask: 15.60, mid: 15.20 },
  { symbol: "MU", strike: 800, expiry: "2026-05-16", type: "CALL", premium: 9.80, delta: 0.38, gamma: 0.010, theta: -1.05, vega: 2.90, iv: 51.8, oi: 25600, volume: 10500, bid: 9.40, ask: 10.20, mid: 9.80 },
  { symbol: "TSLA", strike: 440, expiry: "2026-05-16", type: "CALL", premium: 18.50, delta: 0.55, gamma: 0.009, theta: -1.25, vega: 4.50, iv: 85.2, oi: 52300, volume: 22100, bid: 17.80, ask: 19.20, mid: 18.50 },
  { symbol: "TSLA", strike: 445, expiry: "2026-05-16", type: "CALL", premium: 14.80, delta: 0.45, gamma: 0.011, theta: -1.30, vega: 4.80, iv: 86.1, oi: 41200, volume: 18700, bid: 14.20, ask: 15.40, mid: 14.80 },
  { symbol: "TSLA", strike: 435, expiry: "2026-05-16", type: "PUT", premium: 12.30, delta: -0.38, gamma: 0.010, theta: -1.15, vega: 4.20, iv: 84.5, oi: 31800, volume: 13500, bid: 11.80, ask: 12.80, mid: 12.30 },
  { symbol: "ORCL", strike: 192, expiry: "2026-05-16", type: "CALL", premium: 5.20, delta: 0.54, gamma: 0.022, theta: -0.35, vega: 0.95, iv: 38.5, oi: 18200, volume: 7500, bid: 5.00, ask: 5.40, mid: 5.20 },
  { symbol: "NVDA", strike: 1080, expiry: "2026-05-16", type: "CALL", premium: 22.80, delta: 0.50, gamma: 0.004, theta: -2.10, vega: 5.80, iv: 55.2, oi: 62400, volume: 25600, bid: 22.20, ask: 23.40, mid: 22.80 },
];

export const greeksData: GreeksData[] = [
  { symbol: "AMD", delta: 0.52, gamma: 0.013, theta: -0.85, vega: 2.25, rho: 0.08, iv: 68.5, historicalVol: 62.3 },
  { symbol: "TSLA", delta: 0.48, gamma: 0.010, theta: -1.28, vega: 4.50, rho: 0.12, iv: 85.2, historicalVol: 72.1 },
  { symbol: "MU", delta: 0.45, gamma: 0.009, theta: -1.08, vega: 3.10, rho: 0.06, iv: 52.3, historicalVol: 48.5 },
  { symbol: "NVDA", delta: 0.50, gamma: 0.004, theta: -2.10, vega: 5.80, rho: 0.15, iv: 55.2, historicalVol: 50.8 },
  { symbol: "ORCL", delta: 0.54, gamma: 0.022, theta: -0.35, vega: 0.95, rho: 0.03, iv: 38.5, historicalVol: 32.1 },
  { symbol: "CRDO", delta: 0.55, gamma: 0.018, theta: -0.95, vega: 3.40, rho: 0.07, iv: 92.5, historicalVol: 85.2 },
  { symbol: "QCOM", delta: 0.44, gamma: 0.015, theta: -0.72, vega: 1.80, rho: 0.05, iv: 58.2, historicalVol: 45.6 },
  { symbol: "GOOGL", delta: 0.48, gamma: 0.006, theta: -1.55, vega: 2.80, rho: 0.10, iv: 32.5, historicalVol: 28.3 },
];

export const strategyRecommendations: StrategyRecommendation[] = [
  {
    symbol: "MU",
    action: "BUY_CALL",
    confidence: 88,
    entryPrice: 780,
    targetPrice: 830,
    stopLoss: 760,
    riskReward: 2.5,
    timeframe: "5/12-5/16",
    reason: "机构趋势最健康，AI Memory龙头，回踩780-785区间买入ATM Call，目标25-45%收益"
  },
  {
    symbol: "NVDA",
    action: "BUY_CALL",
    confidence: 82,
    entryPrice: 1070,
    targetPrice: 1120,
    stopLoss: 1050,
    riskReward: 2.0,
    timeframe: "5/12-5/16",
    reason: "AI GPU核心，机构锁仓稳定，适合波段Call"
  },
  {
    symbol: "ORCL",
    action: "BUY_CALL",
    confidence: 78,
    entryPrice: 190,
    targetPrice: 200,
    stopLoss: 185,
    riskReward: 2.0,
    timeframe: "5/12-5/16",
    reason: "防守型AI，机构锁仓，结构健康，适合稳健波段"
  },
  {
    symbol: "AMD",
    action: "WATCH",
    confidence: 65,
    entryPrice: 448,
    targetPrice: 470,
    stopLoss: 440,
    riskReward: 2.2,
    timeframe: "Intraday 5/12",
    reason: "Gamma squeeze中，收最高=空头失控，但极度危险，等回踩448-452不破VWAP再进Call"
  },
  {
    symbol: "TSLA",
    action: "WATCH",
    confidence: 60,
    entryPrice: 435,
    targetPrice: 460,
    stopLoss: 425,
    riskReward: 2.5,
    timeframe: "Intraday 5/12",
    reason: "情绪高潮+AI机器人叙事，振幅30+，IV极高，适合日内小仓，跌破435 Put猛"
  },
  {
    symbol: "CRDO",
    action: "WATCH",
    confidence: 55,
    entryPrice: 195,
    targetPrice: 220,
    stopLoss: 180,
    riskReward: 1.7,
    timeframe: "Intraday",
    reason: "AI妖股化，波动极大，小仓快进快出"
  },
  {
    symbol: "QCOM",
    action: "WATCH",
    confidence: 58,
    entryPrice: 230,
    targetPrice: 250,
    stopLoss: 222,
    riskReward: 2.2,
    timeframe: "5/12-5/16",
    reason: "AI手机狂热启动，但不追高，回踩230附近才进Call"
  },
  {
    symbol: "GOOGL",
    action: "HOLD",
    confidence: 72,
    entryPrice: 386,
    targetPrice: 395,
    stopLoss: 378,
    riskReward: 1.1,
    timeframe: "Neutral",
    reason: "资金流出大科技切去高Beta AI，短线不适合追Call"
  },
];

export const dailyReview: DailyReview = {
  date: "2026-05-11",
  marketStructure: "AI疯狂扩散 + Gamma驱动",
  sectorRotation: "资金从大科技(GOOGL)切去高Beta AI(AMD/TSLA/CRDO)，AI手机(QCOM)启动",
  topMovers: [
    { symbol: "AMD", reason: "收最高458.79，空头完全失控，Gamma squeeze", action: "不追高，等448-452回踩" },
    { symbol: "TSLA", reason: "振幅30+，AI机器人+Gamma情绪高潮", action: "日内小仓，跌破435止损" },
    { symbol: "MU", reason: "高818收795，机构趋势最健康", action: "回踩780-785 Call，目标25-45%" },
    { symbol: "CRDO", reason: "涨12.56%，AI妖股化", action: "小仓快进快出" },
    { symbol: "QCOM", reason: "AI手机资金狂热启动", action: "回踩230再进" },
  ],
  gammaStatus: "AMD/TSLA/CRDO进入Gamma加速，OTM Call爆炸",
  nextDayPreview: "回踩买+快止盈+分批减仓，不追高"
};

export const performanceMetrics: PerformanceMetrics = {
  totalPnL: 125680,
  winRate: 85,
  totalTrades: 342,
  avgReturn: 3.8,
  maxDrawdown: -8.2,
  sharpeRatio: 2.45,
  annualizedReturn: 62.5,
};

// Price history for charts (simulated 30-day)
export const generatePriceHistory = (basePrice: number, volatility: number, days: number = 30): { date: string; price: number }[] => {
  const data: { date: string; price: number }[] = [];
  let price = basePrice * (1 - volatility * 0.15);
  for (let i = days; i >= 0; i--) {
    const d = new Date(2026, 4, 11 - i);
    const change = (Math.random() - 0.45) * volatility * basePrice * 0.02;
    price = Math.max(price + change, basePrice * 0.7);
    data.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      price: Math.round(price * 100) / 100,
    });
  }
  // Ensure last day matches actual price
  data[data.length - 1].price = basePrice;
  return data;
};

// Performance history (simulated)
export const performanceHistory = [
  { month: "Jan", return: 5.2, trades: 28, winRate: 82 },
  { month: "Feb", return: 4.8, trades: 32, winRate: 87 },
  { month: "Mar", return: 6.1, trades: 35, winRate: 85 },
  { month: "Apr", return: 3.5, trades: 30, winRate: 83 },
  { month: "May", return: 7.2, trades: 22, winRate: 90 },
];
