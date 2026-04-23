import React, { useState, useRef, useEffect } from "react";
import { useConsultation } from '../../../../../data';
import { PsicologoTemplate } from "../../../../atomic/template";
import styles from "./styles.module.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const STATUS_OPTIONS = ["Confirmada", "Realizada", "Pendente", "Cancelada"];

const pacientes = [
  {
    id: 1,
    nome: "João da Silva",
    status: "Paciente Ativo",
    email: "joao@email.com",
    telefone: "(00) 99999-9999",
    foto: null,
    historico: [
      { data: "28/12/2025", psicologa: "Dra. Ana Souza", status: "Concluída" },
      { data: "21/12/2025", psicologa: "Dra. Ana Souza", status: "Concluída" },
      { data: "07/11/2025", psicologa: "Dra. Claudia Alves", status: "Concluída" },
      { data: "10/12/2025", psicologa: "Dra. Cilkeira Alves", status: "Cancelada" },
    ],
    testes: [
      { nome: "Teste de Depressão", datAplicacao: "20/07/2025", aplicador: "Dra. Ana Souza", status: "Válido" },
    ],
    arquivos: ["arquivo.jpeg"],
  },
  {
    id: 2,
    nome: "Marcelo Castro",
    status: "Paciente Ativo",
    email: "marcelo@email.com",
    telefone: "(11) 98888-7777",
    foto: null,
    historico: [
      { data: "28/12/2025", psicologa: "Dra. Ana Souza", status: "Concluída" },
    ],
    testes: [],
    arquivos: [],
  },
];

const statusSessaoClass = (status) => {
  if (status === "Confirmada") return styles.badgeConfirmada;
  if (status === "Realizada") return styles.badgeRealizada;
  if (status === "Pendente") return styles.badgePendente;
  if (status === "Cancelada") return styles.badgeCancelada;
  return styles.badgeConfirmada;
};

const StatusDropdown = ({ status, onChange }) => {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 6, left: rect.right - 140 });
    }
    setOpen((v) => !v);
  };

  return (
    <div className={styles.statusDropdownWrap}>
      <button
        ref={triggerRef}
        className={`${statusSessaoClass(status)} ${styles.statusDropdownTrigger}`}
        onClick={handleOpen}
        title="Alterar status"
      >
        {status}
        <KeyboardArrowDownIcon style={{ fontSize: 14, marginLeft: 2 }} />
      </button>
      {open && (
        <div
          ref={menuRef}
          className={styles.statusMenu}
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`${styles.statusMenuItem} ${opt === status ? styles.statusMenuItemActive : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              <span className={statusSessaoClass(opt)}>{opt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const statusHistoricoClass = (status) => {
  if (status === "Concluída") return styles.badgeConcluida;
  if (status === "Cancelada") return styles.badgeCancelada;
  return styles.badgeConcluida;
};

const MinhaAgenda = () => {

  const { 
    getNextsConsultations, 
    nextConsultations, 
    updateConsultationStatus, 
    getHistoricConsultations, 
    getPatientHistoricConsultations,
    patientHistoricConsultations,
    historicConsultations 
  } = useConsultation();

  const [expandido, setExpandido] = useState(false);
  const [sessoes, setSessoes] = useState([]);
  const [selectId, setSelectId] = useState(0);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(pacientes[0]);
  // const [arquivos, setArquivos] = useState(pacienteSelecionado.arquivos);
  const fileInputRef = useRef(null);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idFuncionario = usuario?.idFuncionario;

  useEffect(() => {
    getNextsConsultations(idFuncionario);
    getHistoricConsultations(idFuncionario);
  }, []);

  const pacientesUnicos = historicConsultations.reduce((acc, consulta) => {
    if (!acc.find((p) => p.id === consulta.idPaciente)) {
      acc.push({ id: consulta.idPaciente, nome: consulta.paciente });
    }
    return acc;
  }, []);

  const handlePacienteChange = (e) => {
    const id = Number(e.currentTarget.value);
    if (!id) {
      setSelectId(0);
      // setArquivos([]);
      setPacienteSelecionado(null);
      return;
    }
    setSelectId(id);
    const p = pacientesUnicos.find((p) => p.id === id);
    if (p) {
      setPacienteSelecionado(p);
      // setArquivos([]);
    }
  };

  useEffect(() => {
    if (selectId != 0) {
      getPatientHistoricConsultations(selectId);
    }
  },[selectId])

  useEffect(() => {
    if (nextConsultations.length > 0) {
      setSessoes(nextConsultations);
    } 
  }, [nextConsultations]);

  const handleStatusChange = async (id, novoStatus) => {
    // Vc vai ter que alterar +/- aqui jão, pq o que ele faz, quando ele tenta mudar o estado para confirmada pelo select, daria para ele plotar o chamado do zap aqui e dps continuar a requisição normalmente (Ele espera a API do back-end confirmar que realmente mudou)
    const statusAnterior = sessoes.find((s) => s.id === id)?.status;

    setSessoes((prev) => prev.map((s) => s.id === id ? { ...s, status: novoStatus } : s));

    try {
      await updateConsultationStatus(id, novoStatus);
    } catch {
      setSessoes((prev) => prev.map((s) => s.id === id ? { ...s, status: statusAnterior } : s));
    }
  };

  const sessoesExibidas = expandido ? sessoes : sessoes.slice(0, 4);

  const handleAnexar = (e) => {
    const files = Array.from(e.target.files).map((f) => f.name);
    setArquivos((prev) => [...prev, ...files]);
  };

  const handleRemoverArquivo = (index) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <PsicologoTemplate>
      <div className={styles.page}>
        {/* Greeting */}
        <h1 className={styles.greeting}>Saudações, {usuario?.nome}! 👋</h1>
        <p className={styles.subtitle}>Esta é sua agenda de atendimentos</p>

        {/* Próximas sessões */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Suas próximas sessões</h2>
            <button
              className={styles.expandBtn}
              onClick={() => setExpandido((v) => !v)}
            >
              {expandido ? (
                <><ExpandLessIcon fontSize="small" /> Recolher</>
              ) : (
                <><ExpandMoreIcon fontSize="small" /> Expandir</>
              )}
            </button>
          </div>

          <div className={styles.sessoesList}>
            {sessoesExibidas.map((s) => (
              <div key={s.id} className={styles.sessaoRow}>
                <div className={styles.sessaoData}>
                  <CalendarTodayIcon fontSize="inherit" />
                  <span>{s.data}</span>
                </div>
                <div className={styles.sessaoHorario}>
                  <AccessTimeIcon fontSize="inherit" />
                  <span>{s.horario}</span>
                </div>
                <div className={styles.sessaoDivider} />
                <div className={styles.sessaoPaciente}>
                  <PersonIcon fontSize="inherit" />
                  <span>{s.paciente}</span>
                </div>
                <div className={styles.sessaoTags}>
                  <span className={styles.badgeOnline}>{s.modalidade}</span>
                  <StatusDropdown
                    status={s.status}
                    onChange={(novoStatus) => handleStatusChange(s.id, novoStatus)}
                  />
                </div>
                <button className={styles.verPerfilBtn}>Ver perfil</button>
              </div>
            ))}
          </div>
        </section>
        <div className={styles.bottomGrid}>
          <div className={styles.leftCol}>
            {/* Select */}
            <div className={styles.card}>
              <label className={styles.selectLabel}>Selecione seu paciente</label>
              <select
                className={styles.pacienteSelect}
                value={selectId}  // usa direto o selectId, que começa em 0
                onChange={handlePacienteChange}
              >
                <option value={0}>Todos os pacientes</option>
                {pacientesUnicos.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>
            {
              selectId != 0 && (
                <>
                  <div className={styles.card}>
                    <div className={styles.pacienteInfo}>
                      <div className={styles.avatarCircle}>
                        {patientHistoricConsultations.foto ? (
                          <img src={patientHistoricConsultations.foto} alt={patientHistoricConsultations?.nome} />
                        ) : (
                          <PersonIcon style={{ fontSize: 40, color: "#D4789F" }} />
                        )}
                      </div>
                      <p className={styles.pacienteNome}>{patientHistoricConsultations[0]?.paciente}</p>
                      <span className={styles.badgeAtivo}>{patientHistoricConsultations?.status}</span>
                    </div>
    
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Email</label>
                      <div className={styles.fieldInput}>
                        <EmailIcon fontSize="small" className={styles.fieldIcon} />
                        <span>{patientHistoricConsultations[0]?.email}</span>
                      </div>
                    </div>
    
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Telefone</label>
                      <div className={styles.fieldInput}>
                        <PhoneIcon fontSize="small" className={styles.fieldIcon} />
                        <span>{patientHistoricConsultations[0]?.telefone}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Observações</h3>
                    <div className={styles.arquivosList}>
                      {/* {arquivos.map((arq, idx) => (
                        <div key={idx} className={styles.arquivoItem}>
                          <InsertDriveFileIcon fontSize="small" className={styles.arquivoIcon} />
                          <span className={styles.arquivoNome}>{arq}</span>
                          <button
                            className={styles.removerArqBtn}
                            onClick={() => handleRemoverArquivo(idx)}
                          >
                            <CloseIcon fontSize="inherit" />
                          </button>
                        </div>
                      ))}
                      {arquivos.length === 0 && (
                        <p className={styles.emptyArq}>Nenhum arquivo anexado.</p>
                      )} */}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      multiple
                      onChange={handleAnexar}
                    />
                    <button
                      className={styles.anexarBtn}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <AttachFileIcon fontSize="small" />
                      Anexar Arquivos
                    </button>
                  </div>
                </>
              )
            }
          </div>
          <div className={styles.rightCol}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Histórico de Consultas</h3>
              <div className={styles.historicoList}>
                {selectId != 0 ? patientHistoricConsultations.map((h, idx) => (
                  <div key={idx} className={styles.historicoRow}>
                    <div className={styles.historicoBadgeData}>
                      <CalendarTodayIcon fontSize="inherit" />
                      <span>{h.data}</span>
                    </div>
                    <span className={styles.historicoPsicologa}>{h.psicologa}</span>
                    <span className={statusHistoricoClass(h.status)}>{h.status}</span>
                  </div>
                )): historicConsultations.map((h, idx) => (
                  <div key={idx} className={styles.historicoRow}>
                    <div className={styles.historicoBadgeData}>
                      <CalendarTodayIcon fontSize="inherit" />
                      <span>{h.data}</span>
                    </div>
                    <span className={styles.historicoPsicologa}>{h.psicologa}</span>
                    <span className={statusHistoricoClass(h.status)}>{h.status}</span>
                  </div>))
                  }
                {selectId != 0 ? patientHistoricConsultations.length === 0 && (
                  <p className={styles.emptyText}>Nenhuma consulta registrada.</p>
                ) : historicConsultations.lenght === 0 && (
                  <p className={styles.emptyText}>Nenhuma consulta registrada.</p>
                )}
              </div>
            </div>
            {
              selectId != 0 && (
                <>               
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Testes Aplicados</h3>
                    <div className={styles.testesList}>
                      {/* {pacienteSelecionado.testes.map((t, idx) => (
                        <div key={idx} className={styles.testeRow}>
                          <div className={styles.testeInfo}>
                            <span className={styles.testeNome}>{t.nome}</span>
                            <span className={styles.testeDetalhe}>
                              Aplicado em: {t.datAplicacao} &nbsp;|&nbsp; Aplicado por: {t.aplicador}
                            </span>
                          </div>
                          <span className={styles.badgeValido}>{t.status}</span>
                        </div>
                      ))}
                      {pacienteSelecionado.testes.length === 0 && (
                        <p className={styles.emptyText}>Nenhum teste aplicado.</p>
                      )} */}
                    </div>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </PsicologoTemplate>
  );
};

export default MinhaAgenda;
