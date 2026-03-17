import React, { useState, useRef, useEffect } from "react";
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

const sessoesIniciais = [
  { id: 1, data: "28/12/2025", horario: "10:00 - 11:00", paciente: "Junior das Neves", modalidade: "Online", status: "Confirmada" },
  { id: 2, data: "28/12/2025", horario: "11:30 - 12:00", paciente: "Marcelo Castro", modalidade: "Online", status: "Confirmada" },
  { id: 3, data: "28/12/2025", horario: "13:00 - 14:00", paciente: "Cláudia Oliveira", modalidade: "Online", status: "Confirmada" },
  { id: 4, data: "28/12/2025", horario: "10:00 - 11:00", paciente: "Mayara da Silva", modalidade: "Online", status: "Pendente" },
];

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

const MInhaAgenda = () => {
  const [expandido, setExpandido] = useState(false);
  const [sessoes, setSessoes] = useState(sessoesIniciais);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(pacientes[0]);
  const [arquivos, setArquivos] = useState(pacienteSelecionado.arquivos);
  const fileInputRef = useRef(null);

  const sessoesExibidas = expandido ? sessoes : sessoes.slice(0, 4);

  const handlePacienteChange = (e) => {
    const p = pacientes.find((p) => p.id === Number(e.target.value));
    if (p) {
      setPacienteSelecionado(p);
      setArquivos(p.arquivos);
    }
  };

  const handleAnexar = (e) => {
    const files = Array.from(e.target.files).map((f) => f.name);
    setArquivos((prev) => [...prev, ...files]);
  };

  const handleRemoverArquivo = (index) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStatusChange = (id, novoStatus) => {
    setSessoes((prev) => prev.map((s) => s.id === id ? { ...s, status: novoStatus } : s));
  };

  return (
    <PsicologoTemplate>
      <div className={styles.page}>
        {/* Greeting */}
        <h1 className={styles.greeting}>Saudações, Dra. Ana Souza! 👋</h1>
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

        {/* Bottom grid */}
        <div className={styles.bottomGrid}>
          {/* Left: Paciente */}
          <div className={styles.leftCol}>
            {/* Select */}
            <div className={styles.card}>
              <label className={styles.selectLabel}>Selecione seu paciente</label>
              <select
                className={styles.pacienteSelect}
                value={pacienteSelecionado.id}
                onChange={handlePacienteChange}
              >
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>

            {/* Patient info */}
            <div className={styles.card}>
              <div className={styles.pacienteInfo}>
                <div className={styles.avatarCircle}>
                  {pacienteSelecionado.foto ? (
                    <img src={pacienteSelecionado.foto} alt={pacienteSelecionado.nome} />
                  ) : (
                    <PersonIcon style={{ fontSize: 40, color: "#D4789F" }} />
                  )}
                </div>
                <p className={styles.pacienteNome}>{pacienteSelecionado.nome}</p>
                <span className={styles.badgeAtivo}>{pacienteSelecionado.status}</span>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Email</label>
                <div className={styles.fieldInput}>
                  <EmailIcon fontSize="small" className={styles.fieldIcon} />
                  <span>{pacienteSelecionado.email}</span>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Telefone</label>
                <div className={styles.fieldInput}>
                  <PhoneIcon fontSize="small" className={styles.fieldIcon} />
                  <span>{pacienteSelecionado.telefone}</span>
                </div>
              </div>
            </div>

            {/* Observações / Arquivos */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Observações</h3>
              <div className={styles.arquivosList}>
                {arquivos.map((arq, idx) => (
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
                )}
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
          </div>

          {/* Right: Histórico + Testes */}
          <div className={styles.rightCol}>
            {/* Histórico */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Histórico de Consultas</h3>
              <div className={styles.historicoList}>
                {pacienteSelecionado.historico.map((h, idx) => (
                  <div key={idx} className={styles.historicoRow}>
                    <div className={styles.historicoBadgeData}>
                      <CalendarTodayIcon fontSize="inherit" />
                      <span>{h.data}</span>
                    </div>
                    <span className={styles.historicoPsicologa}>{h.psicologa}</span>
                    <span className={statusHistoricoClass(h.status)}>{h.status}</span>
                  </div>
                ))}
                {pacienteSelecionado.historico.length === 0 && (
                  <p className={styles.emptyText}>Nenhuma consulta registrada.</p>
                )}
              </div>
            </div>

            {/* Testes */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Testes Aplicados</h3>
              <div className={styles.testesList}>
                {pacienteSelecionado.testes.map((t, idx) => (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PsicologoTemplate>
  );
};

export default MInhaAgenda;
