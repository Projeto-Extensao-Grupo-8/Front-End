import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";
import { useState, useRef } from "react";
import { useAppointments } from "../../../../data";

const formatarData = (date) => {
  if (!date) return "";
  return date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
};

export const DateTimeButton = () => {
    const { createAppointments } = useAppointments();
    const [inicio, setInicio] = useState(null);
    const [fim, setFim] = useState(null);

  const refInicio = useRef(null);
  const refFim = useRef(null);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  const calcularMaxTime = () => {
    if (!inicio) return new Date(0, 0, 0, 23, 59);
    const max = new Date(inicio);
    max.setHours(max.getHours() + 2);
    if (max.getDate() !== inicio.getDate()) return new Date(0, 0, 0, 23, 59);
    return max;
  };

  const handleInicio = (date) => {
    setInicio(date);
    if (fim) {
      const diff = (fim - date) / (1000 * 60 * 60);
      if (fim < date || diff > 2) setFim(null);
    }
  };

  const usuario = JSON.parse(localStorage.getItem("usuario"));
    const idFuncionario = usuario?.idFuncionario;

  const formatarHorario = (date) => {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}:00`;
};

const handleSalvar = () => {
  if (!inicio || !fim) {
    alert("Selecione o início e o fim!");
    return;
  }

  const payload = {
    inicioTempo: formatarHorario(inicio),  // "08:30:00"
    finalTempo: formatarHorario(fim),      // "10:30:00"
    dataDia: inicio.toISOString().split("T")[0],
      idFuncionario: idFuncionario,
    };

    createAppointments(payload);

  };

  return (
    <div className={styles.container}>

      <div onClick={() => refInicio.current.setOpen(true)}>
        <button className={styles.btnHorario} type="button">
          {inicio ? `🕐 ${formatarData(inicio)}` : "+ Adicionar Início"}
        </button>
        <DatePicker
          ref={refInicio}
          selected={inicio}
          onChange={handleInicio}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={amanha}
          customInput={<span />}
        />
      </div>

      <div onClick={() => !inicio && null || refFim.current.setOpen(true)}>
        <button
          className={styles.btnHorario}
          type="button"
          disabled={!inicio}
        >
          {fim ? `🕐 ${formatarData(fim)}` : "+ Adicionar Fim"}
        </button>
        <DatePicker
          ref={refFim}
          selected={fim}
          onChange={(date) => setFim(date)}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={inicio || amanha}
          maxDate={inicio}
          minTime={
            fim && inicio && fim.toDateString() === inicio.toDateString()
              ? inicio
              : new Date(0, 0, 0, 0, 0)
          }
          maxTime={calcularMaxTime()}
          disabled={!inicio}
          customInput={<span />}
        />
      </div>

      <button className={styles.btnSalvar} onClick={handleSalvar}>
        Salvar
      </button>

    </div>
  );
};