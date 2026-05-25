import { useEffect, useState } from "react";
import { DataCard, TitleCard } from "../../../../atomic/molecule";
import {
  ConsultasChart,
  PerformanceChart,
} from "../../../../atomic/organism";
import { AvaliacaoChart } from "../../../../atomic/organism/avaliacao-chart";
import { agendamentoService } from "../../../../../services/agendamentoService";

export default function DashboardAgendamentos() {
  const [kpis, setKpis] = useState(null);
  const [desempenhoSemanal, setDesempenhoSemanal] = useState([]);
  const [distribuicaoHorario, setDistribuicaoHorario] = useState([]);
  const [avaliacaoFuncionarios, setAvaliacaoFuncionarios] = useState([]);
  const [avaliacaoConsultas, setAvaliacaoConsultas] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const results = await Promise.allSettled([
          agendamentoService.getKpis(),
          agendamentoService.getGraficoDesempenhoSemanal(),
          agendamentoService.getGraficoDistribuicaoHorario(),
          agendamentoService.getGraficoAvaliacaoFuncionarios(),
          agendamentoService.getGraficoAvaliacaoConsultas(),
        ]);

        const [
          kpisRes,
          desempenhoRes,
          distribuicaoRes,
          avalFuncRes,
          avalConsultaRes,
        ] = results;

        const kpisData =
          kpisRes.status === "fulfilled" ? kpisRes.value : null;

        const desempenho =
          desempenhoRes.status === "fulfilled"
            ? desempenhoRes.value
            : [];

        const distribuicao =
          distribuicaoRes.status === "fulfilled"
            ? distribuicaoRes.value
            : [];

        const avalFunc =
          avalFuncRes.status === "fulfilled"
            ? avalFuncRes.value
            : [];

        const avalConsulta =
          avalConsultaRes.status === "fulfilled"
            ? avalConsultaRes.value
            : [];

        // 🔥 ADAPTER DESEMPENHO SEMANAL
        const desempenhoFormatado = (desempenho || []).map((item) => ({
          day: item.dia,
          agendadas: (item.confirmadas || 0) + (item.pendentes || 0),
          canceladas: item.canceladas || 0,
          realizadas: item.realizadas || 0,
        }));

        // 🔥 ADAPTER DISTRIBUIÇÃO HORÁRIO
        const distribuicaoFormatada = (distribuicao || []).map((item) => ({
          month: item.periodo,
          value: item.quantidade,
        }));

        const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

        const avalFuncFormatado = safeArray(avalFunc).map((item) => ({
          name: item.nome,
          media: item.mediaEstrelas,
        }));

        const avalConsultaFormatado = safeArray(avalConsulta).map((item, i) => ({
          name: `Consulta ${i + 1}`,
          cinco: item.cincoEstrelas,
          quatro: item.quatroEstrelas,
          tres: item.tresEstrelas,
          duas: item.duasEstrelas,
          uma: item.umaEstrela,
          zero: item.zeroEstrela,
        }));

        setKpis(kpisData);
        setDesempenhoSemanal(desempenhoFormatado);
        setDistribuicaoHorario(distribuicaoFormatada);
        setAvaliacaoFuncionarios(avalFuncFormatado);
        setAvaliacaoConsultas(avalConsultaFormatado);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      }
    }

    load();
  }, []);

  const cancelamentos = kpis?.kpiCancelamentos?.[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <div>
        <h2>Dashboard de Agendamentos</h2>
        <p>Gestão e análise de consultas agendadas</p>
      </div>

      {/* KPIs */}
      <div style={{ display: "flex", gap: "var(--gap-xl)" }}>
        <DataCard
          title="Agendamentos da semana"
          value={kpis?.kpiAgendamentosSemana ?? 0}
        />
        <DataCard
          title="Taxa de comparecimento"
          value={kpis?.kpiTaxaComparecimento ?? "0%"}
        />
        <DataCard
          title="Consultas realizadas"
          value={kpis?.kpiConsultasRealizadas ?? 0}
        />
        <DataCard
          title="Cancelamentos"
          value={cancelamentos?.qtdCanceladas ?? 0}
          subtitle={`${cancelamentos?.percentual ?? 0}%`}
        />
      </div>

      {/* GRÁFICOS PRINCIPAIS */}
      <div style={{ display: "flex", gap: "var(--gap-xl)" }}>
        <TitleCard title="Desempenho semanal">
          <PerformanceChart data={desempenhoSemanal} />
        </TitleCard>

        <TitleCard title="Distribuição por horário">
          <ConsultasChart data={distribuicaoHorario} />
        </TitleCard>
      </div>

      {/* AVALIAÇÕES */}
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