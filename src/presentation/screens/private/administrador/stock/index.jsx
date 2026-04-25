import { Monitor, Package, AlertTriangle, Calendar } from "lucide-react";
import { Button } from "../../../../atomic/atom";
import { AdminTemplate } from "../../../../atomic/template";
import { DataCard, StockResume } from "../../../../atomic/molecule";
import { StockTable, TestModal } from "../../../../atomic/organism";
import { useState, useEffect, useCallback } from "react";
import { testeService } from "../../../../../services/testeService";

function formatarValidade(validade) {
  if (!validade) return "—";
  const [ano, mes, dia] = String(validade).split("-");
  return `${dia}/${mes}/${ano}`;
}

function mapearTestes(lista) {
  return lista.map((t) => ({
    ...t,
    quantidade: t.qtd,
    status: t.qtd <= t.estoqueMinimo ? "critico" : "ok",
    validadeISO: t.validade,
    validade: formatarValidade(t.validade),
  }));
}

export default function Stock() {
  const [kpisGestao, setKpisGestao] = useState(null);
  const [kpisResumo, setKpisResumo] = useState(null);
  const [testes, setTestes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testModalOpen, setTestModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [gestao, resumo, lista] = await Promise.all([
        testeService.getKpisGestao(),
        testeService.getKpisResumo(),
        testeService.listarTodos(),
      ]);
      setKpisGestao(gestao);
      setKpisResumo(resumo);
      setTestes(mapearTestes(lista));
    } catch (err) {
      console.error("Erro ao carregar estoque:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const testesDigitais = testes.filter((t) =>
    t.tipo?.toLowerCase().includes("digital")
  );
  const testesFisicos = testes.filter(
    (t) =>
      t.tipo?.toLowerCase().includes("fisic") ||
      t.tipo?.toLowerCase().includes("físic")
  );

  return (
    <AdminTemplate>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", margin: 0 }}>Gestão de Estoque</h1>
          <p style={{ fontSize: "15px", color: "#666", margin: "4px 0 0" }}>
            Gerencie seus testes psicológicos digitais e físicos
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          <DataCard
            title="Total de Testes Digitais"
            value={loading ? "..." : (kpisGestao?.buscarTotalUnidadesDigitais ?? "—")}
            Icon={Monitor}
            variant="default"
          />
          <DataCard
            title="Total de Testes Físicos"
            value={loading ? "..." : (kpisGestao?.buscarTotalUnidadesFisicas ?? "—")}
            Icon={Package}
            variant="default"
          />
          <DataCard
            title="Estoque Baixo/Crítico"
            value={loading ? "..." : (kpisGestao?.buscarQtdEstoqueCritico ?? "—")}
            Icon={AlertTriangle}
            subtitle="Atenção necessária"
            variant="negativo"
          />
          <DataCard
            title="Validade Próxima (90 dias)"
            value={loading ? "..." : (kpisGestao?.buscarQtdValidadeProxima90Dias ?? "—")}
            Icon={Calendar}
            subtitle="Renovar em breve"
            variant="negativo"
          />
        </div>

        <div>
          <Button
            text="+ Cadastrar Novo Teste"
            variant="cadastrarFunc"
            onClick={() => setTestModalOpen(true)}
          />
        </div>

        <StockResume
          valorTotal={loading ? null : kpisResumo?.buscarValorTotalEstoque}
          totalUnidades={loading ? "..." : (kpisResumo?.buscarTotalUnidadesAoTodo ?? "—")}
          tiposTestes={loading ? "..." : (kpisResumo?.buscarTotalTiposTestes ?? "—")}
        />

        <StockTable variant="digital" testes={testesDigitais} onSave={fetchData} />
        <StockTable variant="fisico" testes={testesFisicos} onSave={fetchData} />
      </div>

      {testModalOpen && (
        <TestModal
          onClose={() => setTestModalOpen(false)}
          onSuccess={() => {
            setTestModalOpen(false);
            fetchData();
          }}
        />
      )}
    </AdminTemplate>
  );
}
