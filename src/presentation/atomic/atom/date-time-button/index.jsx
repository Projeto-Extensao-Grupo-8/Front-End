import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";
import { useState, useRef } from "react";
import { api } from "../../../../services";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DIAS = [
  "Segunda-feira", "Terça-feira", "Quarta-feira",
  "Quinta-feira", "Sexta-feira", "Sábado", "Domingo",
];

// DIAS[i] → getDay(): Segunda=1, ..., Sábado=6, Domingo=0
const diasSemanaParaGetDay = (diaIndex) => (diaIndex + 1) % 7;

const formatarHorario = (date) => {
  if (!date) return "";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const toPayloadTime = (date) => {
  if (!date) return "";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:00`;
};

const getDatasDoMes = (mesNome, diaNome) => {
  const mesIndex = MESES.indexOf(mesNome);
  const diaIndex = DIAS.indexOf(diaNome);
  const getdayAlvo = diasSemanaParaGetDay(diaIndex);

  const agora = new Date();
  let ano = agora.getFullYear();
  if (mesIndex < agora.getMonth()) ano++;

  const diasNoMes = new Date(ano, mesIndex + 1, 0).getDate();
  const datas = [];

  for (let d = 1; d <= diasNoMes; d++) {
    const data = new Date(ano, mesIndex, d);
    if (data.getDay() === getdayAlvo) {
      datas.push(data);
    }
  }

  return datas;
};

export const DateTimeButton = ({ onSalvar }) => {
  const [mes, setMes] = useState("");
  const [dia, setDia] = useState("");
  const [inicio, setInicio] = useState(null);
  const [fim, setFim] = useState(null);
  const [dividir, setDividir] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const refInicio = useRef(null);
  const refFim = useRef(null);

  const handleInicio = (date) => {
    setInicio(date);
    if (fim && fim <= date) setFim(null);
  };

  const handleSalvar = async () => {
    if (!mes || !dia || !inicio || !fim) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const idFuncionario = usuario?.idFuncionario;

    const datas = getDatasDoMes(mes, dia);

    if (datas.length === 0) {
      alert("Nenhuma data encontrada para o mês e dia selecionados.");
      return;
    }

    setSalvando(true);
    try {
      for (const data of datas) {
        const payload = {
          inicioTempo: toPayloadTime(inicio),
          finalTempo: toPayloadTime(fim),
          dataDia: data.toISOString().split("T")[0],
          idFuncionario,
          ...(dividir && { dividirEm: dividir }),
        };
        await api.post("/agendamentos", payload);
      }
      alert(`${datas.length} horário(s) cadastrado(s) com sucesso!`);
      if (onSalvar) onSalvar();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar horários. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const datasPreview = mes && dia ? getDatasDoMes(mes, dia) : [];

  return (
    <div className={styles.container}>

      {/* Mês */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Mês</label>
        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          >
            <option value="">Selecionar mês</option>
            {MESES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <span className={styles.chevron}>&#8964;</span>
        </div>
      </div>

      {/* Dia da semana */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Dia da semana</label>
        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={dia}
            onChange={(e) => setDia(e.target.value)}
          >
            <option value="">Selecionar dia da semana</option>
            {DIAS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <span className={styles.chevron}>&#8964;</span>
        </div>
      </div>

      {/* Preview das datas que serão criadas */}
      {datasPreview.length > 0 && (
        <div style={{ fontSize: 12, color: "#c0637f", background: "#fff0f5", borderRadius: 8, padding: "8px 12px" }}>
          {datasPreview.length} datas em {mes}: {datasPreview.map(d => d.getDate()).join(", ")}
        </div>
      )}

      {/* Horário de início */}
      <div
        className={styles.timePill}
        onClick={() => refInicio.current?.setOpen(true)}
      >
        <span className={styles.timePillIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
        <span className={styles.timePillLabel}>Início</span>
        <span className={`${styles.timePillValue} ${!inicio ? styles.timePillPlaceholder : ""}`}>
          {inicio ? formatarHorario(inicio) : "––:––"}
        </span>
        <DatePicker
          ref={refInicio}
          selected={inicio}
          onChange={handleInicio}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          customInput={<span style={{ display: "none" }} />}
        />
      </div>

      {/* Horário de término */}
      <div
        className={`${styles.timePill} ${!inicio ? styles.timePillDisabled : ""}`}
        onClick={() => inicio && refFim.current?.setOpen(true)}
      >
        <span className={styles.timePillIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="8" x2="16" y2="16" />
            <polyline points="12 8 12 12 14 14" />
          </svg>
        </span>
        <span className={styles.timePillLabel}>Término</span>
        <span className={`${styles.timePillValue} ${!fim ? styles.timePillPlaceholder : ""}`}>
          {fim ? formatarHorario(fim) : "––:––"}
        </span>
        <DatePicker
          ref={refFim}
          selected={fim}
          onChange={(date) => setFim(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          minTime={inicio ?? new Date(0, 0, 0, 0, 0)}
          maxTime={new Date(0, 0, 0, 23, 59)}
          disabled={!inicio}
          customInput={<span style={{ display: "none" }} />}
        />
      </div>

      {/* Dividir em */}
      <div className={styles.dividirRow}>
        <span className={styles.dividirLabel}>Dividir em:</span>
        <label className={styles.checkOption}>
          <input
            type="checkbox"
            className={styles.checkInput}
            checked={dividir === 30}
            onChange={() => setDividir(dividir === 30 ? null : 30)}
          />
          <span className={styles.checkBox} />
          <span className={styles.checkText}>30 min</span>
        </label>
        <label className={styles.checkOption}>
          <input
            type="checkbox"
            className={styles.checkInput}
            checked={dividir === 60}
            onChange={() => setDividir(dividir === 60 ? null : 60)}
          />
          <span className={styles.checkBox} />
          <span className={styles.checkText}>1 hora</span>
        </label>
      </div>

      <button className={styles.btnSalvar} type="button" onClick={handleSalvar} disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </button>
    </div>
  );
};
