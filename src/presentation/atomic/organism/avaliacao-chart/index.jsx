import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts";

export function AvaliacaoChart({ data = [] }) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />
          <Legend />

          <Bar dataKey="cinco" fill="#16a34a" name="5★" />
          <Bar dataKey="quatro" fill="#22c55e" name="4★" />
          <Bar dataKey="tres" fill="#eab308" name="3★" />
          <Bar dataKey="duas" fill="#f97316" name="2★" />
          <Bar dataKey="uma" fill="#ef4444" name="1★" />
          <Bar dataKey="zero" fill="#7f1d1d" name="0★" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
