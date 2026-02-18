import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicTemplate } from "../../../atomic/template/public-template";
import { Banner } from "../../../atomic/molecule";
import { ServicesSection, ProfessionalsSection, WhyChooseSection, TestimonialsSection, AboutSection } from "../../../atomic/organism";
import logoCard from "../../../../assets/logoCard.png";
import styles from "./styles.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PublicTemplate>
      <Banner 
        title="Cuidado com sua saúde mental"
        description="Encontre profissionais qualificados para te ajudar no seu processo de autoconhecimento e bem-estar"
        buttonText="Agendar consulta"
        onButtonClick={() => navigate("/agendar-consulta")}
      />
      <ServicesSection />
      <ProfessionalsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <AboutSection image="/src/assets/logoCard.png" />
      <main className={styles.hero}>



      </main>
    </PublicTemplate>
  );
};

export default Home;
