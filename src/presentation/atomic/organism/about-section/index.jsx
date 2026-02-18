import React from "react";
import styles from "./styles.module.css";

export const AboutSection = ({ image }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Sobre Nós</h2>
          <p className={styles.text}>
            Na Flor de Lótus, oferecemos atendimento psicológico online e presencial para todas
            as suas necessidades. Com uma equipe de profissionais altamente qualificados, cada
            um sujeito completo, incluindo entes e antigos especializados para atender suas
            demandas específicas.
          </p>
          <p className={styles.text}>
            Nosso foco é em você. Por isso, criamos um sistema de acolhimento e práticas
            cientificamente que você cuide da sua saúde mental com mais praticidade. Nosso
            objetivo é sempre sua jornada de bem-estar.
          </p>
        </div>
        {image && (
          <div className={styles.imageContainer}>
            <img src={image} alt="Sobre Nós" className={styles.image} />
          </div>
        )}
      </div>
    </section>
  );
};
