import { useEffect, useId, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", value: 28 },
  { month: "Fev", value: 18 },
  { month: "Mar", value: 40 },
  { month: "Abr", value: 24 },
  { month: "Mai", value: 33 },
  { month: "Jun", value: 44 },
  { month: "Jul", value: 12 },
  { month: "Ago", value: 38 },
  { month: "Set", value: 25 },
  { month: "Out", value: 34 },
  { month: "Nov", value: 46 },
  { month: "Dez", value: 45 },
];

export function ConsultasChart() {
  const gradientId = useId();
  const [primaryColor, setPrimaryColor] = useState("");

  useEffect(() => {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();

      setPrimaryColor(color);
  }, []);

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} key={primaryColor}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={primaryColor} stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />

          <Bar
            dataKey="value"
            fill={`url(#${gradientId})`}
            radius={[16, 16, 0, 0]}
            barSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
