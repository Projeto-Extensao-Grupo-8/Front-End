import { PrivateHeader } from "../../molecule";
import styles from "./styles.module.css";
import ReactVLibrasPlugin from '@moreiraste/react-vlibras';

export const ClientTemplate = ({children }) => {
  const paths = [
    {name:"Agendar Consulta", path: "/agendar-consulta"},
    {name:"Meu Perfil", path: "/perfil"},
    {name:"Blog", path: "/blog"},
  ]

  return (
    <div>
      <ReactVLibrasPlugin forceOnload={true} position="left" avatar="hosana" opacity="0.8" />
      <PrivateHeader paths={paths} />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
