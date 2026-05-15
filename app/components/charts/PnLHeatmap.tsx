"use client";

import { PnLHeatmapData } from "@/types";

export default function PnLHeatmap({ data }: { data: PnLHeatmapData[] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

  const getValue = (day: string, hour: string) => {
    const item = data.find(d => d.day === day && d.hour === hour);
    return item ? item.value : 0;
  };

  const getColor = (value: number) => {
    if (value >= 3) return "bg-red-500/80 text-white";
    if (value >= 2) return "bg-red-500/60 text-white";
    if (value >= 1) return "bg-red-500/35 text-red-200";
    if (value >= 0) return "bg-red-500/15 text-red-300";
    if (value >= -1) return "bg-green-500/15 text-green-300";
    if (value >= -2) return "bg-green-500/35 text-green-200";
    if (value >= -3) return "bg-green-500/60 text-white";
    return "bg-green-500/80 text-white";
  };

  return (
    <div className="card">
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
        <span className="text-amber-400">&#9632;</span>
        P&L Heatmap / 盈亏热力图
        <span className="text-[10px] text-gray-500 font-normal ml-1">by Weekday &amp; Time</span>
      </h2>
      <div className="overflow-x-auto">
        <div className="min-w-[620px]">
          {/* Header row */}
          <div className="grid gap-[2px]" style={{ gridTemplateColumns: "48px repeat(13, 1fr)" }}>
            <div className="text-[10px] text-gray-500 h-7 flex items-center">Day</div>
            {hours.map(h => (
              <div key={h} className="text-[10px] text-gray-500 h-7 flex items-center justify-center">{h}</div>
            ))}
            {/* Data rows */}
            {days.map(day => (
              <>
                <div key={day} className="text-[11px] text-gray-400 h-7 flex items-center font-medium">{day}</div>
                {hours.map(hour => {
                  const v = getValue(day, hour);
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`rounded-sm h-7 flex items-center justify-center text-[10px] font-medium ${getColor(v)}`}
                      title={`${day} ${hour}: ${v > 0 ? "+" : ""}${v}% avg P&L`}
                    >
                      {v > 0 ? `+${v}` : v}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-red-500/80 inline-block" /> High Profit
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-red-500/15 inline-block" /> Low Profit
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-green-500/15 inline-block" /> Low Loss
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-green-500/80 inline-block" /> High Loss
        </span>
      </div>
    </div>
  );
}
