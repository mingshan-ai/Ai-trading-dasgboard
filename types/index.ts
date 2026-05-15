// Types for the AI Trading Dashboard

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: string;
  marketCap: string;
  sector: string;
  layer: "super" | "institution" | "weak";
}

export interface OptionData {
  symbol: string;
  strike: number;
  expiry: string;
  type: "CALL" | "PUT";
  premium: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  iv: number;
  oi: number;
  volume: number;
  bid: number;
  ask: number;
  mid: number;
}

export interface GreeksData {
  symbol: string;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  iv: number;
  historicalVol: number;
}

export interface StrategyRecommendation {
  symbol: string;
  action: "BUY_CALL" | "BUY_PUT" | "SELL_CALL" | "SELL_PUT" | "HOLD" | "WATCH";
  confidence: number;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  riskReward: number;
  timeframe: string;
  reason: string;
}

export interface DailyReview {
  date: string;
  marketStructure: string;
  sectorRotation: string;
  topMovers: {
    symbol: string;
    reason: string;
    action: string;
  }[];
  gammaStatus: string;
  nextDayPreview: string;
}

export interface PerformanceMetrics {
  totalPnL: number;
  winRate: number;
  totalTrades: number;
  avgReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  annualizedReturn: number;
}

// New types for enhanced features

export interface TradingError {
  id: string;
  type: string;
  description: string;
  count: number;
  totalLoss: number;
  frequency: "high" | "medium" | "low";
  example: string;
  solution: string;
  lastOccurred: string;
}

export interface PnLHeatmapData {
  day: string;
  hour: string;
  value: number;
}

export interface HoldingTimeData {
  symbol: string;
  holdingHours: number;
  returnPct: number;
  strategy: string;
}

export interface SentimentPnLData {
  date: string;
  sentiment: number;
  pnl: number;
  tradeCount: number;
}

export interface AIDailyAnalysis {
  date: string;
  gammaAlert: string;
  gammaLevel: "extreme" | "high" | "normal" | "low";
  deltaExposure: string;
  ivRank: string;
  ivPercentile: number;
  keyLevels: { symbol: string; support: number; resistance: number }[];
  aiRecommendation: string;
  riskWarnings: string[];
}
