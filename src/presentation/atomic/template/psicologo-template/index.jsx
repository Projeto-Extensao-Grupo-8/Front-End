import { PrivateHeader } from "../../molecule";
import styles from "./styles.module.css";
import { VLibras } from "../../atom";

export const PsicologoTemplate = ({ children }) => {
  const paths = [
    { name: "Minha Agenda", path: "/psicologo/agenda" },
    { name: "Pacientes", path: "/psicologo/pacientes" },
    { name: "Blog", path: "/psicologo/blog" },
    { name: "Perfil", path: "/psicologo/perfil" },
  ];

  return (
    <div>
      <VLibras />
      <PrivateHeader paths={paths} homePath="/psicologo/agenda" />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
