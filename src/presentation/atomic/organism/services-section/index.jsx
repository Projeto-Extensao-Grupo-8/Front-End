import React from "react";
import { ServiceCard } from "../service-card";
import styles from "./styles.module.css";

export const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: "Terapia Individual",
      description: "Atendimento personalizado para cuidar da sua saúde mental e emocional com total sigilo.",
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Terapia de Casal",
      description: "Fortalecimento de vínculos e resolução de conflitos para relacionamentos mais saudáveis.",
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: "Avaliação Neuropsicológica",
      description: "Análise de funções executivas e áreas neurológicas do desenvolvimento com laudos detalhados.",
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "Atendimento Online",
      description: "Consultas por videochamada com todo o conforto e privacidade do seu lar.",
    },
    {
      id: 5,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 5V3a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      ),
      title: "Orientação Profissional",
      description: "Apoio para decisões de carreira e desenvolvimento pessoal com clareza e propósito.",
    },
    {
      id: 6,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Tratamento de Ansiedade",
      description: "Técnicas comprovadas pela ciência para gerenciar ansiedade e estresse no dia a dia.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>O que oferecemos</div>
        <h2 className={styles.title}>Nossos Serviços</h2>
        <p className={styles.subtitle}>
          Uma gama completa de serviços psicológicos para atender suas necessidades com atenção e cuidado.
        </p>
      </div>
      <div className={styles.grid}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};
