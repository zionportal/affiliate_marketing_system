"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type ShareDatum = {
  name: string;
  revenue: number;
  share: number;
};

const colors = ["#617a42", "#3f8090", "#d79a37", "#a95f49", "#7f8d5d"];

type ShareChartProps = {
  data: ShareDatum[];
};

export function ShareChart({ data }: ShareChartProps) {
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
        <PieChart>
          <Pie
            data={data}
            dataKey="revenue"
            nameKey="name"
            innerRadius={80}
            outerRadius={118}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 20,
              border: "1px solid rgba(29,48,40,0.08)",
              background: "rgba(255,252,246,0.96)",
            }}
            formatter={(value) => {
              const amount = typeof value === "number" ? value : Number(value ?? 0);

              return [`$${amount.toLocaleString()}`, "Revenue"];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
