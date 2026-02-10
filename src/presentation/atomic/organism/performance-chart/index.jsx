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

const data = [
  { day: "Seg", agendadas: 5000,  canceladas: 12000, realizadas: 13500 },
  { day: "Ter", agendadas: 16500, canceladas: 16500, realizadas: 11200 },
  { day: "Qua", agendadas: 5000,  canceladas: 5200,  realizadas: 22000 },
  { day: "Qui", agendadas: 15500, canceladas: 6000,  realizadas: 15800 },
  { day: "Sex", agendadas: 11500, canceladas: 10800, realizadas: 11800 },
  { day: "Sab", agendadas: 16500, canceladas: 13000, realizadas: 13200 },
];

export function PerformanceChart() {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="day" />

          <YAxis
            tickFormatter={(v) => `${v / 1000}k`}
          />

          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(value)
            }
          />

          <Legend />

          <Bar
            dataKey="agendadas"
            name="Agendadas"
            fill="#D390A3"
            barSize={16}
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="canceladas"
            name="Canceladas"
            fill="#BFC9E5"
            barSize={16}
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="realizadas"
            name="Realizadas"
            fill="#364153"
            barSize={16}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}