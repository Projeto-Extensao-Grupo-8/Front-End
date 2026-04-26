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
import { useInfiniteScroll } from "../../../../../hooks";
import { usePatient, useStockMovement } from "../../../../../data";
import { useConsultation } from "../../../../../data";
import { ModalPatient } from "../../../../atomic/organism";

const PacientesCard = ({ paciente, onClick }) => (
  <div className={styles.card} onClick={() => onClick(paciente)}>
    <div className={styles.cardHeader}>
      <div className={styles.cardAvatar}>
        <img src="/src/assets/logoCard.png" alt={paciente.nomeUsuario} />
        <span className={styles.onlineDot} />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>{paciente.nomeUsuario}</p>
        <span className={paciente.ativo ? styles.badgeAtivo : styles.badgeDesativado}>
          {paciente.ativo ? "Ativo" : "Inativo"}
        </span>
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
        <span>{paciente.qtdSessoes ?? 0}</span>
        <span className={styles.sessLabel}>sessões</span>
      </div>
      <div className={styles.badgeData}>
        <CalendarTodayIcon fontSize="inherit" />
        <span>{paciente.dataProximaConsulta ?? "Retorno ainda não marcado"}</span>
      </div>
    </div>
  </div>
);

const Pacientes = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idFuncionario = usuario?.idFuncionario;

  const { data, fetchNextPage, hasNextPage } = useInfiniteScroll({
    route: `/pacientes/funcionario/${idFuncionario}`,
    queryName: 'pacientes',
    limit: 20,
  });

  const { getPatientById, patientById, clearPatient } = usePatient();

  const {
    getPatientHistoricConsultations,
    patientHistoricConsultations,
    getNextsConsultations,
    nextConsultations,
  } = useConsultation();

  const { getStockMovementByPsychologistId, stockMovementByPsychologistId } = useStockMovement();

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

  useEffect(() => {
    getStockMovementByPsychologistId(idFuncionario);
  }, []);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [viewGrid, setViewGrid] = useState(true);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const handleSelectPaciente = (paciente) => {
    clearPatient?.();
    setPacienteSelecionado(paciente);
    getPatientById(paciente.idPaciente);
    getPatientHistoricConsultations(paciente.idPaciente);
    getNextsConsultations(idFuncionario);
  };

  const handleClose = () => {
    clearPatient?.();
    setPacienteSelecionado(null);
  };

  const proximaConsulta = pacienteSelecionado
    ? nextConsultations?.find((c) => c.idPaciente === pacienteSelecionado.idPaciente) ?? null
    : null;

  const testesDoPaciente = pacienteSelecionado
    ? stockMovementByPsychologistId
        .filter((p) => p.idPaciente == pacienteSelecionado.idPaciente)
        ?.[0]?.infoTestes ?? []
    : [];

  const pacientesFiltrados = data.length !== 0 ? data.filter((p) => {
    const matchBusca =
      p.nomeUsuario.toLowerCase().includes(busca.toLowerCase()) ||
      p.emailUsuario.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro = filtro === "Todos" || p.ativo === (filtro === "true");
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
            <PacientesCard key={p.idPaciente} paciente={p} onClick={handleSelectPaciente} />
          ))}
        </div>
        <div ref={sentinelRef} />
      </div>

      {pacienteSelecionado && (
        <ModalPatient
          paciente={patientById ?? pacienteSelecionado}
          onClose={handleClose}
          historico={patientHistoricConsultations ?? []}
          proximaConsulta={proximaConsulta}
          testes={testesDoPaciente}
        />
      )}
    </PsicologoTemplate>
  );
};

export default Pacientes;