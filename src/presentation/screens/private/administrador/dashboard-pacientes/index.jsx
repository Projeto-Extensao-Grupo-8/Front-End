import { useState, useEffect } from "react";
import { Badge } from "../../../../atomic/atom";
import { DataCard, TitleCard } from "../../../../atomic/molecule";
import { SalesChart, ConsultasChart } from "../../../../atomic/organism";
import InventoryIcon from "@mui/icons-material/Inventory";
import { pacienteService } from "../../../../../services/pacienteService";

export default function DashboardPaciente() {
  const anoAtual = new Date().getFullYear();

  const [kpiAtivos, setKpiAtivos] = useState(null);
  const [kpiAno, setKpiAno] = useState(null);
  const [kpiRetencao, setKpiRetencao] = useState(null);
  const [graficoRetencao, setGraficoRetencao] = useState([]);
  const [graficoNovos, setGraficoNovos] = useState([]);
  const [top5, setTop5] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ativos, ano, retencao, grafRetencao, grafNovos, top5Data] = await Promise.all([
          pacienteService.getKpiAtivos(),
          pacienteService.getKpiAno(anoAtual),
          pacienteService.getKpiTaxaRetencao(),
          pacienteService.getGraficoRetencao(),
          pacienteService.getGraficoNovosPacientes(),
          pacienteService.getTop5(),
        ]);
        setKpiAtivos(ativos);
        setKpiAno(ano);
        setKpiRetencao(retencao);
        setGraficoRetencao(grafRetencao);
        setGraficoNovos(grafNovos);
        setTop5(top5Data);
      } catch (err) {
        console.error("Erro ao carregar dashboard de pacientes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [anoAtual]);

  const formatarMoeda = (valor) => {
    if (valor == null) return "—";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "30px" }}>
        <div>
          <h2>Dashboard de Pacientes</h2>
          <p>Análise demográfica e comportamental dos pacientes</p>
        </div>

        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)" }}>
          <DataCard
            title="Total de pacientes ativos"
            value={loading ? "..." : (kpiAtivos ?? "—")}
            Icon={InventoryIcon}
          />
          <DataCard
            title={`Novos pacientes (${anoAtual})`}
            value={loading ? "..." : (kpiAno ?? "—")}
            Icon={InventoryIcon}
          />
          <DataCard
            title="Taxa de retenção média"
            value={loading ? "..." : (kpiRetencao != null ? `${Number(kpiRetencao).toFixed(1)}%` : "—")}
            Icon={InventoryIcon}
          />
        </div>

        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)" }}>
          <TitleCard title="Taxa de Retenção Mensal" subtitle="Percentual de pacientes que retornam">
            <SalesChart data={graficoRetencao.length > 0 ? graficoRetencao : undefined} />
          </TitleCard>
          <TitleCard title="Novos Pacientes por Mês">
            <ConsultasChart data={graficoNovos.length > 0 ? graficoNovos : undefined} />
          </TitleCard>
        </div>

        <div>
          <TitleCard title="Top 5 pacientes" subtitle="Pacientes mais frequentes no ano">
            <table style={{ width: "100%", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--brancoBaseModal)" }}>
                  <th>Paciente</th>
                  <th>Consultas</th>
                  <th>Valor Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4}>Carregando...</td>
                  </tr>
                ) : top5.length === 0 ? (
                  <tr>
                    <td colSpan={4}>Nenhum dado disponível</td>
                  </tr>
                ) : (
                  top5.map((p, i) => (
                    <tr key={i}>
                      <td>{p.nomePaciente}</td>
                      <td>{p.consultas}</td>
                      <td>{formatarMoeda(p.valor)}</td>
                      <td>
                        <Badge text={p.ativo ? "Ativo" : "Inativo"} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TitleCard>
        </div>
      </div>
    </>
  );
}
