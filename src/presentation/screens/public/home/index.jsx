import React from "react";
import { useNavigate } from "react-router-dom";
import { PublicTemplate } from "../../../atomic/template/public-template";
import { Banner } from "../../../atomic/molecule";
import { ServicesSection, ProfessionalsSection, WhyChooseSection, TestimonialsSection, AboutSection } from "../../../atomic/organism";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PublicTemplate>
      <Banner
        title="Cuidado com sua saúde mental"
        description="Encontre profissionais qualificados para te ajudar no seu processo de autoconhecimento e bem-estar"
        buttonText="Agendar consulta"
        onButtonClick={() => navigate("/login")}
      />
      <section id="servicos"><ServicesSection /></section>
      <section id="nosso-time"><ProfessionalsSection /></section>
      <WhyChooseSection />
      <section id="depoimentos"><TestimonialsSection /></section>
      <section id="sobre"><AboutSection image="/src/assets/logo_flor_de_lotus_600_x_600_px_1.png" /></section>
    </PublicTemplate>
  );
};

export default Home;
