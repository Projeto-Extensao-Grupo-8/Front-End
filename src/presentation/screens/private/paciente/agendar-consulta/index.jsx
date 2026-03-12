import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ClientTemplate } from "../../../../atomic/template";
import { StepIndicator, SelectableCard } from "../../../../atomic/molecule";
import { Button } from "../../../../atomic/atom/button";
import styles from "./styles.module.css";

const appointmentTypes = [
  { id: 1, title: "Terapia de Casal", subtitle: "Duração: 50 min" },
  { id: 2, title: "Psicologia Infantil", subtitle: "Duração: 60 min" },
  { id: 3, title: "Terapia Individual", subtitle: "Duração: 50 min" },
  { id: 4, title: "Avaliação Psicológica", subtitle: "Duração: 60 min" },
  { id: 5, title: "Psicologia Infantil", subtitle: "Duração: 50 min" },
  { id: 6, title: "Orientação Profissional", subtitle: "Duração: 60 min" },
];

const psychologists = [
  {
    id: 1,
    name: "Dra. Ana Souza",
    crp: "CRP 06/34567",
    specialty: "TCC, Ansiedade, Depressão",
    description: "Especialista em terapia cognitivo-comportamental com foco em transtornos de ansiedade e depressão.",
    formation: "Psicologia pela USP | Especialização em TCC",
    languages: "Português",
    session_price: "R$ 180,00",
    modality: "Presencial",
  },
  {
    id: 2,
    name: "Dra. Beatriz Souza",
    crp: "CRP 06/34567",
    specialty: "Psicologia Infantil, Autismo, Trauma Interpessoal",
    description: "Dedicada ao atendimento infantil e familiar, com formação especializada em TEA.",
    formation: "Psicologia pela UNICAMP | Especialização em Autismo",
    languages: "Português, Espanhol",
    session_price: "R$ 200,00",
    modality: "Presencial",
  },
  {
    id: 3,
    name: "Gra. Solange Lopes",
    crp: "CRP 06/34567",
    specialty: "Ansiedade, Autoconhecimento",
    description: "Atendimento humanizado com foco em acompanhamento contínuo e bem-estar emocional.",
    formation: "Psicologia pela PUC | Especialização em Saúde Mental",
    languages: "Português, Inglês",
    session_price: "R$ 150,00",
    modality: "Online/Presencial",
  },
  {
    id: 4,
    name: "Dra. Ana Paula Ferreira",
    crp: "CRP 06/34567",
    specialty: "Estresse, TPM, Ansiedade",
    description: "Profissional com experiência em tratamento de transtornos de ansiedade e estresse.",
    formation: "Psicologia pela UFRJ | Especialização em Ansiedade",
    languages: "Português, Francês",
    session_price: "R$ 170,00",
    modality: "Online/Presencial",
  },
  {
    id: 5,
    name: "Dra. Ana Souza",
    crp: "CRP 06/34567",
    specialty: "Psicologia Infantil, Autismo",
    description: "Dedicada ao atendimento infantil com especialização em transtornos do espectro autista.",
    formation: "Psicologia pela UNIFESP | Especialização em TEA",
    languages: "Português, Espanhol",
    session_price: "R$ 190,00",
    modality: "Online/Presencial",
  },
];

const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
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

const PsychProfileCard = ({ psych }) => (
  <div className={styles.psychProfileCard}>
    <div className={styles.psychAvatar}></div>
    <h3 className={styles.psychProfileName}>Sobre {psych.name}</h3>
    <p className={styles.psychProfileCrp}>{psych.crp}</p>
    <div className={styles.psychProfileDetail}>
      <strong>Especialidade:</strong>
      <p>{psych.specialty}.</p>
    </div>
    <div className={styles.psychProfileDetail}>
      <strong>Descrição:</strong>
      <p>{psych.description}</p>
    </div>
    <div className={styles.psychProfileDetail}>
      <strong>Formação Acadêmica:</strong>
      <p>{psych.formation}</p>
    </div>
    <div className={styles.psychProfileDetail}>
      <strong>Idiomas atendidos:</strong>
      <p>{psych.languages}.</p>
    </div>
    <div className={styles.psychProfileDetail}>
      <strong>Informações práticas:</strong>
      <p>Valor da sessão <span className={styles.price}>{psych.session_price}</span></p>
      <p>Modalidade: {psych.modality}</p>
    </div>
  </div>
);

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
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [observations, setObservations] = useState("");
  const [showToast, setShowToast] = useState(false);

  const availableDates = useMemo(() => getAvailableDates(), []);
  const selectedPsych = psychologists.find((p) => p.id === selectedPsychologist);
  const totalSteps = 4;

  const handleConfirm = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/paciente/perfil");
    }, 2000);
  };

  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const prev = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => s - 1);
  };

  const renderSidebar = () => {
    if (selectedPsych && step >= 2) return <PsychProfileCard psych={selectedPsych} />;
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
            selected={selectedType === type.id}
            onClick={() => setSelectedType(type.id)}
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
      <div className={styles.optionsGrid}>
        {psychologists.map((psych) => (
          <div
            key={psych.id}
            className={`${styles.psychCard} ${selectedPsychologist === psych.id ? styles.psychCardSelected : ""}`}
            onClick={() => setSelectedPsychologist(psych.id)}
          >
            <p className={styles.psychCardName}>{psych.name}</p>
            <p className={styles.psychCardSpecialty}>{psych.specialty}</p>
            <span className={styles.psychCardModality}>{psych.modality}</span>
          </div>
        ))}
      </div>
    </>
  );

  const renderStep3 = () => (
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
          <div className={styles.timesGrid}>
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                className={`${styles.timeCard} ${selectedTime === time ? styles.timeCardSelected : ""}`}
                onClick={() => setSelectedTime(time)}
              >
                ⏰ {time}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );

  const renderStep4 = () => {
    const typeName = appointmentTypes.find((t) => t.id === selectedType)?.title ?? "—";
    const psychName = selectedPsych?.name ?? "—";
    const psychSpecialty = selectedPsych?.specialty ?? "";
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
            <span className={styles.summaryIconCircle}>📅</span>
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
              <Button text="← Voltar" variant="voltar" onClick={prev} />
              {step < totalSteps ? (
                <Button text="Continuar >" variant="ok" onClick={next} />
              ) : (
                <Button text="✓ Confirmar Agendamento" variant="ok" onClick={handleConfirm} />
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>{renderSidebar()}</aside>
        </div>
      </div>
      {showToast && (
        <div className={styles.toast}>
          ✅ Pedido de agendamento criado!
        </div>
      )}
    </ClientTemplate>
  );
};
