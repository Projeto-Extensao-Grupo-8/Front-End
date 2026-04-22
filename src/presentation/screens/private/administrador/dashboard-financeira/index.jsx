import { useEffect, useState } from "react";
import { financeiroService } from "../../../../../services/financeiroService";
import { DataCard, TitleCard } from "../../../../atomic/molecule";
import { SalesChart, ConsultasChart, BillingChart, FaturamentoChart, BillingChartFin } from "../../../../atomic/organism";
import InventoryIcon from '@mui/icons-material/Inventory';

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function DashboardFinanceira() {
  const [kpis, setKpis] = useState(null);
  const [consultasMes, setConsultasMes] = useState([]);
  const [faturamentoMensal, setFaturamentoMensal] = useState([]);
  const [comparacaoCusto, setComparacaoCusto] = useState([]);

  useEffect(() => {
    financeiroService.getKpis().then((data) => {
      console.log("KPIs:", data);
      setKpis(data);
    });

    financeiroService.getGraficoConsultasMes().then((data) => {
      console.log("Consultas:", data);
      setConsultasMes(data);
    });

    financeiroService.getGraficoFaturamentoMensal().then((data) => {
      console.log("Faturamento:", data);
      setFaturamentoMensal(data);
    });

    financeiroService.getGraficoComparacaoCusto().then((data) => {
      console.log("Comparação Custo:", data);
      setComparacaoCusto(data);
    });
  }, []);

  const melhorMes = kpis?.kpiMelhorFaturamentoAno?.[0];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "30px" }}>
        <div>
          <h2>Dashboard Financeiro</h2>
          <p>Visão geral do desempenho financeiro - Ano 2025</p>
        </div>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)" }}>
          <DataCard title={"Faturamento do mês"} value={"R$ " + kpis?.KpiFaturamentoMes + ",00"} Icon={InventoryIcon} />
          <DataCard title={"Melhor mês do ano"} value={MESES[(melhorMes?.mes ?? 1) - 1]} Icon={InventoryIcon} subtitle={"R$ " + melhorMes?.totalMes} />
          <DataCard title={"Faturamento do ano"} value={"R$ " + kpis?.KpiFaturamentoAno + ",00"} Icon={InventoryIcon} />
        </div>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)" }}>
          <TitleCard
            title="Faturamento mensal"
          >
            <FaturamentoChart data={faturamentoMensal} />
          </TitleCard>
          <TitleCard title="Número de consultas por mês">
            <ConsultasChart data={consultasMes} />
          </TitleCard>
        </div>
        <div>
          <TitleCard title="Comparação: Custos vs Receita">
            <BillingChartFin data={comparacaoCusto}/>
          </TitleCard>
        </div>
      </div>
    </>
  );
}