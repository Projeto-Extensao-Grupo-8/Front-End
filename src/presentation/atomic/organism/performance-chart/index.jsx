import { useEffect, useState } from "react";
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

import { agendamentoService } from "../services/agendamentoService";

export function PerformanceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result =
          await agendamentoService.getGraficoDesempenhoSemanal();

        setData(result);
      } catch (err) {
        console.error("Erro ao carregar gráfico:", err);
      }
    }

    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return <p>Carregando gráfico...</p>;
  }

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

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