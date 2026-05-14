import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PublicTemplate } from "../../../atomic/template/public-template";
import { Banner } from "../../../atomic/molecule";
import { ServicesSection, ProfessionalsSection, WhyChooseSection, TestimonialsSection, AboutSection } from "../../../atomic/organism";
import styles from "./styles.module.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(`.${styles.fadeIn}`).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <PublicTemplate>
      <Banner
        title="Cuidado com a sua saúde mental"
        description="Encontre profissionais qualificados para te ajudar no seu processo de autoconhecimento e bem-estar emocional."
        buttonText="Agendar consulta"
        onButtonClick={() => navigate("/login")}
      />
      <section id="servicos" className={styles.fadeIn}>
        <ServicesSection />
      </section>
      <section id="nosso-time" className={styles.fadeIn}>
        <ProfessionalsSection />
      </section>
      <div className={styles.fadeIn}>
        <WhyChooseSection />
      </div>
      <section id="depoimentos" className={styles.fadeIn}>
        <TestimonialsSection />
      </section>
      <section id="sobre" className={styles.fadeIn}>
        <AboutSection image="/src/assets/logo_flor_de_lotus_600_x_600_px_1.png" />
      </section>
    </PublicTemplate>
  );
};

export default Home;
