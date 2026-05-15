import { StockData, StrategyRecommendation, GreeksData, DailyReview, PerformanceMetrics, OptionData, TradingError, PnLHeatmapData, HoldingTimeData, SentimentPnLData, AIDailyAnalysis } from "@/types";

// May 15, 2026 Market Data (5月15日) — 盘前数据更新
export const stockData: StockData[] = [
  {
    symbol: "MU",
    name: "Micron Technology",
    price: 752.50,
    change: -42.83,
    changePercent: -5.39,
    high: 812.00,
    low: 775.63,
    open: 795.33,
    volume: "42.8M",
    marketCap: "86.9B",
    sector: "AI Memory",
    layer: "weak"
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 435.50,
    change: -23.29,
    changePercent: -5.08,
    high: 453.00,
    low: 435.68,
    open: 452.00,
    volume: "68.2M",
    marketCap: "276B",
    sector: "AI Semiconductor",
    layer: "weak"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc",
    price: 434.60,
    change: -10.40,
    changePercent: -2.34,
    high: 451.98,
    low: 441.16,
    open: 445.00,
    volume: "124.5M",
    marketCap: "1.42T",
    sector: "AI Robot/EV",
    layer: "weak"
  },
  {
    symbol: "INTC",
    name: "Intel Corp",
    price: 110.67,
    change: -7.78,
    changePercent: -6.57,
    high: 118.57,
    low: 113.17,
    open: 117.20,
    volume: "56.7M",
    marketCap: "120B",
    sector: "Semiconductor",
    layer: "weak"
  },
  {
    symbol: "BABA",
    name: "Alibaba Group",
    price: 136.05,
    change: -1.25,
    changePercent: -0.91,
    high: 143.98,
    low: 138.61,
    open: 142.50,
    volume: "18.7M",
    marketCap: "342B",
    sector: "China Tech",
    layer: "weak"
  },
  {
    symbol: "CRDO",
    name: "Credo Technology",
    price: 178.10,
    change: -32.12,
    changePercent: -15.28,
    high: 187.25,
    low: 178.87,
    open: 185.00,
    volume: "32.1M",
    marketCap: "28.5B",
    sector: "AI Infrastructure",
    layer: "weak"
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    price: 710.00,
    change: -12.00,
    changePercent: -1.66,
    high: 722.00,
    low: 714.00,
    open: 720.00,
    volume: "55.2M",
    marketCap: "N/A",
    sector: "ETF",
    layer: "weak"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    price: 390.73,
    change: 3.96,
    changePercent: 1.02,
    high: 399.10,
    low: 392.72,
    open: 396.00,
    volume: "22.1M",
    marketCap: "2.38T",
    sector: "Big Tech",
    layer: "institution"
  },
  {
    symbol: "AAPL",
    name: "Apple Inc",
    price: 294.57,
    change: -6.43,
    changePercent: -2.13,
    high: 300.45,
    low: 295.38,
    open: 298.00,
    volume: "48.3M",
    marketCap: "3.72T",
    sector: "Big Tech",
    layer: "weak"
  },
  {
    symbol: "QCOM",
    name: "Qualcomm Inc",
    price: 201.10,
    change: -36.43,
    changePercent: -15.34,
    high: 209.53,
    low: 199.60,
    open: 207.00,
    volume: "28.9M",
    marketCap: "260B",
    sector: "AI Mobile",
    layer: "weak"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    price: 230.70,
    change: -6.29,
    changePercent: -2.66,
    high: 236.54,
    low: 229.30,
    open: 234.00,
    volume: "38.6M",
    marketCap: "2.66T",
    sector: "AI GPU",
    layer: "weak"
  },
  {
    symbol: "RKLB",
    name: "Rocket Lab USA",
    price: 127.09,
    change: 64.29,
    changePercent: 102.37,
    high: 133.18,
    low: 121.31,
    open: 125.00,
    volume: "15.2M",
    marketCap: "29.3B",
    sector: "Space",
    layer: "institution"
  },
  {
    symbol: "ORCL",
    name: "Oracle Corp",
    price: 191.50,
    change: -2.34,
    changePercent: -1.21,
    high: 200.70,
    low: 185.45,
    open: 198.00,
    volume: "12.4M",
    marketCap: "535B",
    sector: "AI Database",
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
  // ====== 今日策略 5/15 (Today) ======
  {
    symbol: "NVDA",
    action: "BUY_CALL",
    confidence: 82,
    entryPrice: 228,
    targetPrice: 238,
    stopLoss: 224,
    riskReward: 2.5,
    timeframe: "5/15 Intraday",
    reason: "盘前接近昨日最低229.3，AI GPU核心标的支撑强劲，若开盘站稳230可买入ATM Call，目标$238阻力位"
  },
  {
    symbol: "QQQ",
    action: "BUY_CALL",
    confidence: 78,
    entryPrice: 708,
    targetPrice: 718,
    stopLoss: 702,
    riskReward: 2.0,
    timeframe: "5/15 Intraday",
    reason: "盘前710接近日低714，ETF有大盘支撑，若$710-714区间企稳可做反弹Call，目标$718"
  },
  {
    symbol: "RKLB",
    action: "BUY_CALL",
    confidence: 75,
    entryPrice: 125,
    targetPrice: 135,
    stopLoss: 119,
    riskReward: 1.7,
    timeframe: "5/15 Intraday",
    reason: "Space板块独立行情，盘前127接近日低121.31上方，波动大适合期权，日内波段Call"
  },
  {
    symbol: "MU",
    action: "BUY_PUT",
    confidence: 80,
    entryPrice: 758,
    targetPrice: 740,
    stopLoss: 770,
    riskReward: 1.9,
    timeframe: "5/15 Intraday",
    reason: "盘前752.5远低于日低775.63，暴跌-5.4%破位明确，若反弹至758-760受阻可买入Put，空方动能强"
  },
  {
    symbol: "AMD",
    action: "BUY_PUT",
    confidence: 85,
    entryPrice: 438,
    targetPrice: 420,
    stopLoss: 448,
    riskReward: 2.0,
    timeframe: "5/15 Intraday",
    reason: "盘前435.5接近日低435.68，昨日高453到今盘前跌幅超5%，Gamma Squeeze反转已成，空方主导"
  },
  {
    symbol: "INTC",
    action: "BUY_PUT",
    confidence: 82,
    entryPrice: 112,
    targetPrice: 106,
    stopLoss: 116,
    riskReward: 1.5,
    timeframe: "5/15 Intraday",
    reason: "盘前110.67远低日低113.17，暴跌-6.6%最弱标的，半导体板块抛压集中，Put确定性高"
  },
  {
    symbol: "TSLA",
    action: "BUY_PUT",
    confidence: 75,
    entryPrice: 438,
    targetPrice: 420,
    stopLoss: 448,
    riskReward: 1.8,
    timeframe: "5/15 Intraday",
    reason: "盘前434.6破昨日低441.16，AI机器人情绪退潮，若反弹至438-440区域做空，波动极大注意仓位"
  },
  {
    symbol: "CRDO",
    action: "BUY_PUT",
    confidence: 88,
    entryPrice: 180,
    targetPrice: 165,
    stopLoss: 188,
    riskReward: 2.0,
    timeframe: "5/15 Intraday",
    reason: "盘前178.1接近日低178.87，从高187.25暴跌超15%！AI妖股泡沫破裂，Put收益可能翻倍"
  },
  {
    symbol: "QCOM",
    action: "BUY_PUT",
    confidence: 80,
    entryPrice: 203,
    targetPrice: 190,
    stopLoss: 210,
    riskReward: 1.5,
    timeframe: "5/15 Intraday",
    reason: "盘前201.1接近日低199.6，从高209.53暴跌近15%，AI手机叙事瓦解，跌势明确"
  },
  {
    symbol: "AAPL",
    action: "BUY_PUT",
    confidence: 70,
    entryPrice: 296,
    targetPrice: 288,
    stopLoss: 302,
    riskReward: 2.0,
    timeframe: "5/15 Intraday",
    reason: "盘前294.57破日低295.38，大科技集体走弱，若反弹至296-298可轻仓Put"
  },
  {
    symbol: "BABA",
    action: "BUY_PUT",
    confidence: 72,
    entryPrice: 138,
    targetPrice: 130,
    stopLoss: 143,
    riskReward: 2.0,
    timeframe: "5/15-5/16",
    reason: "盘前136.05破日低138.61，中国科技板块承压，$130是强支撑，适合Put到支撑位"
  },
  {
    symbol: "GOOGL",
    action: "WATCH",
    confidence: 65,
    entryPrice: 390,
    targetPrice: 398,
    stopLoss: 385,
    riskReward: 1.3,
    timeframe: "5/15 Intraday",
    reason: "盘前390.73接近日低392.72，但跌幅不大(-1%)，观察能否在$390企稳，暂不追空"
  },
  {
    symbol: "ORCL",
    action: "WATCH",
    confidence: 60,
    entryPrice: 192,
    targetPrice: 198,
    stopLoss: 185,
    riskReward: 1.3,
    timeframe: "5/15 Intraday",
    reason: "盘前191.5在昨日区间下沿，振幅大(185-200)，方向不明，等待突破确认"
  },
  // ====== 下周策略 5/19-5/23 (Next Week) ======
  {
    symbol: "NVDA",
    action: "BUY_PUT",
    confidence: 78,
    entryPrice: 235,
    targetPrice: 218,
    stopLoss: 245,
    riskReward: 1.7,
    timeframe: "5/19-5/23 Weekly",
    reason: "【下周Put】若本周未能企稳230支撑，下周大概率继续下探$218-$220区间，AI GPU需求存疑"
  },
  {
    symbol: "MU",
    action: "BUY_PUT",
    confidence: 80,
    entryPrice: 760,
    targetPrice: 720,
    stopLoss: 790,
    riskReward: 2.0,
    timeframe: "5/19-5/23 Weekly",
    reason: "【下周Put】暴跌破位后技术面严重破坏，$720是下一个关键支撑，若反弹760-780做空确定性高"
  },
  {
    symbol: "QQQ",
    action: "BUY_PUT",
    confidence: 75,
    entryPrice: 712,
    targetPrice: 695,
    stopLoss: 725,
    riskReward: 1.7,
    timeframe: "5/19-5/23 Weekly",
    reason: "【下周Put】大盘ETF承压，若$710-$714支撑确认破位，下周看$695，用Weekly期权降低成本"
  },
  {
    symbol: "RKLB",
    action: "BUY_CALL",
    confidence: 72,
    entryPrice: 122,
    targetPrice: 140,
    stopLoss: 115,
    riskReward: 1.6,
    timeframe: "5/19-5/23 Weekly",
    reason: "【下周Call】Space板块独立行情可能延续，若回调至$120-122支撑可建仓Call，目标$140新高"
  },
  {
    symbol: "GOOGL",
    action: "BUY_PUT",
    confidence: 68,
    entryPrice: 388,
    targetPrice: 375,
    stopLoss: 398,
    riskReward: 1.5,
    timeframe: "5/19-5/23 Weekly",
    reason: "【下周Put】大科技轮动走弱趋势延续，若$390支撑确认破位，看$375"
  },
];

export const dailyReview: DailyReview = {
  date: "2026-05-15",
  marketStructure: "AI板块集体回调 + Put策略主导",
  sectorRotation: "资金从半导体(MU/AMD/INTC)和大科技(AAPL/NVDA)撤出，Space(RKLB)独立上涨",
  topMovers: [
    { symbol: "RKLB", reason: "盘前+102%暴涨，Space板块独立行情", action: "可轻仓Call，目标$135" },
    { symbol: "CRDO", reason: "盘前暴跌-15.28%至178.1，AI妖股泡沫破裂", action: "买入Put，目标$165，止损$188" },
    { symbol: "QCOM", reason: "盘前暴跌-15.34%至201.1，AI手机叙事瓦解", action: "反弹至203-205做空Put" },
    { symbol: "MU", reason: "盘前-5.39%至752.5，机构趋势破坏", action: "若反弹758-770受阻，买入Put目标$740" },
    { symbol: "AMD", reason: "盘前-5.08%至435.5，Gamma Squeeze反转", action: "破435.68支撑确认，Put目标$420" },
  ],
  gammaStatus: "AMD/TSLA Gamma Squeeze已反转，空头反扑，Put动能强劲",
  nextDayPreview: "今日以Put策略为主，反弹后做空；NVDA/QQQ企稳可轻仓Call反弹"
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

// ====== New Data: Trading Errors ======
export const tradingErrors: TradingError[] = [
  { id: "e1", type: "FOMO Entry", description: "追涨买入 — 看到暴涨后FOMO追高", count: 42, totalLoss: 18500, frequency: "high", example: "AMD 458收最高，次日追458被套", solution: "等回踩VWAP/支撑位再进，至少等15分钟回调确认", lastOccurred: "2026-05-09" },
  { id: "e2", type: "Late Exit", description: "贪心不止盈 — 到了目标价不卖", count: 38, totalLoss: 15200, frequency: "high", example: "MU目标830到了，想等840，结果回到800", solution: "到目标价分批减仓50%，剩下的用trailing stop", lastOccurred: "2026-05-08" },
  { id: "e3", type: "Oversized Position", description: "仓位过重 — 单笔仓位超过总资金20%", count: 25, totalLoss: 22800, frequency: "high", example: "TSLA单笔仓位30%，振幅大被止损出局", solution: "单笔不超过10%，高风险标的不超过5%", lastOccurred: "2026-05-10" },
  { id: "e4", type: "Ignoring IV Crush", description: "忽略IV Crush — 事件后IV暴跌导致期权贬值", count: 18, totalLoss: 8900, frequency: "medium", example: "NVDA财报前买Call，财报好但IV暴跌，Call反跌", solution: "事件前买Option要考虑IV，最好是事件后等IV回落再卖Put", lastOccurred: "2026-05-05" },
  { id: "e5", type: "Revenge Trade", description: "情绪化交易 — 亏损后急于回本加仓", count: 15, totalLoss: 19600, frequency: "medium", example: "AMD亏损后加仓TSLA试图回本，结果双亏", solution: "亏损后至少停30分钟，不报复性加仓，严格执行当日最大亏损限制", lastOccurred: "2026-05-07" },
  { id: "e6", type: "No Stop Loss", description: "没设止损 — 亏损无限扩大", count: 12, totalLoss: 25400, frequency: "medium", example: "CRDO 220买入没止损，跌到180才割肉", solution: "每笔交易必设止损，ATM Call止损设在premium的50%", lastOccurred: "2026-05-06" },
  { id: "e7", type: "Overtrading", description: "过度交易 — 一天超过5笔交易", count: 22, totalLoss: 12300, frequency: "high", example: "一天做了8笔交易，4笔亏损，手续费吃掉利润", solution: "每天限3-5笔高质量交易，不为了交易而交易", lastOccurred: "2026-05-09" },
  { id: "e8", type: "Wrong Direction", description: "逆势操作 — 明明趋势向下却买Call", count: 10, totalLoss: 7200, frequency: "low", example: "GOOGL资金流出期买Call", solution: "先看板块和个股趋势，逆势只做小仓对冲", lastOccurred: "2026-05-04" },
];

// ====== New Data: P&L Heatmap (by weekday x time slot) ======
export const pnlHeatmapData: PnLHeatmapData[] = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];
  const data: PnLHeatmapData[] = [];
  const seed = [2, -1, 3, -2, 1, 0, -3, 2, 1, -1, 3, 1, 0]; // Monday pattern
  days.forEach((day, di) => {
    hours.forEach((hour, hi) => {
      const base = seed[hi] || 0;
      const noise = Math.floor(Math.random() * 4) - 2;
      const value = base + noise + (di % 2 === 0 ? 1 : -1);
      data.push({ day, hour, value });
    });
  });
  return data;
})();

// ====== New Data: Holding Time vs Return ======
export const holdingTimeData: HoldingTimeData[] = [
  { symbol: "MU", holdingHours: 2.5, returnPct: 35, strategy: "Bull Call Spread" },
  { symbol: "NVDA", holdingHours: 4, returnPct: 28, strategy: "Long Call" },
  { symbol: "ORCL", holdingHours: 8, returnPct: 22, strategy: "Cash Secured Put" },
  { symbol: "AMD", holdingHours: 1, returnPct: -12, strategy: "Long Call" },
  { symbol: "TSLA", holdingHours: 0.5, returnPct: 8, strategy: "Scalp Call" },
  { symbol: "QQQ", holdingHours: 24, returnPct: 15, strategy: "Bull Put Spread" },
  { symbol: "INTC", holdingHours: 3, returnPct: 18, strategy: "Long Call" },
  { symbol: "AAPL", holdingHours: 6, returnPct: -5, strategy: "Covered Call" },
  { symbol: "MSFT", holdingHours: 48, returnPct: 10, strategy: "Wheel" },
  { symbol: "COIN", holdingHours: 1.5, returnPct: -18, strategy: "Long Call" },
  { symbol: "QCOM", holdingHours: 3.5, returnPct: 25, strategy: "Bull Call Spread" },
  { symbol: "RKLB", holdingHours: 2, returnPct: 42, strategy: "Long Call" },
  { symbol: "CRDO", holdingHours: 0.8, returnPct: -8, strategy: "Scalp Call" },
  { symbol: "GOOGL", holdingHours: 12, returnPct: -3, strategy: "Long Put" },
  { symbol: "BABA", holdingHours: 72, returnPct: 5, strategy: "Cash Secured Put" },
];

// ====== New Data: Sentiment vs P&L ======
export const sentimentPnLData: SentimentPnLData[] = [
  { date: "5/1", sentiment: 75, pnl: 3200, tradeCount: 4 },
  { date: "5/2", sentiment: 82, pnl: 5800, tradeCount: 3 },
  { date: "5/3", sentiment: 90, pnl: -4200, tradeCount: 7 },
  { date: "5/4", sentiment: 45, pnl: 1200, tradeCount: 2 },
  { date: "5/5", sentiment: 60, pnl: 2800, tradeCount: 3 },
  { date: "5/6", sentiment: 30, pnl: -1500, tradeCount: 5 },
  { date: "5/7", sentiment: 95, pnl: -8500, tradeCount: 8 },
  { date: "5/8", sentiment: 70, pnl: 4500, tradeCount: 4 },
  { date: "5/9", sentiment: 55, pnl: 6200, tradeCount: 2 },
  { date: "5/10", sentiment: 85, pnl: -3200, tradeCount: 6 },
  { date: "5/11", sentiment: 40, pnl: 3800, tradeCount: 3 },
];

// ====== New Data: AI Daily Analysis ======
export const aiDailyAnalysis: AIDailyAnalysis = {
  date: "2026-05-15",
  gammaAlert: "AMD/TSLA Gamma Squeeze已反转，空头反扑！CRDO/MU/AMD盘前暴跌超5-15%，Put动能极强，半导体板块全面承压",
  gammaLevel: "normal",
  deltaExposure: "整体Delta转空 -0.25，Gamma反转后空头占优，Put未平仓量激增",
  ivRank: "整体IV Rank 58%，较前期72%回落，Put成本下降",
  ivPercentile: 58,
  keyLevels: [
    { symbol: "NVDA", support: 228, resistance: 238 },
    { symbol: "QQQ", support: 710, resistance: 718 },
    { symbol: "AMD", support: 420, resistance: 448 },
    { symbol: "MU", support: 740, resistance: 770 },
    { symbol: "TSLA", support: 420, resistance: 448 },
    { symbol: "CRDO", support: 165, resistance: 188 },
    { symbol: "INTC", support: 106, resistance: 116 },
    { symbol: "QCOM", support: 190, resistance: 210 },
  ],
  aiRecommendation: "今日最佳策略：等反弹确认后买入Put（MU/AMD/CRDO/INTC），反弹至阻力位附近做空，严格止损。NVDA/QQQ若企稳$230/$710可轻仓Call反弹。",
  riskWarnings: [
    "Put波动率极大 — CRDO/MU单日跌幅超15%，Put收益可能翻倍但风险极高，仓位控制在5%以内",
    "反弹假突破风险 — 盘前暴跌后常有假反弹，必须等确认信号再进场",
    "IV仍处于高位 — 买入期权成本偏高，建议用价差策略降低成本",
    "周末Gamma风险 — 周五持有期权面临周末时间衰减，当日平仓为主",
  ],
};
