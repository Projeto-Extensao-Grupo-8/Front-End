import React from "react";
import styles from "./styles.module.css";

export const Banner = ({
  title = "Cuidado com a sua saúde mental",
  description = "Encontre profissionais qualificados para te ajudar no seu processo de autoconhecimento e bem-estar emocional.",
  buttonText = "Agendar consulta",
  onButtonClick = () => {},
}) => {
  const scrollToTeam = () => {
    document.getElementById("nosso-time")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.heroOuter}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Saúde mental com cuidado</span>
          <h1 className={styles.heroTitle}>
            Cuidado com a sua <em>saúde mental</em>
          </h1>
          <p className={styles.heroDesc}>{description}</p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={onButtonClick}>
              {buttonText}
            </button>
            <button className={styles.btnSecondary} onClick={scrollToTeam}>
              Conhecer equipe
            </button>
          </div>
          <div className={styles.heroStats}>
            <div>
              <div className={styles.statNum}>200+</div>
              <div className={styles.statLabel}>Pacientes atendidos</div>
            </div>
            <div>
              <div className={styles.statNum}>15</div>
              <div className={styles.statLabel}>Especialistas</div>
            </div>
          </div>
        </div>

        <div className={styles.heroImageWrap}>
          <div className={styles.heroVisual}>
            <span className={styles.heroLotus}>🪷</span>
            <div className={styles.heroCardFloat}>
              <div className={styles.heroCardDot}></div>
              <div>
                <div className={styles.heroCardText}>Próxima sessão</div>
                <div className={styles.heroCardSub}>Hoje às 15h · Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
