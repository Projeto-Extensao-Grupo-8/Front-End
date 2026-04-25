import { useState, useEffect, useCallback } from "react";
import { Badge } from "../../../../atomic/atom";
import { DataCard, TitleCard } from "../../../../atomic/molecule";
import { SalesChart, ConsultasChart } from "../../../../atomic/organism";
import InventoryIcon from "@mui/icons-material/Inventory";
import RefreshIcon from "@mui/icons-material/Refresh";
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
  const [error, setError] = useState(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
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
      setUltimaAtualizacao(new Date());
    } catch (err) {
      console.error("Erro ao carregar dashboard de pacientes:", err);
      setError("Não foi possível carregar os dados. Verifique a conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [anoAtual]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatarMoeda = (valor) => {
    if (valor == null) return "—";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  };

  const formatarHora = (data) => {
    if (!data) return null;
    return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2>Dashboard de Pacientes</h2>
            <p>Análise demográfica e comportamental dos pacientes</p>
            {ultimaAtualizacao && (
              <p style={{ fontSize: "12px", color: "#aaa", marginTop: "4px" }}>
                Atualizado às {formatarHora(ultimaAtualizacao)}
              </p>
            )}
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              border: "1px solid var(--primary, #E1ABBA)",
              borderRadius: "8px",
              background: "transparent",
              color: "var(--primary, #E1ABBA)",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <RefreshIcon style={{ fontSize: "16px" }} />
            Atualizar
          </button>
        </div>

        {error && (
          <div style={{
            padding: "12px 16px",
            background: "#fff5f5",
            border: "1px solid #fc8181",
            borderRadius: "8px",
            color: "#c53030",
            fontSize: "14px",
          }}>
            {error}
          </div>
        )}

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
