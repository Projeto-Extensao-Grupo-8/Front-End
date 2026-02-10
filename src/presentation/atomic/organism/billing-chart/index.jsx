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
  { month: "Jan", saida: 10500, offline: 12000 },
  { month: "Fev", saida: 16500, offline: 11200 },
  { month: "Mar", saida: 5000,  offline: 22000 },
  { month: "Abr", saida: 15000, offline: 6000 },
  { month: "Mai", saida: 11500, offline: 10800 },
  { month: "Jun", saida: 16000, offline: 13000 },
  { month: "Jul", saida: 20500, offline: 10500 },
  { month: "Ago", saida: 14500, offline: 5800 },
  { month: "Set", saida: 11200, offline: 10700 },
  { month: "Out", saida: 16200, offline: 12900 },
  { month: "Nov", saida: 20500, offline: 10400 },
  { month: "Dez", saida: 22500, offline: 11800 },
];

export function BillingChart() {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data} barGap={10}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
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
            dataKey="saida"
            name="Saída"
            fill="#D390A3"
            barSize={18}
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="offline"
            name="Offline Sales"
            fill="#364153"
            barSize={18}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}