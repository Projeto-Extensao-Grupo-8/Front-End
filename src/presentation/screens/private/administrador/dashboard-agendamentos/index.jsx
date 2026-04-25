import { useEffect, useState } from "react";
import { DataCard, TitleCard } from "../../../../atomic/molecule";
import { ConsultasChart, PerformanceChart } from "../../../../atomic/organism";
import { agendamentoService } from "../../../../../services/agendamentoService";

export default function DashboardAgendamentos() {
  const [kpis, setKpis] = useState(null);
  const [desempenhoSemanal, setDesempenhoSemanal] = useState([]);
  const [distribuicaoHorario, setDistribuicaoHorario] = useState([]);

  useEffect(() => {
    agendamentoService.getKpis().then((data) => {
      console.log("KPIs:", data);
      setKpis(data);
    });

    agendamentoService.getGraficoDesempenhoSemanal().then((data) => {
      console.log("Desempenho semanal:", data);
      setDesempenhoSemanal(data);
    });

    agendamentoService.getGraficoDistribuicaoHorario().then((data) => {
      console.log("Distribuição horário:", data);
      setDistribuicaoHorario(data);
    });
  }, []);

  const cancelamentos = kpis?.kpiCancelamentos?.[0];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "30px" }}>

        <div>
          <h2>Dashboard de Agendamentos</h2>
          <p>Gestão e análise de consultas agendadas</p>
        </div>

        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)" }}>
          
          <DataCard
            title={"Agendamentos da semana"}
            value={kpis?.kpiAgendamentosSemana}
          />

          <DataCard
            title={"Taxa de comparecimento"}
            value={kpis?.kpiTaxaComparecimento}
            variant={"positivo"}
          />

          <DataCard
            title={"Consultas realizadas"}
            value={kpis?.kpiConsultasRealizadas}
            subtitle={"Esta semana"}
          />

          <DataCard
            title={"Cancelamentos"}
            value={cancelamentos?.qtdCanceladas ?? 0}
            subtitle={`${cancelamentos?.percentual ?? 0}% do total`}
          />
        </div>

        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)" }}>
          
          <TitleCard title="Desempenho semanal">
            <PerformanceChart data={desempenhoSemanal} />
          </TitleCard>

          <TitleCard title="Distribuição por horário">
            <ConsultasChart data={distribuicaoHorario} />
          </TitleCard>
        </div>

        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)" }}>
          
          <TitleCard title="Avaliações dos profissionais por estrela">
            <ConsultasChart />
          </TitleCard>

          <TitleCard title="Avaliações das consultas por estrela">
            <ConsultasChart />
          </TitleCard>
        </div>

      </div>
    </>
  );
}