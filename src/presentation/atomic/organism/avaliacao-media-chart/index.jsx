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

function getBarColor(media) {
  if (media >= 4.5) return "#16a34a";
  if (media >= 3.5) return "#22c55e";
  if (media >= 2.5) return "#eab308";
  if (media >= 1.5) return "#f97316";
  return "#ef4444";
}

export function AvaliacaoMediaChart({ data = [] }) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(2)} ★`, "Média"]}
          />
          <Bar dataKey="media" name="Média" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.media)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
