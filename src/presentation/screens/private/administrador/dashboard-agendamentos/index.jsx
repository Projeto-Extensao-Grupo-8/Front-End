// import { DataCard, TitleCard } from "../../../../atomic/molecule";
import { DataCard, TitleCard} from "../../../../atomic/molecule"
import { SalesChart, ConsultasChart, BillingChart, PerformanceChart } from "../../../../atomic/organism";

export default function DashboardAgendamentos() {
  return (
    <> 
      <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "30px"}}>
        <div>
          <h2>Dashboard de Agendamentos</h2>
          <p>Gestão e análise de consultas agendadas</p>
        </div>
        <div style={{display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)"}}>
          <DataCard title={"Agendamentos da semana"} value={"100"}/>
          <DataCard title={"Taxa de comparecimento"} value={"95.1%"} subtitle={"Acima da média"} variant={"positivo"}/>
          <DataCard title={"Consultas realizadas"} value={"86"} subtitle={"Esta semana"}/>
          <DataCard title={"Cancelamentos"} value={"13"} subtitle={"4.9% do total"}/>
        </div>
        <div style={{display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)"}}>
          <TitleCard title="Desempenho semanal">
            <PerformanceChart/>
          </TitleCard>
          <TitleCard title="Distribuição por horário">
            <ConsultasChart/>
          </TitleCard>
        </div>
        <div style={{display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)"}}>
          <TitleCard title="Avaliações dos profissionais por estrela "> 
            <ConsultasChart/>
          </TitleCard>
          <TitleCard title="Avaliações das consultas por estrela"> 
            <ConsultasChart/>
          </TitleCard>
        </div>
      </div>
    </>
  );
}