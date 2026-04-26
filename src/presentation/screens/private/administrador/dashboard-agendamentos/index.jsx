import { useEffect, useState } from "react";
import { DataCard, TitleCard } from "../../../../atomic/molecule";
import { ConsultasChart, PerformanceChart } from "../../../../atomic/organism";
import { AvaliacaoChart } from "../../../../atomic/organism/AvaliacaoChart";
import { agendamentoService } from "../../../../../services/agendamentoService";

export default function DashboardAgendamentos() {
  const [kpis, setKpis] = useState(null);
  const [desempenhoSemanal, setDesempenhoSemanal] = useState([]);
  const [distribuicaoHorario, setDistribuicaoHorario] = useState([]);
  const [avaliacaoFuncionarios, setAvaliacaoFuncionarios] = useState([]);
  const [avaliacaoConsultas, setAvaliacaoConsultas] = useState([]);

  useEffect(() => {
    agendamentoService.getKpis().then(setKpis);
    agendamentoService.getGraficoDesempenhoSemanal().then(setDesempenhoSemanal);
    agendamentoService.getGraficoDistribuicaoHorario().then(setDistribuicaoHorario);

    agendamentoService.getGraficoAvaliacaoFuncionarios().then(setAvaliacaoFuncionarios);
    agendamentoService.getGraficoAvaliacaoConsultas().then(setAvaliacaoConsultas);
  }, []);

  const cancelamentos = kpis?.kpiCancelamentos?.[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

      <div>
        <h2>Dashboard de Agendamentos</h2>
        <p>Gestão e análise de consultas agendadas</p>
      </div>

      <div style={{ display: "flex", gap: "var(--gap-xl)" }}>
        <DataCard title="Agendamentos da semana" value={kpis?.kpiAgendamentosSemana ?? 0} />

        <DataCard title="Taxa de comparecimento" value={kpis?.kpiTaxaComparecimento ?? "0%"} />

        <DataCard title="Consultas realizadas" value={kpis?.kpiConsultasRealizadas ?? 0} />

        <DataCard
          title="Cancelamentos"
          value={cancelamentos?.qtdCanceladas ?? 0}
          subtitle={`${cancelamentos?.percentual ?? 0}%`}
        />
      </div>

      <div style={{ display: "flex", gap: "var(--gap-xl)" }}>
        <TitleCard title="Desempenho semanal">
          <PerformanceChart data={desempenhoSemanal} />
        </TitleCard>

        <TitleCard title="Distribuição por horário">
          <ConsultasChart data={distribuicaoHorario} />
        </TitleCard>
      </div>

      <div style={{ display: "flex", gap: "var(--gap-xl)" }}>
        <TitleCard title="Avaliações por profissional">
          <AvaliacaoChart data={avaliacaoFuncionarios} />
        </TitleCard>

        <TitleCard title="Avaliações por consulta">
          <AvaliacaoChart data={avaliacaoConsultas} />
        </TitleCard>
      </div>

    </div>
  );
}