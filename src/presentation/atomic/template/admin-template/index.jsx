import styles from "./styles.module.css";
import { PrivateHeader } from "../../molecule";
import { VLibras } from "../../atom";

export const AdminTemplate = ({children }) => {

  const paths = [
    {name:"Dashboard", path: "/administrador/dashboard"},
    {name:"Agenda", path: "/administrador"},
    // {name:"Pacientes", path: "/administrador/pacientes"},
    {name:"Funcionários", path: "/administrador/funcionarios"},
    // {name:"Financeiro", path: "/administrador/financeiro"},
    {name:"Estoque", path: "/administrador/estoque"},
  ]

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <VLibras />
      <PrivateHeader paths={paths} homePath="/administrador" />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
