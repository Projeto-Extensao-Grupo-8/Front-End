import React, { useEffect, useRef, useState } from "react";
import { PsicologoTemplate } from "../../../../atomic/template";
import styles from "./styles.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useInfiniteScroll } from "../../../../../hooks";

const pacientes = [
  {
    id: 1,
    nome: "João da Silva",
    status: "Ativo",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    sessoes: 12,
    proximaSessao: "28/12/2025",
    ultimoTeste: "Teste de Ansiedade (BAI)",
    ultimoTesteData: "15/11/2025",
    observacoes: "Paciente apresenta boa evolução no tratamento de ansiedade.",
    testes: [
      { nome: "Teste de Ansiedade (BAI)", data: "15/11/2025", resultado: "" },
      { nome: "Inventário de Depressão (BDI)", data: "01/10/2025", resultado: "" },
      { nome: "Escala de Estresse Percebido", data: "15/09/2025", resultado: "" },
    ],
  },
  {
    id: 2,
    nome: "João da Silva",
    status: "Ativo",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    sessoes: 12,
    proximaSessao: "28/12/2025",
    ultimoTeste: "Teste de Ansiedade (BAI)",
    ultimoTesteData: "15/11/2025",
    observacoes: "Paciente apresenta boa evolução no tratamento de ansiedade.",
    testes: [
      { nome: "Teste de Ansiedade (BAI)", data: "15/11/2025", resultado: "" },
    ],
  },
  {
    id: 3,
    nome: "João da Silva",
    status: "Ativo",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    sessoes: 12,
    proximaSessao: "28/12/2025",
    ultimoTeste: "Teste de Ansiedade (BAI)",
    ultimoTesteData: "15/11/2025",
    observacoes: "Paciente apresenta boa evolução no tratamento de ansiedade.",
    testes: [],
  },
  {
    id: 4,
    nome: "João da Silva",
    status: "Ativo",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    sessoes: 12,
    proximaSessao: "28/12/2025",
    ultimoTeste: "Teste de Ansiedade (BAI)",
    ultimoTesteData: "15/11/2025",
    observacoes: "Paciente apresenta boa evolução no tratamento de ansiedade.",
    testes: [],
  },
  {
    id: 5,
    nome: "João da Silva",
    status: "Ativo",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    sessoes: 12,
    proximaSessao: "28/12/2025",
    ultimoTeste: "Teste de Ansiedade (BAI)",
    ultimoTesteData: "15/11/2025",
    observacoes: "Paciente apresenta boa evolução no tratamento de ansiedade.",
    testes: [],
  },
  {
    id: 6,
    nome: "João da Silva",
    status: "Ativo",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    sessoes: 12,
    proximaSessao: "28/12/2025",
    ultimoTeste: "Teste de Ansiedade (BAI)",
    ultimoTesteData: "15/11/2025",
    observacoes: "Paciente apresenta boa evolução no tratamento de ansiedade.",
    testes: [],
  },
  {
    id: 7,
    nome: "João da Silva",
    status: "Ativo",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    sessoes: 12,
    proximaSessao: "28/12/2025",
    ultimoTeste: "Teste de Ansiedade (BAI)",
    ultimoTesteData: "15/11/2025",
    observacoes: "Paciente apresenta boa evolução no tratamento de ansiedade.",
    testes: [],
  },
];

const testesDisponiveis = [
  "Teste de Ansiedade (BAI)",
  "Inventário de Depressão (BDI)",
  "Escala de Estresse Percebido",
  "Escala de Autoestima de Rosenberg",
  "Teste de Fobia Social (SPIN)",
];

const PacientesCard = ({ paciente, onClick }) => (
  <div className={styles.card} onClick={() => onClick(paciente)}>
    <div className={styles.cardHeader}>
      <div className={styles.cardAvatar}>
        <img src="/src/assets/logoCard.png" alt={paciente.nomeUsuario} />
        <span className={styles.onlineDot} />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>{paciente.nomeUsuario}</p>
        <span className={paciente.ativo ? styles.badgeAtivo : styles.badgeDesativado}>{paciente.ativo}</span>
      </div>
      <ChevronRightIcon className={styles.chevron} />
    </div>
    <div className={styles.cardContact}>
      <p><EmailIcon fontSize="inherit" /> {paciente.emailUsuario}</p>
      <p><PhoneIcon fontSize="inherit" /> {paciente.telefoneUsuario}</p>
    </div>
    <div className={styles.cardFooter}>
      <div className={styles.cardSessoes}>
        <ShowChartIcon fontSize="small" />
        <span>{paciente.qtdSessoes}</span>
        <span className={styles.sessLabel}>sessões</span>
      </div>
      <div className={styles.badgeData}>
        <CalendarTodayIcon fontSize="inherit" />
        <span>{paciente.dataProximaConsulta ?? "Retorno ainda não marcado"}</span>
      </div>
    </div>
  </div>
);

const ModalPaciente = ({ paciente, onClose }) => {
  const [tab, setTab] = useState("detalhes");
  const [novoTeste, setNovoTeste] = useState({ nome: "", observacoes: "" });

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
              <span className={styles.badgeAtivo}>{paciente.ativo}</span>
              <span className={styles.modalSessoes}>{paciente.qtdSessoes} sessões realizadas</span>
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
                  <p className={styles.infoValue}><EmailIcon fontSize="inherit" className={styles.infoIcon} /> {paciente.email}</p>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Telefone</span>
                  <p className={styles.infoValue}><PhoneIcon fontSize="inherit" className={styles.infoIcon} /> {paciente.telefone}</p>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Informações de Sessões</h3>
                <div className={styles.sessoesGrid}>
                  <div className={styles.sessaoCard}>
                    <span className={styles.sessaoLabel}>Total de Sessões</span>
                    <div className={styles.sessaoValue}>
                      <ShowChartIcon fontSize="small" />
                      <strong>{paciente.qtdSessoes}</strong>
                    </div>
                  </div>
                  <div className={`${styles.sessaoCard} ${styles.sessaoCardPurple}`}>
                    <span className={styles.sessaoLabel}>Próxima Sessão</span>
                    <div className={styles.sessaoValue}>
                      <CalendarTodayIcon fontSize="small" />
                      <strong>{paciente.dataProximaConsulta}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Último Teste Aplicado</h3>
                <div className={styles.testeItem}>
                  <ArticleIcon className={styles.testeIcon} />
                  <div>
                    <p className={styles.testeName}>{paciente.ultimoTeste}</p>
                    <p className={styles.testeData}>Aplicado em: {paciente.ultimoTesteData}</p>
                  </div>
                </div>
              </div>

              <div className={styles.infoSection}>
                <h3>Observações Clínicas</h3>
                <p className={styles.observacoes}>{paciente.observacoes}</p>
              </div>
            </>
          )}

          {tab === "testes" && (
            <div className={styles.testesList}>
              {paciente.testes.length === 0 ? (
                <p className={styles.emptyText}>Nenhum teste aplicado ainda.</p>
              ) : (
                paciente.testes.map((teste, idx) => (
                  <div key={idx} className={styles.testeCard}>
                    <ArticleIcon className={styles.testeIcon} />
                    <div>
                      <p className={styles.testeName}>{teste.nome}</p>
                      <p className={styles.testeData}><CalendarTodayIcon fontSize="inherit" /> {teste.data} {teste.resultado && `• ${teste.resultado}`}</p>
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
                <button className={styles.cancelarBtn} onClick={() => setNovoTeste({ nome: "", observacoes: "" })}>
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

const Pacientes = () => {
  
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idFuncionario = usuario?.idFuncionario;

  const { data, fetchNextPage, hasNextPage } = useInfiniteScroll({
    route: `/pacientes/funcionario/${idFuncionario}`,
    queryName: 'pacientes',
    limit: 20,
  });

  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [viewGrid, setViewGrid] = useState(true);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const pacientesFiltrados = data.length != 0 ? data.filter((p) => {
    const matchBusca =
      p.nomeUsuario.toLowerCase().includes(busca.toLowerCase()) ||
      p.emailUsuario.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro = filtro === "Todos" || p.ativo === (filtro == "true");
    return matchBusca && matchFiltro;
  }) : []; 

  return (
    <PsicologoTemplate>
      <div className={styles.page}>
        <h1 className={styles.title}>Meus Pacientes</h1>
        <p className={styles.subtitle}>Gerencie e acompanhe seus pacientes ativos</p>

        <hr className={styles.divider} />

        {/* Filters */}
        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <SearchIcon className={styles.searchIcon} fontSize="small" />
            <input
              type="text"
              placeholder="Buscar paciente por nome ou email..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterBox}>
            <FilterListIcon fontSize="small" />
            <select
              className={styles.filterSelect}
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option>Todos</option>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </div>

          <div className={styles.viewToggle}>
            <button
              className={viewGrid ? styles.viewBtnActive : styles.viewBtn}
              onClick={() => setViewGrid(true)}
            >
              <GridViewIcon fontSize="small" />
            </button>
            <button
              className={!viewGrid ? styles.viewBtnActive : styles.viewBtn}
              onClick={() => setViewGrid(false)}
            >
              <MenuIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className={viewGrid ? styles.grid : styles.list}>
          {pacientesFiltrados.map((p) => (
            <PacientesCard key={p.id} paciente={p} onClick={setPacienteSelecionado} />
          ))}
        </div>
        <div ref={sentinelRef} />
      </div>

      {pacienteSelecionado && (
        <ModalPaciente
          paciente={pacienteSelecionado}
          onClose={() => setPacienteSelecionado(null)}
        />
      )}
    </PsicologoTemplate>
  );
};

export default Pacientes;
