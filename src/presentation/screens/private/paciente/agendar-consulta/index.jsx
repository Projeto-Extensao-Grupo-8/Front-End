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

const psychologists = [
  { 
    id: 1, 
    name: "Sobre Beatriz Souza", 
    crp: "CRP 0634567",
    specialty: "Psicologia Infantil, Autismo, Trauma Interpessoal",
    description: "Dedicada ao atendimento infantil e familiar, com formação especializada em TEA.",
    formation: "Psicologia pela UNICAMP | Especialista em Autismo",
    languages: "Português, Espanhol",
    session_price: "R$ 200,00",
    modality: "Presencial"
  },
  { 
    id: 2, 
    name: "Dra. Brenda Souza", 
    crp: "CRP 0634567",
    specialty: "TCC, Ansiedade, Depressão",
    description: "Especialista em terapia cognitivo-comportamental com foco em transtornos de ansiedade.",
    formation: "Psicologia pela USP | Especialista em TCC",
    languages: "Português",
    session_price: "R$ 180,00",
    modality: "Presencial/Online"
  },
  { 
    id: 3, 
    name: "Dra. Solange Lopes", 
    crp: "CRP 0634567",
    specialty: "Ansiedade, Acompanhamento",
    description: "Atendimento humanizado com foco em acompanhamento contínuo e bem-estar.",
    formation: "Psicologia pela PUC | Especialista em Saúde Mental",
    languages: "Português, Inglês",
    session_price: "R$ 150,00",
    modality: "Online"
  },
  { 
    id: 4, 
    name: "Dra. Ana Paula Ferreira", 
    crp: "CRP 0634567",
    specialty: "Estresse, TPA, Ansiedade",
    description: "Profissional com experiência em tratamento de transtornos de ansiedade e estresse.",
    formation: "Psicologia pela UFRJ | Especialista em Ansiedade",
    languages: "Português, Francês",
    session_price: "R$ 170,00",
    modality: "Presencial"
  },
  { 
    id: 5, 
    name: "Dra. Maria Silva", 
    crp: "CRP 0634567",
    specialty: "Psicologia Infantil, Autismo",
    description: "Dedicada ao atendimento infantil com especialização em transtornos do espectro autista.",
    formation: "Psicologia pela UNIFESP | Especialista em TEA",
    languages: "Português, Espanhol",
    session_price: "R$ 190,00",
    modality: "Presencial"
  },
];

export const AgendarConsulta = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

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
        const selectedPsych = psychologists.find(p => p.id === selectedPsychologist);
        return (
          <div className={styles.step2Container}>
            <div className={styles.psychologistsColumn}>
              <p className={styles.stepTitle}>Escolha sua psicóloga</p>
              <p className={styles.stepDescription}>Selecione a profissional que melhor atenda suas necessidades</p>
              <div className={styles.psychologistsContainer}>
                {psychologists.map((psychologist) => (
                  <SelectableCard
                    key={psychologist.id}
                    title={psychologist.name}
                    subtitle={psychologist.specialty}
                    selected={selectedPsychologist === psychologist.id}
                    onClick={() => setSelectedPsychologist(psychologist.id)}
                  />
                ))}
              </div>
            </div>
            {selectedPsych && (
              <div className={styles.psychologistDetailCard}>
                <div className={styles.profileImagePlaceholder}></div>
                <h3>{selectedPsych.name}</h3>
                <p className={styles.crp}>{selectedPsych.crp}</p>
                
                <div className={styles.detailSection}>
                  <strong>Especialidade:</strong>
                  <p>{selectedPsych.specialty}</p>
                </div>
                
                <div className={styles.detailSection}>
                  <strong>Descrição:</strong>
                  <p>{selectedPsych.description}</p>
                </div>
                
                <div className={styles.detailSection}>
                  <strong>Formação Acadêmica:</strong>
                  <p>{selectedPsych.formation}</p>
                </div>
                
                <div className={styles.detailSection}>
                  <strong>Idiomas atendidos:</strong>
                  <p>{selectedPsych.languages}</p>
                </div>
                
                <div className={styles.detailSection}>
                  <strong>Informações práticas:</strong>
                  <p>Valor da sessão: <span className={styles.price}>{selectedPsych.session_price}</span></p>
                  <p>Modalidade: {selectedPsych.modality}</p>
                </div>
              </div>
            )}
          </div>
        );
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
        <div className={styles.stepsWrapper}>
          <StepIndicator
            steps={[
              "Tipo de Atendimento",
              "Psicólogo",
              "Data e Horário",
              "Confirmação",
            ]}
            current={step}
          />
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      {step === 1 && (
        <p className={styles.question}>
          Qual tipo de Atendimento você precisa?<br />
          Selecione o serviço desejado
        </p>
      )}
      {step === 2 ? (
        <div className={styles.step2MainContent}>
          {renderStepContent()}
        </div>
      ) : (
      <div className={styles.mainContent}>
        <div className={styles.formSection}>
          {renderStepContent()}
          {/* continue button positioned under last card on first step only */}
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
      )}
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
