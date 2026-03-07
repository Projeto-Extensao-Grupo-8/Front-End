import React, { useState } from "react";
import { ClientTemplate } from "../../../../atomic/template";
import { StepIndicator, SelectableCard } from "../../../../atomic/molecule";
import { Button } from "../../../../atomic/atom/button";
import styles from "./styles.module.css";

const appointmentTypes = [
  { id: 1, title: "Terapia de Casal", subtitle: "Duração: 50 min" },
  { id: 2, title: "Terapia Individual", subtitle: "Duração: 50 min" },
  { id: 3, title: "Psicologia Infantil", subtitle: "Duração: 50 min" },
  { id: 4, title: "Psicologia Infantil", subtitle: "Duração: 60 min" },
  { id: 5, title: "Avaliação Psicológica", subtitle: "Duração: 60 min" },
  { id: 6, title: "Orientação Profissional", subtitle: "Duração: 60 min" },
];

export const AgendarConsulta = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);

  const totalSteps = 4;
  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.optionsContainer}>
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
        );
      case 2:
        return <p>psicólogos — lista de nomes aqui</p>;
      case 3:
        return <p>calendário e horário aqui</p>;
      case 4:
        return <p>confirmação / resumo da seleção</p>;
      default:
        return null;
    }
  };

  return (
    <ClientTemplate>
      <div className={styles.container}>
        <h1>Agende sua Consulta</h1>
        <p className={styles.subtitle}>Siga os passos abaixo para confirmar seu atendimento</p>
        <StepIndicator
        steps={[
          "Tipo de Atendimento",
          "Psicólogo",
          "Data e Horário",
          "Confirmação",
        ]}
        current={step}
      />
      {step === 1 && (
        <p className={styles.question}>
          Qual tipo de Atendimento você precisa?<br />
          Selecione o serviço desejado
        </p>
      )}
      <div className={styles.mainContent}>
        <div className={styles.formSection}>
          {renderStepContent()}
          {/* continue button positioned under last card on first step */}
          {step === 1 && (
            <div className={styles.inlineButtons}>
              <Button text="Continuar >" variant="ok" onClick={next} />
            </div>
          )}
        </div>
        <aside className={styles.sidebar}>
          <div className={styles.infoBox}>
            <h2>
              <span className={styles.infoIcon}>ℹ️</span>Informações da Psicóloga
            </h2>
            {step === 1 ? (
              <p className={styles.infoHint}>
                Selecione uma psicóloga na etapa 2 para ver suas informações completas aqui.
              </p>
            ) : (
              <ul>
                <li>Duração: Cada sessão 50 minutos</li>
                <li>Pagamento: PIX, cartão ou dinheiro</li>
                <li>Online: Link enviado por email 1h antes</li>
                <li>Contato: (11) 99999‑9999</li>
              </ul>
            )}
          </div>
          <div className={styles.noteBox}>
            <h3>Informações Importantes</h3>
            <ul>
              <li>Duração: Cada sessão tem 50 minutos</li>
              <li>Pagamento: Pix, cartão ou dinheiro</li>
              <li>Online: Link enviado por email 1h antes</li>
              <li>Dúvidas: (11) 99999-9999</li>
            </ul>
            <p className={styles.tip}>Dica: Chegue 5 minutos antes para atendimento presencial</p>
          </div>
        </aside>
      </div>
      {/* navigation row only used after first step */}
      {step > 1 && (
        <div className={styles.navigationButtons}>
          {step > 1 && <Button text="← Voltar" variant="voltar" onClick={prev} />}
          {step < totalSteps && (
            <Button text="Continuar >" variant="ok" onClick={next} />
          )}
        </div>
      )}
    </div>
    </ClientTemplate>
  );
};
