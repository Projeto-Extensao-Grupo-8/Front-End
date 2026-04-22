import { useEffect, useState } from "react";
import { administrativaInicialService } from "../../../../../services/administrativaInicialService";
import { AdminTemplate } from "../../../../atomic/template";
import { AdministrativeDataCard, AdministrativeDoctorCard } from "../../../../atomic/molecule";
import { Badge, FilterSelect, LinkText } from "../../../../atomic/atom";
import { StockAlertNew } from "../../../../atomic/molecule/stock-alert-initial";
import { ResumoFinanceiroNew } from "../../../../atomic/organism/resume-chart-initial";

const formatBRL = (v) =>
  (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function Home() {
  const [qtdConsultasHoje, setQtdConsultasHoje]     = useState(null);
  const [pacientesAtivos, setPacientesAtivos]        = useState(null);
  const [faturamentoMes, setFaturamentoMes]          = useState(null);
  const [consultasDetalhadas, setConsultasDetalhadas] = useState([]);
  const [alertasEstoque, setAlertasEstoque]          = useState([]);
  const [resumoFinanceiro, setResumoFinanceiro]      = useState(null);
  const [filtroFuncionario, setFiltroFuncionario]    = useState("all");

  useEffect(() => {
    administrativaInicialService.getConsultasHoje().then(setQtdConsultasHoje);
    administrativaInicialService.getPacientesAtivos().then(setPacientesAtivos);
    administrativaInicialService.getFaturamentoMes().then(setFaturamentoMes);
    administrativaInicialService.getConsultasHojeDetalhadas().then(setConsultasDetalhadas);
    administrativaInicialService.getAlertasEstoque().then(setAlertasEstoque);
    administrativaInicialService.getResumoFinanceiro().then(setResumoFinanceiro);
  }, []);

  // Agrupa consultas por funcionário
  const consultasPorFuncionario = consultasDetalhadas.reduce((acc, consulta) => {
    const nome = consulta.nomeFuncionario;
    if (!acc[nome]) acc[nome] = [];
    acc[nome].push(consulta);
    return acc;
  }, {});

  const funcionarios = Object.entries(consultasPorFuncionario);

  const funcionariosFiltrados =
    filtroFuncionario === "all"
      ? funcionarios
      : funcionarios.filter(([nome]) => nome === filtroFuncionario);

  const opcoesFuncionarios = [
    { label: "Todos os psicólogos", value: "all" },
    ...funcionarios.map(([nome]) => ({ label: nome, value: nome })),
  ];

  return (
    <AdminTemplate>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "30px", padding: "32px" }}>

        <div style={{ display: "flex", width: "100%", alignItems: "start", justifyContent: "center", flexDirection: "column", borderBottom: "1px solid #e0e0e0", paddingBottom: "16px" }}>
          <h2>Bem-vinda de volta! <span>👋</span></h2>
          <p>Aqui está um resumo das atividades de hoje</p>
        </div>

        <div style={{ display: "flex", width: "100%", gap: "var(--gap-xl)" }}>
          <div style={{ flex: 1 }}>
            <AdministrativeDataCard title="Consultas de hoje" value={qtdConsultasHoje ?? "..."} />
          </div>
          <div style={{ flex: 1 }}>
            <AdministrativeDataCard title="Pacientes ativos" value={pacientesAtivos ?? "..."} />
          </div>
          <div style={{ flex: 1 }}>
            <AdministrativeDataCard title="Faturamento (mês)" value={faturamentoMes != null ? formatBRL(faturamentoMes) : "..."} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ whiteSpace: "nowrap" }}>Agenda do dia</h2>
            <div style={{ marginTop: "1px" }}>
              <Badge text={new Date().toLocaleDateString("pt-BR")} status="information" />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            {funcionariosFiltrados.length === 0 ? (
              <p style={{ color: "#888" }}>Nenhuma consulta encontrada para hoje.</p>
            ) : (
              funcionariosFiltrados.map(([nomeFuncionario, consultas]) => (
                <AdministrativeDoctorCard
                  key={nomeFuncionario}
                  doctorName={nomeFuncionario}
                  specialty={consultas[0]?.especialidade ?? ""}
                  appointments={consultas.map((c) => ({
                    startTime: new Date(c.dataConsulta).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                    endTime: new Date(new Date(c.dataConsulta).getTime() + 60 * 60 * 1000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                    patientName: c.nomePaciente,
                    action: <LinkText isActive={true} text="" />,
                  }))}
                />
              ))
            )}
          </div>

          <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            <StockAlertNew items={alertasEstoque} />
            <ResumoFinanceiroNew resumo={resumoFinanceiro} />
          </div>

        </div>
      </div>
    </AdminTemplate>
  );
}