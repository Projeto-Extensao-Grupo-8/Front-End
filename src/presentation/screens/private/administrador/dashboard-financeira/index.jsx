import { DataCard, TitleCard } from "../../../../atomic/molecule";
import { SalesChart, ConsultasChart, BillingChart } from "../../../../atomic/organism";
import { AdminTemplate } from "../../../../atomic/template";
import InventoryIcon from '@mui/icons-material/Inventory';

export default function DashboardFinanceira() {
  return (
    <> 
      <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "30px"}}>
        <div>
          <h2>Dashboard Financeiro</h2>
          <p>Visão geral do desempenho financeiro - Ano 2025</p>
        </div>
        <div style={{display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)"}}>
          <DataCard title={"Faturamento do mês"} value={"R$736k"} Icon={InventoryIcon}/>
          <DataCard title={"Melhor mês do ano"} value={"R$75k"} Icon={InventoryIcon} subtitle={"Dezembro"}/>
          <DataCard title={"Taxa de retenção média"} value={"R$736k"} Icon={InventoryIcon}/>
        </div>
        <div style={{display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)"}}>
          <TitleCard 
            title="Faturamento mensal"
            subtitle={"Percentual de pacientes que retornam"}
          >
          <SalesChart/>
          </TitleCard>
          <TitleCard title="Número de consultas por mês">
          <ConsultasChart/>
          </TitleCard>
        </div>
        <div>
          <TitleCard title="Comparação: Custos vs Receita"> 
            <BillingChart/>
          </TitleCard>
        </div>
      </div>
    </>
  );
}