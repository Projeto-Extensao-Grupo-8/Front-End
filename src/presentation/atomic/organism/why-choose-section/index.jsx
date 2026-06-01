import React from "react";
import styles from "./styles.module.css";

export const WhyChooseSection = () => {
  const features = [
    {
      num: "01",
      title: "Profissionais certificados",
      desc: "Todos os especialistas possuem CRP ativo e formações reconhecidas pelo MEC.",
    },
    {
      num: "02",
      title: "Flexibilidade de horários",
      desc: "Atendemos de segunda a sábado, presencialmente ou online, no horário que funciona para você.",
    },
    {
      num: "03",
      title: "Sigilo e acolhimento",
      desc: "Ambiente seguro, sem julgamentos. Sua privacidade é nossa prioridade absoluta.",
    },
    {
      num: "04",
      title: "Plataforma completa",
      desc: "Agendamento integrados num só lugar, simples e seguro.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>Por que nos escolher</div>
          <h2 className={styles.title}>Cuidado que faz a diferença</h2>
          <div className={styles.list}>
            {features.map((f) => (
              <div key={f.num} className={styles.item}>
                <div className={styles.numBadge}>{f.num}</div>
                <div>
                  <div className={styles.itemTitle}>{f.title}</div>
                  <div className={styles.itemDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.blob}>
            <span className={styles.blobIcon}>🪷</span>
          </div>

        </div>
      </div>
    </section>
  );
};
