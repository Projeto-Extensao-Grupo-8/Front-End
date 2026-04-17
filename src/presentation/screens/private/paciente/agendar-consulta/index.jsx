import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClientTemplate } from "../../../../atomic/template";
import { StepIndicator, SelectableCard } from "../../../../atomic/molecule";
import { Button } from "../../../../atomic/atom/button";
import { api } from "../../../../../services/api";
import styles from "./styles.module.css";

const appointmentTypes = [
  { id: 1, title: "Terapia de Casal",        subtitle: "Duração: 50 min", enumKey: "TERAPIA_DE_CASAL" },
  { id: 2, title: "Psicologia Infantil",      subtitle: "Duração: 60 min", enumKey: "PSICOLOGIA_INFANTIL" },
  { id: 3, title: "Terapia Individual",       subtitle: "Duração: 50 min", enumKey: "TERAPIA_INDIVIDUAL" },
  { id: 4, title: "Avaliação Psicológica",    subtitle: "Duração: 60 min", enumKey: "AVALIACAO_PSICOLOGICA" },
  { id: 5, title: "Orientação Profissional",  subtitle: "Duração: 60 min", enumKey: "ORIENTACAO_PROFISSIONAL" },
];

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTH_NAMES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function getAvailableDates() {
  const dates = [];
  const today = new Date();
  let d = new Date(today);
  d.setHours(0, 0, 0, 0);
  while (dates.length < 6) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0) {
      dates.push({ date: new Date(d), disabled: day === 6 });
    }
  }
  return dates;
}

function buildDateTime(date, time) {
  const [hours, minutes] = time.split(":");
  const dt = new Date(date);
  dt.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  // Format as "YYYY-MM-DDTHH:mm:ss" without timezone offset
  const pad = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}:00`;
}

function getPriceForType(funcionario, enumKey) {
  if (!funcionario?.tiposAtendimento || funcionario.tiposAtendimento.length === 0) return null;
  const match = funcionario.tiposAtendimento.find((t) => t.tipoAtendimento === enumKey);
  if (match?.preco > 0) return match.preco;
  // Fallback: usa o primeiro preço válido disponível do funcionário
  const fallback = funcionario.tiposAtendimento.find((t) => t.preco > 0);
  return fallback?.preco ?? null;
}

function formatPrice(preco) {
  if (preco == null) return "—";
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Verifica se um horário está dentro de algum bloco de agendamento do funcionário
function isTimeInAgendamentos(time, agendamentos) {
  const [h, m] = time.split(":").map(Number);
  const timeMinutes = h * 60 + m;
  return agendamentos.some(({ inicioTempo, finalTempo }) => {
    const [ih, im] = inicioTempo.split(":").map(Number);
    const [fh, fm] = finalTempo.split(":").map(Number);
    return timeMinutes >= ih * 60 + im && timeMinutes < fh * 60 + fm;
  });
}

// Gera slots de 1h a partir do range da agenda, respeitando as janelas de atendimento
function generateSlotsFromAgendamentos(agendamentos) {
  if (!agendamentos || agendamentos.length === 0) return [];
  let dayStart = Infinity, dayEnd = -Infinity;
  agendamentos.forEach(({ inicioTempo, finalTempo }) => {
    const [ih, im] = inicioTempo.split(":").map(Number);
    const [fh, fm] = finalTempo.split(":").map(Number);
    dayStart = Math.min(dayStart, ih * 60 + im);
    dayEnd = Math.max(dayEnd, fh * 60 + fm);
  });
  const slots = [];
  for (let t = dayStart; t + 60 <= dayEnd; t += 60) {
    const timeStr = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
    if (isTimeInAgendamentos(timeStr, agendamentos)) slots.push(timeStr);
  }
  return slots;
}

const PsychProfileCard = ({ psych, selectedTypeEnumKey }) => {
  const price = getPriceForType(psych, selectedTypeEnumKey);
  return (
    <div className={styles.psychProfileCard}>
      <div className={styles.psychAvatar}></div>
      <h3 className={styles.psychProfileName}>Sobre {psych.nomeUsuario}</h3>
      <p className={styles.psychProfileCrp}>{psych.crp}</p>
      {psych.especialidade && (
        <div className={styles.psychProfileDetail}>
          <strong>Especialidade:</strong>
          <p>{psych.especialidade}</p>
        </div>
      )}
      {psych.descricao && (
        <div className={styles.psychProfileDetail}>
          <strong>Descrição:</strong>
          <p>{psych.descricao}</p>
        </div>
      )}
      {psych.formacaoAcademica && (
        <div className={styles.psychProfileDetail}>
          <strong>Formação Acadêmica:</strong>
          <p>{psych.formacaoAcademica}</p>
        </div>
      )}
      {psych.idiomasAtendidos && (
        <div className={styles.psychProfileDetail}>
          <strong>Idiomas atendidos:</strong>
          <p>{psych.idiomasAtendidos}</p>
        </div>
      )}
      {price != null && (
        <div className={styles.psychProfileDetail}>
          <strong>Valor da sessão:</strong>
          <p><span className={styles.price}>{formatPrice(price)}</span></p>
        </div>
      )}
    </div>
  );
};

const HintSidebar = () => (
  <>
    <div className={styles.infoBox}>
      <h2 className={styles.infoTitle}>
        <span className={styles.infoIcon}>ℹ️</span> Informações da Psicóloga
      </h2>
      <p className={styles.infoHint}>
        Selecione uma psicóloga na etapa 2 para ver suas informações completas aqui.
      </p>
    </div>
    <div className={styles.noteBox}>
      <h3 className={styles.noteTitle}>Informações Importantes</h3>
      <ul className={styles.noteList}>
        <li>⏰ Duração: Cada sessão tem 50 minutos</li>
        <li>💳 Pagamento: Pix, cartão ou dinheiro</li>
        <li>🔗 Online: Link enviado por email 1h antes</li>
        <li>📞 Dúvidas: (11) 99999-9999</li>
      </ul>
      <p className={styles.tip}>Dica: Chegue 5 minutos antes para atendimento presencial</p>
    </div>
  </>
);

export const AgendarConsulta = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedPsychologistId, setSelectedPsychologistId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [observations, setObservations] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastError, setToastError] = useState(false);

  const [psychologists, setPsychologists] = useState([]);
  const [loadingPsychs, setLoadingPsychs] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const availableDates = useMemo(() => getAvailableDates(), []);
  const selectedType = appointmentTypes.find((t) => t.id === selectedTypeId);
  const selectedPsych = psychologists.find((p) => p.idFuncionario === selectedPsychologistId);
  const totalSteps = 4;

  // Redireciona para login se não houver token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Busca a lista de funcionários ativos ao montar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingPsychs(true);
    api
      .get("/funcionarios/buscarPorStatus", { params: { ativo: true } })
      .then((res) => setPsychologists(res.data || []))
      .catch(() => setPsychologists([]))
      .finally(() => setLoadingPsychs(false));
  }, []);

  // Busca agenda e horários ocupados quando psicólogo + data estão selecionados
  useEffect(() => {
    if (!selectedPsychologistId || !selectedDate) {
      setAgendamentos([]);
      setHorariosOcupados([]);
      return;
    }
    const pad = (n) => String(n).padStart(2, "0");
    const dataStr = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;
    setLoadingSlots(true);
    Promise.all([
      api.get(`/agendamentos/funcionario/${selectedPsychologistId}`, { params: { data: dataStr } }),
      api.get(`/consultas/funcionario/${selectedPsychologistId}/horariosOcupados`, { params: { data: dataStr } }),
    ])
      .then(([agRes, ocRes]) => {
        setAgendamentos(agRes.data || []);
        setHorariosOcupados(ocRes.data || []);
      })
      .catch(() => {
        setAgendamentos([]);
        setHorariosOcupados([]);
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedPsychologistId, selectedDate]);

  const handleSelectPsychologist = (id) => {
    setSelectedPsychologistId(id);
    setSelectedDate(null);
    setSelectedTime(null);
    setAgendamentos([]);
    setHorariosOcupados([]);
  };

  const handleConfirm = async () => {
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario") || "{}");
    const idUsuario = usuarioLocal.id;

    if (!idUsuario) {
      showNotification("Você precisa estar logado para agendar.", true);
      return;
    }
    if (!selectedType || !selectedPsych || !selectedDate || !selectedTime) {
      showNotification("Preencha todas as etapas antes de confirmar.", true);
      return;
    }

    const preco = getPriceForType(selectedPsych, selectedType.enumKey);
    if (!preco || preco <= 0) {
      showNotification("Profissional sem valor configurado para este atendimento. Escolha outro profissional ou tipo.", true);
      return;
    }

    const body = {
      dataConsulta: buildDateTime(selectedDate, selectedTime),
      valorConsulta: preco,
      especialidade: selectedType.enumKey,
      tipo: selectedType.title,
      status: "PENDENTE",
      fkFuncionario: selectedPsych.idFuncionario,
      fkUsuario: idUsuario,
    };

    setSubmitting(true);
    try {
      await api.post("/consultas", body);
      showNotification("Pedido de agendamento criado!", false);
      setTimeout(() => navigate("/paciente/perfil"), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || "Erro ao agendar. Tente novamente.";
      showNotification(typeof msg === "string" ? msg : "Erro ao agendar. Tente novamente.", true);
    } finally {
      setSubmitting(false);
    }
  };

  const showNotification = (msg, isError) => {
    setToastMsg(msg);
    setToastError(isError);
    setShowToast(true);
    if (!isError) return; // success toast fecha via navigate
    setTimeout(() => setShowToast(false), 3000);
  };

  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const prev = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => s - 1);
  };

  const canAdvance = () => {
    if (step === 1) return selectedTypeId != null;
    if (step === 2) return selectedPsychologistId != null;
    if (step === 3) return selectedDate != null && selectedTime != null;
    return true;
  };

  const renderSidebar = () => {
    if (selectedPsych && step >= 2)
      return <PsychProfileCard psych={selectedPsych} selectedTypeEnumKey={selectedType?.enumKey} />;
    return <HintSidebar />;
  };

  const renderStep1 = () => (
    <>
      <h2 className={styles.stepHeading}>Qual tipo de Atendimento você precisa?</h2>
      <p className={styles.stepSubheading}>Selecione o serviço desejado</p>
      <div className={styles.optionsGrid}>
        {appointmentTypes.map((type) => (
          <SelectableCard
            key={type.id}
            title={type.title}
            subtitle={type.subtitle}
            selected={selectedTypeId === type.id}
            onClick={() => setSelectedTypeId(type.id)}
          />
        ))}
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2 className={styles.stepHeading}>Escolha sua psicóloga</h2>
      <p className={styles.stepSubheading}>
        Selecione a profissional que melhor atenda suas necessidades
      </p>
      {loadingPsychs ? (
        <p className={styles.stepSubheading}>Carregando profissionais...</p>
      ) : psychologists.length === 0 ? (
        <p className={styles.stepSubheading}>Nenhuma profissional disponível no momento.</p>
      ) : (
        <div className={styles.optionsGrid}>
          {psychologists.map((psych) => {
            const price = getPriceForType(psych, selectedType?.enumKey);
            return (
              <div
                key={psych.idFuncionario}
                className={`${styles.psychCard} ${selectedPsychologistId === psych.idFuncionario ? styles.psychCardSelected : ""}`}
                onClick={() => handleSelectPsychologist(psych.idFuncionario)}
              >
                <p className={styles.psychCardName}>{psych.nomeUsuario}</p>
                <p className={styles.psychCardSpecialty}>{psych.especialidade || "—"}</p>
                {price != null && (
                  <span className={styles.psychCardModality}>{formatPrice(price)}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const renderStep3 = () => {
    const generatedSlots = generateSlotsFromAgendamentos(agendamentos);
    const availableSlots = generatedSlots.filter((t) => !horariosOcupados.includes(t));

    return (
      <>
        <h2 className={styles.stepHeading}>Escolha data e horário</h2>
        <p className={styles.stepSubheading}>
          Selecione o dia e horário que melhor se adequa à sua rotina
        </p>
        <p className={styles.sectionLabel}>Datas disponíveis:</p>
        <div className={styles.datesGrid}>
          {availableDates.map((item, idx) => {
            const d = item.date;
            const label = `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
            const isSelected = selectedDate && selectedDate.getTime() === d.getTime();
            return (
              <button
                key={idx}
                className={`${styles.dateCard} ${item.disabled ? styles.dateCardDisabled : ""} ${isSelected ? styles.dateCardSelected : ""}`}
                onClick={() => {
                  if (!item.disabled) {
                    setSelectedDate(d);
                    setSelectedTime(null);
                  }
                }}
                disabled={item.disabled}
              >
                📅 {label}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <>
            <p className={styles.sectionLabel}>Horários disponíveis:</p>
            {loadingSlots ? (
              <p className={styles.stepSubheading}>Carregando horários...</p>
            ) : agendamentos.length === 0 ? (
              <p className={styles.stepSubheading}>Profissional sem agenda configurada para este dia.</p>
            ) : availableSlots.length === 0 ? (
              <p className={styles.stepSubheading}>Sem horários disponíveis para este dia.</p>
            ) : (
              <div className={styles.timesGrid}>
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    className={`${styles.timeCard} ${selectedTime === time ? styles.timeCardSelected : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    ⏰ {time}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </>
    );
  };

  const renderStep4 = () => {
    const typeName = selectedType?.title ?? "—";
    const psychName = selectedPsych?.nomeUsuario ?? "—";
    const psychSpecialty = selectedPsych?.especialidade ?? "";
    const price = getPriceForType(selectedPsych, selectedType?.enumKey);
    const dateTimeStr =
      selectedDate && selectedTime
        ? `${DAY_NAMES[selectedDate.getDay()]}, ${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]} às ${selectedTime}`
        : "—";

    return (
      <>
        <h2 className={styles.stepHeading}>Confirme seu agendamento</h2>
        <p className={styles.stepSubheading}>Revise as informações antes de confirmar</p>

        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryIconCircle}>📋</span>
            <div>
              <p className={styles.summaryLabel}>Tipo de Atendimento</p>
              <p className={styles.summaryValue}>{typeName}</p>
            </div>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryIconCircle}>👤</span>
            <div>
              <p className={styles.summaryLabel}>Psicóloga</p>
              <p className={styles.summaryValue}>{psychName}</p>
              {psychSpecialty && <p className={styles.summaryValueSub}>{psychSpecialty}</p>}
            </div>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryIconCircle}>📅</span>
            <div>
              <p className={styles.summaryLabel}>Data e Horário</p>
              <p className={styles.summaryValue}>{dateTimeStr}</p>
            </div>
          </div>
          {price != null && (
            <div className={styles.summaryRow}>
              <span className={styles.summaryIconCircle}>💳</span>
              <div>
                <p className={styles.summaryLabel}>Valor da Sessão</p>
                <p className={styles.summaryValue}>{formatPrice(price)}</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.observationsGroup}>
          <label className={styles.observationsLabel}>Observações (Opcional)</label>
          <textarea
            className={styles.observationsTextarea}
            placeholder="Compartilhe informações relevantes para a psicóloga..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            rows={4}
          />
        </div>
      </>
    );
  };

  const renderContent = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return null;
    }
  };

  return (
    <ClientTemplate>
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Agende sua Consulta</h1>
        <p className={styles.pageSubtitle}>Siga os passos abaixo para confirmar seu atendimento</p>

        <div className={styles.layout}>
          <div className={styles.mainCard}>
            <div className={styles.stepsWrapper}>
              <StepIndicator
                steps={["Tipo de Atendimento", "Psicólogo", "Data e Horário", "Confirmação"]}
                icons={["📋", "👤", "📅", "✓"]}
                current={step}
              />
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <div className={styles.content}>{renderContent()}</div>

            <div className={styles.navRow}>
              <Button text="← Voltar" variant="voltar" onClick={prev} disabled={submitting} />
              {step < totalSteps ? (
                <Button
                  text="Continuar >"
                  variant="ok"
                  onClick={next}
                  disabled={!canAdvance()}
                />
              ) : (
                <Button
                  text={submitting ? "Agendando..." : "✓ Confirmar Agendamento"}
                  variant="ok"
                  onClick={handleConfirm}
                  disabled={submitting}
                />
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>{renderSidebar()}</aside>
        </div>
      </div>

      {showToast && (
        <div className={`${styles.toast} ${toastError ? styles.toastError : ""}`}>
          {toastError ? "❌" : "✅"} {toastMsg}
        </div>
      )}
    </ClientTemplate>
  );
};
