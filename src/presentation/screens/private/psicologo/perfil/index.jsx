import React, { useState } from "react";
import { PsicologoTemplate } from "../../../../atomic/template";
import styles from "./styles.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const DIAS_SEMANA = ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sá"];
const DIAS_SEMANA_FULL = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

const horariosData = {
  "2025-12-02": [
    { hora: "09:00", duracao: "45 min", disponivel: true },
    { hora: "10:00", duracao: "60 min", disponivel: true },
    { hora: "11:00", duracao: "30 min", disponivel: false },
    { hora: "14:00", duracao: "45 min", disponivel: true },
    { hora: "15:00", duracao: "60 min", disponivel: true },
    { hora: "16:00", duracao: "45 min", disponivel: false },
  ],
};

const agendamentosIniciais = [
  { id: 1, paciente: "João Silva", data: "01/12/2025", hora: "11:00", modalidade: "Online", status: "Confirmado" },
  { id: 2, paciente: "Maria Santos", data: "03/12/2025", hora: "10:00", modalidade: "Presencial", status: "Confirmado" },
  { id: 3, paciente: "Carlos Oliveira", data: "04/12/2025", hora: "17:00", modalidade: "Online", status: "Pendente" },
  { id: 4, paciente: "Ana Paula", data: "05/12/2025", hora: "10:00", modalidade: "Presencial", status: "Confirmado" },
];

const statusClass = (s) => {
  if (s === "Confirmado") return styles.badgeConfirmado;
  if (s === "Pendente") return styles.badgePendente;
  if (s === "Cancelado") return styles.badgeCancelado;
  return styles.badgeConfirmado;
};

const modalidadeClass = (m) => (m === "Online" ? styles.badgeOnline : styles.badgePresencial);

/* ─── Mini Calendar ─── */
const MiniCalendar = ({ selecionado, onChange }) => {
  const hoje = new Date();
  const [mes, setMes] = useState(selecionado ? selecionado.getMonth() : hoje.getMonth());
  const [ano, setAno] = useState(selecionado ? selecionado.getFullYear() : hoje.getFullYear());

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < primeiroDia; i++) cells.push(null);
  for (let d = 1; d <= diasNoMes; d++) cells.push(d);

  const navMes = (dir) => {
    let nm = mes + dir;
    let na = ano;
    if (nm < 0) { nm = 11; na--; }
    if (nm > 11) { nm = 0; na++; }
    setMes(nm);
    setAno(na);
  };

  const isSelecionado = (d) =>
    selecionado &&
    selecionado.getDate() === d &&
    selecionado.getMonth() === mes &&
    selecionado.getFullYear() === ano;

  const isHoje = (d) =>
    hoje.getDate() === d &&
    hoje.getMonth() === mes &&
    hoje.getFullYear() === ano;

  return (
    <div className={styles.calendar}>
      <div className={styles.calNav}>
        <button className={styles.calNavBtn} onClick={() => navMes(-1)}>
          <ChevronLeftIcon fontSize="small" />
        </button>
        <span className={styles.calMes}>{MESES[mes]} - {ano}</span>
        <button className={styles.calNavBtn} onClick={() => navMes(1)}>
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>

      <div className={styles.calGrid}>
        {DIAS_SEMANA.map((d, i) => (
          <span key={i} className={styles.calDiaSemana}>{d}</span>
        ))}
        {cells.map((d, i) =>
          d === null ? (
            <span key={`empty-${i}`} />
          ) : (
            <button
              key={d}
              className={[
                styles.calDia,
                isSelecionado(d) ? styles.calDiaSelecionado : "",
                isHoje(d) && !isSelecionado(d) ? styles.calDiaHoje : "",
              ].join(" ")}
              onClick={() => onChange(new Date(ano, mes, d))}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
};

/* ─── Main Page ─── */
const PerfilPsicologo = () => {
  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState({
    nome: "Dra. Ana Souza",
    especialidade: "Terapia Cognitivo-Comportamental",
    email: "ana.souza@flor-de-lotus.com",
    telefone: "(21) 98765-4321",
    crp: "06/123456",
  });
  const [draft, setDraft] = useState(perfil);

  const [dataSelecionada, setDataSelecionada] = useState(new Date(2025, 11, 2));
  const [agendamentos] = useState(agendamentosIniciais);

  const chaveData = dataSelecionada
    ? `${dataSelecionada.getFullYear()}-${String(dataSelecionada.getMonth() + 1).padStart(2, "0")}-${String(dataSelecionada.getDate()).padStart(2, "0")}`
    : null;
  const horarios = chaveData ? (horariosData[chaveData] ?? []) : [];

  const labelData = dataSelecionada
    ? `${DIAS_SEMANA_FULL[dataSelecionada.getDay()]}, ${dataSelecionada.getDate()} de ${MESES[dataSelecionada.getMonth()]}`
    : "Nenhuma data selecionada";

  const salvarPerfil = () => {
    setPerfil(draft);
    setEditando(false);
  };

  return (
    <PsicologoTemplate>
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Meu Perfil</h1>
        <p className={styles.pageSubtitle}>Gerencie suas informações profissionais e horários de atendimento</p>

        <div className={styles.mainGrid}>
          {/* ── Left col ── */}
          <div className={styles.leftCol}>
            {/* Profile card */}
            <div className={styles.card}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatarCircle}>
                  <PersonIcon style={{ fontSize: 56, color: "#D4789F" }} />
                </div>
              </div>

              {editando ? (
                <div className={styles.editForm}>
                  <input
                    className={styles.editInput}
                    value={draft.nome}
                    onChange={(e) => setDraft((p) => ({ ...p, nome: e.target.value }))}
                    placeholder="Nome"
                  />
                  <input
                    className={styles.editInput}
                    value={draft.especialidade}
                    onChange={(e) => setDraft((p) => ({ ...p, especialidade: e.target.value }))}
                    placeholder="Especialidade"
                  />
                  <input
                    className={styles.editInput}
                    value={draft.email}
                    onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))}
                    placeholder="E-mail"
                  />
                  <input
                    className={styles.editInput}
                    value={draft.telefone}
                    onChange={(e) => setDraft((p) => ({ ...p, telefone: e.target.value }))}
                    placeholder="Telefone"
                  />
                  <input
                    className={styles.editInput}
                    value={draft.crp}
                    onChange={(e) => setDraft((p) => ({ ...p, crp: e.target.value }))}
                    placeholder="CRP"
                  />
                  <div className={styles.editActions}>
                    <button className={styles.cancelarBtn} onClick={() => { setDraft(perfil); setEditando(false); }}>
                      Cancelar
                    </button>
                    <button className={styles.salvarBtn} onClick={salvarPerfil}>
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={styles.nomePsicologo}>{perfil.nome}</p>
                  <span className={styles.badgeEspecialidade}>{perfil.especialidade}</span>

                  <div className={styles.infoList}>
                    <div className={styles.infoItem}>
                      <EmailIcon fontSize="small" className={styles.infoIcon} />
                      <span>{perfil.email}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <PhoneIcon fontSize="small" className={styles.infoIcon} />
                      <span>{perfil.telefone}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <BadgeIcon fontSize="small" className={styles.infoIcon} />
                      <span>{perfil.crp}</span>
                    </div>
                  </div>

                  <button className={styles.editarBtn} onClick={() => { setDraft(perfil); setEditando(true); }}>
                    <EditIcon fontSize="small" /> Editar Perfil
                  </button>
                </>
              )}
            </div>

            {/* Stats card */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Estatísticas</h3>
              <div className={styles.statsList}>
                <div className={`${styles.statItem} ${styles.statBlue}`}>
                  <PeopleIcon fontSize="small" />
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Pacientes Ativos</span>
                    <strong className={styles.statValue}>84</strong>
                  </div>
                </div>
                <div className={`${styles.statItem} ${styles.statGreen}`}>
                  <EventNoteIcon fontSize="small" />
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Sessões este mês</span>
                    <strong className={styles.statValue}>127</strong>
                  </div>
                </div>
                <div className={`${styles.statItem} ${styles.statPurple}`}>
                  <WorkspacePremiumIcon fontSize="small" />
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Anos de Experiência</span>
                    <strong className={styles.statValue}>10+</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right col ── */}
          <div className={styles.rightCol}>
            {/* Calendar + horários */}
            <div className={styles.card}>
              <div className={styles.cardTitleRow}>
                <CalendarTodayIcon fontSize="small" className={styles.cardTitleIcon} />
                <h3 className={styles.cardTitle}>Selecione Data e Horário</h3>
              </div>

              <MiniCalendar selecionado={dataSelecionada} onChange={setDataSelecionada} />

              <p className={styles.horariosLabel}>
                Horários disponíveis para <strong>{labelData}</strong>
              </p>

              {horarios.length === 0 ? (
                <p className={styles.emptyText}>Nenhum horário cadastrado para este dia.</p>
              ) : (
                <div className={styles.horariosGrid}>
                  {horarios.map((h, i) => (
                    <div
                      key={i}
                      className={`${styles.horarioCard} ${!h.disponivel ? styles.horarioIndisponivel : ""}`}
                    >
                      <AccessTimeIcon fontSize="small" className={styles.horarioIcon} />
                      <span className={styles.horarioHora}>{h.hora}</span>
                      <span className={styles.horarioDuracao}>{h.duracao}</span>
                      {!h.disponivel && <span className={styles.horarioTag}>indisponível</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Agendamentos */}
            <div className={styles.card}>
              <div className={styles.agendamentosHeader}>
                <div className={styles.cardTitleRow}>
                  <CalendarTodayIcon fontSize="small" className={styles.cardTitleIcon} />
                  <h3 className={styles.cardTitle}>Próximos Agendamentos</h3>
                </div>
                <button className={styles.adicionarBtn}>
                  <AddIcon fontSize="small" /> Adicionar Horário
                </button>
              </div>

              <div className={styles.agendamentosList}>
                {agendamentos.map((a) => (
                  <div key={a.id} className={styles.agendamentoRow}>
                    <div className={styles.agendamentoAvatar}>
                      <PersonIcon style={{ fontSize: 20, color: "#D4789F" }} />
                    </div>
                    <div className={styles.agendamentoInfo}>
                      <span className={styles.agendamentoPaciente}>{a.paciente}</span>
                      <span className={styles.agendamentoMeta}>
                        <CalendarTodayIcon style={{ fontSize: 11 }} /> {a.data}
                        &nbsp;&nbsp;
                        <AccessTimeIcon style={{ fontSize: 11 }} /> {a.hora}
                      </span>
                    </div>
                    <div className={styles.agendamentoBadges}>
                      <span className={modalidadeClass(a.modalidade)}>{a.modalidade}</span>
                      <span className={statusClass(a.status)}>{a.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PsicologoTemplate>
  );
};

export default PerfilPsicologo;
