"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PerformancePoint = {
  month: string;
  revenue: number;
  commissions: number;
};

type PerformanceChartProps = {
  data: PerformancePoint[];
};

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  if (!isMounted) {
    return <div className="h-80 w-full rounded-[28px] bg-[rgba(255,255,255,0.52)]" />;
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#617a42" stopOpacity={0.34} />
              <stop offset="95%" stopColor="#617a42" stopOpacity={0.03} />
            </linearGradient>
            <linearGradient id="commissionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3f8090" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#3f8090" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(29,48,40,0.08)" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#506058", fontSize: 12 }} />
          <YAxis
            tickFormatter={(value) => `$${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#506058", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ stroke: "rgba(29,48,40,0.08)", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 20,
              border: "1px solid rgba(29,48,40,0.08)",
              background: "rgba(255,252,246,0.95)",
              boxShadow: "0 14px 40px rgba(29,48,40,0.12)",
            }}
            formatter={(value, name) => {
              const amount = typeof value === "number" ? value : Number(value ?? 0);

              return [
                `$${amount.toLocaleString()}`,
                name === "revenue" ? "Revenue" : "Commission",
              ];
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#617a42"
            strokeWidth={3}
            fill="url(#revenueGradient)"
          />
          <Area
            type="monotone"
            dataKey="commissions"
            stroke="#3f8090"
            strokeWidth={2.5}
            fill="url(#commissionGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
