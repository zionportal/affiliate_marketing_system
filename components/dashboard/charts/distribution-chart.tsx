"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DistributionDatum = {
  name: string;
  value: number;
  fill: string;
};

type DistributionChartProps = {
  data: DistributionDatum[];
};

export function DistributionChart({ data }: DistributionChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  if (!isMounted) {
    return <div className="h-72 w-full rounded-[28px] bg-[rgba(255,255,255,0.52)]" />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(29,48,40,0.06)" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#1d3028", fontSize: 13 }}
            width={88}
          />
          <Tooltip
            cursor={{ fill: "rgba(29,48,40,0.04)" }}
            contentStyle={{
              borderRadius: 20,
              border: "1px solid rgba(29,48,40,0.08)",
              background: "rgba(255,252,246,0.96)",
            }}
          />
          <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={22}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
