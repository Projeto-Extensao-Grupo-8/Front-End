import React from "react";
import styles from "./styles.module.css";

export const AboutSection = ({ image }) => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          {image ? (
            <img src={image} alt="Flor de Lótus" className={styles.image} />
          ) : (
            <div className={styles.blob}>
              <span className={styles.blobIcon}>🪷</span>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.eyebrow}>Nossa história</div>
          <h2 className={styles.title}>Sobre a Flor de Lótus</h2>
          <p className={styles.text}>
            Na Flor de Lótus, oferecemos atendimento psicológico online e presencial para todas
            as suas necessidades. Com uma equipe de profissionais altamente qualificados, cada
            um especializado para atender suas demandas específicas.
          </p>
          <p className={styles.text}>
            Nosso foco é em você. Por isso, criamos um sistema de acolhimento e práticas
            cientificamente embasadas para que você cuide da sua saúde mental com mais
            praticidade. Nosso objetivo é sempre a sua jornada de bem-estar.
          </p>
        </div>
      </div>
    </section>
  );
};
