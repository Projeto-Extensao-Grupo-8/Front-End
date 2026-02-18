import React from "react";
import { Button } from "../../atom";
import styles from "./styles.module.css";

export const Banner = ({ 
  title = "Cuidado com sua saúde mental",
  description = "Encontre profissionais qualificados para te ajudar no seu processo de autoconhecimento e bem-estar",
  buttonText = "Agendar consulta",
  onButtonClick = () => {}
}) => {
  return (
    <div className={styles.banner}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.buttonWrapper}>
        <Button text={buttonText} onClick={onButtonClick} />
      </div>
    </div>
  );
};
