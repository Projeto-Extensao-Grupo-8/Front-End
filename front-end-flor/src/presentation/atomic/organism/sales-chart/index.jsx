import { useEffect, useId, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", value: 52 },
  { month: "Fev", value: 30 },
  { month: "Mar", value: 54 },
  { month: "Abr", value: 34 },
  { month: "Mai", value: 33 },
  { month: "Jun", value: 22 },
  { month: "Jul", value: 45 },
  { month: "Ago", value: 15 },
  { month: "Set", value: 31 },
  { month: "Out", value: 42 },
  { month: "Nov", value: 65 },
  { month: "Dez", value: 55 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px 14px",
          borderRadius: 10,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          fontSize: 14,
        }}
      >
        <strong>{payload[0].value}%</strong>
        <div style={{ color: "green", fontSize: 12 }}>↑ 100</div>
      </div>
    );
  }

  return null;
};

export function SalesChart() {
  const gradientId = useId();
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryTransparent, setPrimaryTransparent] = useState("");

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);

    setPrimaryColor(styles.getPropertyValue("--primary").trim());
    setPrimaryTransparent(
      styles.getPropertyValue("--primary-transparent").trim()
    );
  }, []);

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} key={primaryColor}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} />
              <stop
                offset="100%"
                stopColor={primaryTransparent || primaryColor}
                stopOpacity={0.4}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month"  interval={0}/>
          <YAxis domain={[0, 100]} />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke={primaryColor}
            strokeWidth={3}
            fill={`url(#${gradientId})`}
            dot={{
              r: 6,
              fill: "#fff",
              stroke: "#1F2937",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
              fill: "#fff",
              stroke: primaryColor,
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
