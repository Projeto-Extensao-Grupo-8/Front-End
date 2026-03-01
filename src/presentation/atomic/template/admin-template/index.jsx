import { PrivateHeader } from "../../molecule";
import styles from "./styles.module.css";
import { VLibras } from "../../atom";

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
      <VLibras />
      <PrivateHeader paths={paths} />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
