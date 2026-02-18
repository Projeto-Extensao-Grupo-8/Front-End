import React from "react";
import { ProfessionalCard } from "../professional-card";
import styles from "./styles.module.css";

export const ProfessionalsSection = () => {
  const professionals = [
    {
      id: 1,
      name: "Solange Lopes",
      image: null,
      clinic: "Clínica Presencial",
      price: 200.00,
      specialties: ["Ansiedade", "Autoconhecimento"],
    },
    {
      id: 2,
      name: "Ana Paula Ferreira",
      image: null,
      clinic: "Clínica Online",
      price: 200.00,
      specialties: ["Estresse no trabalho", "TPM", "Depressão", "Ansiedade"],
    },
    {
      id: 3,
      name: "Beatriz Souza",
      image: null,
      clinic: "Clínica Presencial",
      price: 200.00,
      specialties: ["Psicologia Infantil", "Autismo", "Trauma Interpessoal"],
    },
  ];

  const handleViewMore = (professionalId) => {
    console.log(`Ver mais do profissional: ${professionalId}`);
    // TODO: Implementar navegação para perfil do profissional
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Conheça nossos profissionais</h2>
      <div className={styles.grid}>
        {professionals.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            image={professional.image}
            name={professional.name}
            clinic={professional.clinic}
            price={professional.price}
            specialties={professional.specialties}
            onViewMore={() => handleViewMore(professional.id)}
          />
        ))}
      </div>
    </section>
  );
};
