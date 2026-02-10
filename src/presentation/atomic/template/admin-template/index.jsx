import { PrivateHeader } from "../../molecule";
import styles from "./styles.module.css";
import ReactVLibrasPlugin from '@moreiraste/react-vlibras';

export const AdminTemplate = ({children }) => {
  
  const paths = [
    {name:"Dashboard", path: "/dashboard"},
    {name:"Agenda", path: "/dashboard1"},
    {name:"Pacientes", path: "/dashboard1"},
    {name:"Funcionários", path: "/dashbo1ard"},
    {name:"Financeiro", path: "/dashboa1rd"},
    {name:"Estoque", path: "/dashboard1"},
  ]

  return (
    <div>
      <ReactVLibrasPlugin forceOnload={true} position="left" avatar="hosana" opacity="0.8" />
      <PrivateHeader paths={paths} />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
