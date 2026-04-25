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

const DEFAULT_DATA = [
  { label: "Agendadas", value: 40 },
  { label: "Canceladas", value: 12 },
  { label: "Realizadas", value: 28 },
];

export function PerformanceChart({ data: dataProp }) {
  const data =
    Array.isArray(dataProp) && dataProp.length > 0
      ? dataProp
      : DEFAULT_DATA;

  const gradientId = useId();
  const [primaryColor, setPrimaryColor] = useState("");

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const color = styles.getPropertyValue("--primary").trim();

    setPrimaryColor(color || "#8884d8");
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

          {/* 🔥 agora usa label */}
          <XAxis dataKey="label" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("pt-BR").format(value)
            }
          />

          <Bar
            dataKey="value"
            fill={`url(#${gradientId})`}
            radius={[12, 12, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}