import { PrivateHeader } from "../../molecule";
import styles from "./styles.module.css";
import { VLibras } from "../../atom";

export const ClientTemplate = ({children }) => {
  const paths = [
    {name:"Agendar Consulta", path: "/agendar-consulta"},
    {name:"Meu Perfil", path: "/perfil"},
    {name:"Blog", path: "/blog"},
  ]

  return (
    <div>
      <VLibras />
      <PrivateHeader paths={paths} />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
