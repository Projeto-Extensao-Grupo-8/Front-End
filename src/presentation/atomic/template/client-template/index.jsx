import { PrivateHeader } from "../../molecule";
import styles from "./styles.module.css";
import { VLibras } from "../../atom";

export const ClientTemplate = ({children }) => {
  const paths = [
    {name:"Agendar Consulta", path: "/paciente/agendar-consulta"},
    {name:"Meu Perfil", path: "/paciente/perfil"},
    {name:"Blog", path: "/paciente/blog"},
  ]

  return (
    <div>
      <VLibras />
      <PrivateHeader paths={paths} />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
