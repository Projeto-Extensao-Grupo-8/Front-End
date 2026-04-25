import React, { useState, useEffect } from "react";
import { useConsultation, usePatient, usePsychologist, useAppointments } from '../../../../../data';
import { Button, BaseModal, DateTimeButton } from "../../../../atomic/atom";
import { PsicologoTemplate } from "../../../../atomic/template";
import { api } from "../../../../../services";
import styles from "./styles.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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
  const { getAppointmentsByPsychologistId, appointmentsByPsychologistId } = useAppointments();

  const {
    getMonthQuantityConsultationsByPsychologist,
    monthQuantityConsultationsByPsychologist,
    getNextsConsultations,
    nextConsultations,
  } = useConsultation();

  const {
    getActivePatientsByPsychologist,
    activePatientsByPsychologist,
  } = usePatient();

  const {
    getPsychologistById,
    psychologistById,
  } = usePsychologist();

  // ── Modais de visualização ──
  const [isEspecialidadeModalOpen, setIsEspecialidadeModalOpen] = useState(false);
  const [isTiposAtendimentoModalOpen, setIsTiposAtendimentoModalOpen] = useState(false);

  // ── Modal de edição de perfil ──
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editDraft, setEditDraft] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [sessoes, setSessoes] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idFuncionario = usuario?.idFuncionario;

  const chaveData = dataSelecionada
    ? `${dataSelecionada.getFullYear()}-${String(dataSelecionada.getMonth() + 1).padStart(2, "0")}-${String(dataSelecionada.getDate()).padStart(2, "0")}`
    : null;
  const horarios = chaveData ? (horariosData[chaveData] ?? []) : [];

  const labelData = dataSelecionada
    ? `${DIAS_SEMANA_FULL[dataSelecionada.getDay()]}, ${dataSelecionada.getDate()} de ${MESES[dataSelecionada.getMonth()]}`
    : "Nenhuma data selecionada";

  useEffect(() => {
    getMonthQuantityConsultationsByPsychologist(idFuncionario);
    getActivePatientsByPsychologist(idFuncionario);
    getPsychologistById(idFuncionario);
    getNextsConsultations(idFuncionario);
  }, []);

  useEffect(() => {
    if (nextConsultations.length > 0) {
      setSessoes(nextConsultations);
    }
  }, [nextConsultations]);

  useEffect(() => {
    getAppointmentsByPsychologistId(idFuncionario, dataSelecionada);
  }, [dataSelecionada]);

  /* ─── Abre o modal de edição já preenchido com dados da API ─── */
  const abrirModalEdicao = async () => {
    try {
      const response = await api.get(`/funcionarios/${idFuncionario}`);
      const responseUser = await api.get(`/usuarios/${response.data.idUsuario}`);

      setEditDraft({
        nome: response.data.nomeUsuario || "",
        email: response.data.emailUsuario || "",
        telefone: responseUser.data.telefone || "",
        crp: response.data.crp || "",
        dataNascimento: responseUser.data.dataNascimento
          ? responseUser.data.dataNascimento.split("T")[0]
          : "",
        cep: responseUser.data.endereco?.cep || "",
        estado: responseUser.data.endereco?.estado || "",
        cidade: responseUser.data.endereco?.cidade || "",
        bairro: responseUser.data.endereco?.bairro || "",
        logradouro: responseUser.data.endereco?.logradouro || "",
        complemento: responseUser.data.endereco?.complemento || "",
        numero: responseUser.data.endereco?.numero || "",
        idEndereco: responseUser.data.endereco?.idEndereco || "",
        especialidades: response.data.especialidades?.map((e) => e.nome) || [],
        idUsuario: response.data.idUsuario,
        senha: "",
        confirmarSenha: "",
      });

      setEditError("");
      setIsEditModalOpen(true);
    } catch (err) {
      console.error("Erro ao carregar dados para edição:", err);
    }
  };

  /* ─── Salva as alterações chamando a API ─── */
  const salvarEdicao = async () => {
    if (editDraft.senha && editDraft.senha !== editDraft.confirmarSenha) {
      setEditError("As senhas não coincidem.");
      return;
    }

    setEditLoading(true);
    setEditError("");

    try {
      const userData = {
        nomeUsuario: editDraft.nome,
        emailUsuario: editDraft.email,
        telefone: editDraft.telefone,
        dataNascimento: editDraft.dataNascimento,
        ...(editDraft.senha ? { senha: editDraft.senha } : {}),
        fkEndereco: {
          idEndereco: editDraft.idEndereco,
          cep: editDraft.cep,
          estado: editDraft.estado,
          cidade: editDraft.cidade,
          bairro: editDraft.bairro,
          logradouro: editDraft.logradouro,
          complemento: editDraft.complemento,
          numero: editDraft.numero,
        },
      };

      await api.patch(`/usuarios/${editDraft.idUsuario}`, userData);

      await api.patch(`/funcionarios/${idFuncionario}`, {
        crp: editDraft.crp,
        especialidades: editDraft.especialidades.map((nome) => ({ nome })),
      });

      setIsEditModalOpen(false);
      getPsychologistById(idFuncionario); // atualiza dados exibidos na tela
    } catch (err) {
      console.error("Erro ao salvar edição:", err);
      setEditError("Erro ao salvar. Tente novamente.");
    } finally {
      setEditLoading(false);
    }
  };

  /* ─── Helper para atualizar campo do draft ─── */
  const setField = (field) => (e) =>
    setEditDraft((prev) => ({ ...prev, [field]: e.target.value }));

  /* ─── Especialidades ─── */
  const adicionarEspecialidade = () =>
    setEditDraft((prev) => ({ ...prev, especialidades: [...(prev.especialidades || []), ""] }));

  const atualizarEspecialidade = (index, value) => {
    const updated = [...editDraft.especialidades];
    updated[index] = value;
    setEditDraft((prev) => ({ ...prev, especialidades: updated }));
  };

  const removerEspecialidade = (index) => {
    const updated = editDraft.especialidades.filter((_, i) => i !== index);
    setEditDraft((prev) => ({ ...prev, especialidades: updated }));
  };

  return (
    <>
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

                <p className={styles.nomePsicologo}>{usuario?.nome}</p>
                <span className={styles.badgeEspecialidade}>
                  {psychologistById?.especialidades?.[0]?.nome || "Psicólogo(a)"}
                </span>

                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <EmailIcon fontSize="small" className={styles.infoIcon} />
                    <span>{usuario?.email}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <PhoneIcon fontSize="small" className={styles.infoIcon} />
                    <span>{psychologistById?.telefone || "—"}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <BadgeIcon fontSize="small" className={styles.infoIcon} />
                    <span>{psychologistById?.crp || "—"}</span>
                  </div>
                </div>

                {/* Botão de editar agora chama abrirModalEdicao */}
                <button className={styles.editarBtn} onClick={abrirModalEdicao}>
                  <EditIcon fontSize="small" /> Editar Perfil
                </button>

                <div>
                  <Button text={"Especialidades"} onClick={() => setIsEspecialidadeModalOpen(true)} />
                  <Button text={"Tipos de atendimento"} onClick={() => setIsTiposAtendimentoModalOpen(true)} />
                </div>
              </div>

              {/* Stats card */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Estatísticas</h3>
                <div className={styles.statsList}>
                  <div className={`${styles.statItem} ${styles.statBlue}`}>
                    <PeopleIcon fontSize="small" />
                    <div className={styles.statInfo}>
                      <span className={styles.statLabel}>Pacientes Ativos</span>
                      <strong className={styles.statValue}>{activePatientsByPsychologist.length}</strong>
                    </div>
                  </div>
                  <div className={`${styles.statItem} ${styles.statGreen}`}>
                    <EventNoteIcon fontSize="small" />
                    <div className={styles.statInfo}>
                      <span className={styles.statLabel}>Sessões este mês</span>
                      <strong className={styles.statValue}>{monthQuantityConsultationsByPsychologist}</strong>
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
                  <DateTimeButton />
                </div>

                {sessoes.length === 0 ? (
                  <div className={styles.emptyState}>
                    <span>Nenhum agendamento marcado</span>
                  </div>
                ) : (
                  <div className={styles.agendamentosList}>
                    {sessoes.map((a) => (
                      <div key={a.id} className={styles.agendamentoRow}>
                        <div className={styles.agendamentoAvatar}>
                          <PersonIcon style={{ fontSize: 20, color: "#D4789F" }} />
                        </div>
                        <div className={styles.agendamentoInfo}>
                          <span className={styles.agendamentoPaciente}>{a.paciente}</span>
                          <span className={styles.agendamentoMeta}>
                            <CalendarTodayIcon style={{ fontSize: 11 }} /> {a.data}
                            &nbsp;&nbsp;
                            <AccessTimeIcon style={{ fontSize: 11 }} /> {a.horario}
                          </span>
                        </div>
                        <div className={styles.agendamentoBadges}>
                          <span className={modalidadeClass(a.modalidade)}>{a.modalidade}</span>
                          <span className={statusClass(a.status)}>{a.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PsicologoTemplate>

      {/* ── Modal: Especialidades ── */}
      <BaseModal isOpen={isEspecialidadeModalOpen} title="Especialidades" onClose={() => setIsEspecialidadeModalOpen(false)}>
        {psychologistById.especialidades?.length > 0 ? (
          psychologistById.especialidades.map((esp, index) => (
            <div key={index} className={styles.infoItem}>
              <BadgeIcon fontSize="small" className={styles.infoIcon} />
              <span>{esp.nome}</span>
            </div>
          ))
        ) : (
          <div className={styles.infoItem}>
            <BadgeIcon fontSize="small" className={styles.infoIcon} />
            <span>Nenhuma especialidade cadastrada</span>
          </div>
        )}
      </BaseModal>

      {/* ── Modal: Tipos de Atendimento ── */}
      <BaseModal isOpen={isTiposAtendimentoModalOpen} title="Tipos de Atendimento" onClose={() => setIsTiposAtendimentoModalOpen(false)}>
        {psychologistById.tiposAtendimentos?.length > 0 ? (
          psychologistById.tiposAtendimentos.map((esp, index) => (
            <div key={index} className={styles.infoItem}>
              <BadgeIcon fontSize="small" className={styles.infoIcon} />
              <span>{esp.tipoAtendimento} com valor de R${esp.preco}</span>
            </div>
          ))
        ) : (
          <div className={styles.infoItem}>
            <BadgeIcon fontSize="small" className={styles.infoIcon} />
            <span>Nenhum tipo de atendimento cadastrado</span>
          </div>
        )}
      </BaseModal>

      {/* ── Modal: Editar Perfil ── */}
      <BaseModal isOpen={isEditModalOpen} title="Editar Perfil" onClose={() => setIsEditModalOpen(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "360px", maxHeight: "70vh", overflowY: "auto", paddingRight: "4px" }}>

          {/* Dados Pessoais */}
          <fieldset style={{ border: "1px solid #f0d6e4", borderRadius: 10, padding: "14px 16px", margin: 0 }}>
            <legend style={{ fontWeight: 600, color: "#D4789F", padding: "0 6px" }}>Dados Pessoais</legend>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Nome</label>
                <input
                  className={styles.editInput}
                  value={editDraft.nome || ""}
                  onChange={setField("nome")}
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Email</label>
                <input
                  className={styles.editInput}
                  type="email"
                  value={editDraft.email || ""}
                  onChange={setField("email")}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Telefone</label>
                <input
                  className={styles.editInput}
                  value={editDraft.telefone || ""}
                  onChange={setField("telefone")}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Data de Nascimento</label>
                <input
                  className={styles.editInput}
                  type="date"
                  value={editDraft.dataNascimento || ""}
                  onChange={setField("dataNascimento")}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>CRP</label>
                <input
                  className={styles.editInput}
                  value={editDraft.crp || ""}
                  onChange={setField("crp")}
                  placeholder="00/000000"
                />
              </div>
            </div>
          </fieldset>

          {/* Endereço */}
          <fieldset style={{ border: "1px solid #f0d6e4", borderRadius: 10, padding: "14px 16px", margin: 0 }}>
            <legend style={{ fontWeight: 600, color: "#D4789F", padding: "0 6px" }}>Endereço</legend>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>CEP</label>
                <input
                  className={styles.editInput}
                  value={editDraft.cep || ""}
                  onChange={setField("cep")}
                  placeholder="00000-000"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Estado</label>
                  <input
                    className={styles.editInput}
                    value={editDraft.estado || ""}
                    onChange={setField("estado")}
                    placeholder="SP"
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Cidade</label>
                  <input
                    className={styles.editInput}
                    value={editDraft.cidade || ""}
                    onChange={setField("cidade")}
                    placeholder="São Paulo"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Bairro</label>
                <input
                  className={styles.editInput}
                  value={editDraft.bairro || ""}
                  onChange={setField("bairro")}
                  placeholder="Bairro"
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Logradouro</label>
                <input
                  className={styles.editInput}
                  value={editDraft.logradouro || ""}
                  onChange={setField("logradouro")}
                  placeholder="Rua, Avenida..."
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Número</label>
                  <input
                    className={styles.editInput}
                    value={editDraft.numero || ""}
                    onChange={setField("numero")}
                    placeholder="123"
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Complemento</label>
                  <input
                    className={styles.editInput}
                    value={editDraft.complemento || ""}
                    onChange={setField("complemento")}
                    placeholder="Apto, Bloco..."
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Especialidades */}
          <fieldset style={{ border: "1px solid #f0d6e4", borderRadius: 10, padding: "14px 16px", margin: 0 }}>
            <legend style={{ fontWeight: 600, color: "#D4789F", padding: "0 6px" }}>Especialidades</legend>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(editDraft.especialidades || []).map((esp, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    className={styles.editInput}
                    value={esp}
                    onChange={(e) => atualizarEspecialidade(i, e.target.value)}
                    placeholder="Nome da especialidade"
                    style={{ flex: 1, marginBottom: 0 }}
                  />
                  <button
                    onClick={() => removerEspecialidade(i)}
                    style={{
                      background: "none",
                      border: "1px solid #fca5a5",
                      borderRadius: 6,
                      color: "#ef4444",
                      cursor: "pointer",
                      padding: "4px 8px",
                      fontSize: 14,
                      lineHeight: 1,
                    }}
                    title="Remover"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={adicionarEspecialidade}
                style={{
                  background: "none",
                  border: "1px dashed #D4789F",
                  borderRadius: 8,
                  color: "#D4789F",
                  cursor: "pointer",
                  padding: "8px",
                  fontWeight: 600,
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                + Adicionar especialidade
              </button>
            </div>
          </fieldset>

          {/* Alterar Senha */}
          <fieldset style={{ border: "1px solid #f0d6e4", borderRadius: 10, padding: "14px 16px", margin: 0 }}>
            <legend style={{ fontWeight: 600, color: "#D4789F", padding: "0 6px" }}>
              Alterar Senha{" "}
              <span style={{ fontWeight: 400, fontSize: 12, color: "#9ca3af" }}>(opcional)</span>
            </legend>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Nova Senha</label>
                <input
                  className={styles.editInput}
                  type="password"
                  value={editDraft.senha || ""}
                  onChange={setField("senha")}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>Confirmar Nova Senha</label>
                <input
                  className={styles.editInput}
                  type="password"
                  value={editDraft.confirmarSenha || ""}
                  onChange={setField("confirmarSenha")}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </fieldset>

          {/* Mensagem de erro */}
          {editError && (
            <p style={{ color: "#ef4444", margin: 0, fontSize: 13, fontWeight: 500 }}>
              ⚠ {editError}
            </p>
          )}

          {/* Ações */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 4 }}>
            <button
              className={styles.cancelarBtn}
              onClick={() => setIsEditModalOpen(false)}
              disabled={editLoading}
            >
              Cancelar
            </button>
            <button
              className={styles.salvarBtn}
              onClick={salvarEdicao}
              disabled={editLoading}
            >
              {editLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>

        </div>
      </BaseModal>
    </>
  );
};

export default PerfilPsicologo;