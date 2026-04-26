import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function PerformanceChart({ data = [] }) {
  if (!data.length) {
    return <p>Carregando gráfico...</p>;
  }

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* continua igual */}
          <XAxis dataKey="day" />
          <YAxis />

          <Tooltip />
          <Legend />

          <Bar dataKey="confirmadas" name="Agendadas" fill="#D390A3" />
          
          <Bar dataKey="canceladas" name="Canceladas" fill="#BFC9E5" />
          <Bar dataKey="realizadas" name="Realizadas" fill="#364153" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}