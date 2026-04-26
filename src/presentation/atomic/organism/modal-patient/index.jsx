import { useState } from "react";
import styles from "./styles.module.css";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";

export const ModalPatient = ({ paciente, onClose, historico, proximaConsulta, testes }) => {
  const [tab, setTab] = useState("detalhes");
  const [novoTeste, setNovoTeste] = useState({ nome: "", observacoes: "" });

  const testesDisponiveis = [
    "Teste de Ansiedade (BAI)",
    "Inventário de Depressão (BDI)",
    "Escala de Estresse Percebido",
    "Escala de Autoestima de Rosenberg",
    "Teste de Fobia Social (SPIN)",
  ];

  const handleRegistrar = () => {
    setNovoTeste({ nome: "", observacoes: "" });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalAvatar}>
            <img src="/src/assets/logoCard.png" alt={paciente.nomeUsuario} />
            <span className={styles.onlineDot} />
          </div>
          <div className={styles.modalPatientInfo}>
            <h2>{paciente.nomeUsuario}</h2>
            <div className={styles.modalMeta}>
              <span className={paciente.ativo ? styles.badgeAtivo : styles.badgeDesativado}>
                {paciente.ativo ? "Ativo" : "Inativo"}
              </span>
              <span className={styles.modalSessoes}>
                {historico.length} sessões realizadas
              </span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={tab === "detalhes" ? styles.tabActive : styles.tab}
            onClick={() => setTab("detalhes")}
          >
            Detalhes
          </button>
          <button
            className={tab === "testes" ? styles.tabActive : styles.tab}
            onClick={() => setTab("testes")}
          >
            Testes Aplicados
          </button>
          <button
            className={tab === "registrar" ? styles.tabActive : styles.tab}
            onClick={() => setTab("registrar")}
          >
            Registrar Teste
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.modalBody}>
          {tab === "detalhes" && (
            <>
              <div className={styles.infoSection}>
                <h3>Informações de Contato</h3>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>E-mail</span>
                  <p className={styles.infoValue}>
                    <EmailIcon fontSize="inherit" className={styles.infoIcon} /> {paciente.emailUsuario}
                  </p>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Telefone</span>
                  <p className={styles.infoValue}>
                    <PhoneIcon fontSize="inherit" className={styles.infoIcon} /> {paciente.telefoneUsuario}
                  </p>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Informações de Sessões</h3>
                <div className={styles.sessoesGrid}>
                  <div className={styles.sessaoCard}>
                    <span className={styles.sessaoLabel}>Total de Sessões</span>
                    <div className={styles.sessaoValue}>
                      <ShowChartIcon fontSize="small" />
                      <strong>{historico.length}</strong>
                    </div>
                  </div>
                  <div className={`${styles.sessaoCard} ${styles.sessaoCardPurple}`}>
                    <span className={styles.sessaoLabel}>Próxima Sessão</span>
                    <div className={styles.sessaoValue}>
                      <CalendarTodayIcon fontSize="small" />
                      <strong>
                        {proximaConsulta
                          ? `${proximaConsulta.data} ${proximaConsulta.horario}`
                          : "Não marcada"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Observações Clínicas</h3>
                <p className={styles.observacoes}>
                  {paciente.observacoes ?? "Sem observações registradas."}
                </p>
              </div>
            </>
          )}

          {tab === "testes" && (
            <div className={styles.testesList}>
              {!testes || testes.length === 0 ? (
                <p className={styles.emptyText}>Nenhum teste aplicado ainda.</p>
              ) : (
                testes.map((t, idx) => (
                  <div key={idx} className={styles.testeCard}>
                    <ArticleIcon className={styles.testeIcon} />
                    <div>
                      <p className={styles.testeName}>{t.nome}</p>
                      <p className={styles.testeData}>
                        <CalendarTodayIcon fontSize="inherit" /> Aplicado em: {t.datAplicacao}
                        {t.aplicador && ` • Por: ${t.aplicador}`}
                        {t.status && ` • ${t.status}`}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === "registrar" && (
            <div className={styles.registrarForm}>
              <h3>Registrar Novo Teste</h3>
              <div className={styles.formGroup}>
                <label>Nome do Teste *</label>
                <select
                  className={styles.select}
                  value={novoTeste.nome}
                  onChange={(e) => setNovoTeste((prev) => ({ ...prev, nome: e.target.value }))}
                >
                  <option value="">Selecione o teste aplicado</option>
                  {testesDisponiveis.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Observações *</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Descreva as observações clínicas sobre o teste aplicado..."
                  value={novoTeste.observacoes}
                  onChange={(e) => setNovoTeste((prev) => ({ ...prev, observacoes: e.target.value }))}
                  rows={5}
                />
              </div>
              <div className={styles.registrarActions}>
                <button
                  className={styles.cancelarBtn}
                  onClick={() => setNovoTeste({ nome: "", observacoes: "" })}
                >
                  Cancelar
                </button>
                <button className={styles.registrarBtn} onClick={handleRegistrar}>
                  <AddIcon fontSize="small" /> Registrar Teste
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
