import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";
import { useState, useRef } from "react";
import { useAppointments } from "../../../../data";

const formatarHorario = (date) => {
  if (!date) return "";
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
};

const toPayloadTime = (date) => {
  if (!date) return "";
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}:00`;
};

const formatarData = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const DateTimeButton = ({ onSalvar }) => {
  const { createAppointments } = useAppointments();

  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [inicio, setInicio] = useState(null);
  const [fim, setFim] = useState(null);
  const [dividir, setDividir] = useState(null);

  const refData = useRef(null);
  const refInicio = useRef(null);
  const refFim = useRef(null);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const handleInicio = (date) => {
    setInicio(date);
    if (fim && fim <= date) setFim(null);
  };

  const handleSalvar = () => {
    if (!dataSelecionada || !inicio || !fim) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const idFuncionario = usuario?.idFuncionario;

    const payload = {
      inicioTempo: toPayloadTime(inicio),
      finalTempo: toPayloadTime(fim),
      dataDia: dataSelecionada.toISOString().split("T")[0],
      idFuncionario,
      ...(dividir && { dividirEm: dividir }),
    };

    createAppointments(payload);
    if (onSalvar) onSalvar();
  };

  return (
    <div className={styles.container}>

      {/* Data */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Data</label>
        <div
          className={styles.timePill}
          style={{ borderRadius: 10, padding: "10px 14px" }}
          onClick={() => refData.current?.setOpen(true)}
        >
          <span className={styles.timePillIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span
            className={`${styles.timePillValue} ${!dataSelecionada ? styles.timePillPlaceholder : ""}`}
            style={{ marginLeft: 8, fontSize: 13, fontWeight: dataSelecionada ? 600 : 400 }}
          >
            {dataSelecionada ? formatarData(dataSelecionada) : "Selecionar data"}
          </span>
          <DatePicker
            ref={refData}
            selected={dataSelecionada}
            onChange={(date) => setDataSelecionada(date)}
            minDate={hoje}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            customInput={<span style={{ display: "none" }} />}
          />
        </div>
      </div>

      {/* Horário de início */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Horário de início</label>
        <div
          className={`${styles.timePill} ${!dataSelecionada ? styles.timePillDisabled : ""}`}
          onClick={() => dataSelecionada && refInicio.current?.setOpen(true)}
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
            disabled={!dataSelecionada}
            customInput={<span style={{ display: "none" }} />}
          />
        </div>
      </div>

      {/* Horário de término */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Horário de término</label>
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

      <button className={styles.btnSalvar} type="button" onClick={handleSalvar}>
        Salvar
      </button>
    </div>
  );
};
