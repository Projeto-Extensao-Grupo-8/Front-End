import { PrivateHeader } from "../../molecule";
import styles from "./styles.module.css";
import { VLibras } from "../../atom";

export const AdminTemplate = ({children }) => {

  const paths = [
    {name:"Dashboard", path: "/admin/dashboard"},
    {name:"Agenda", path: "/admin/agenda"},
    {name:"Pacientes", path: "/admin/pacientes"},
    {name:"Funcionários", path: "/admin/funcionarios"},
    {name:"Financeiro", path: "/admin/financeiro"},
    {name:"Estoque", path: "/admin/estoque"},
  ]

  return (
    <div>
      <VLibras />
      <PrivateHeader paths={paths} homePath="/admin" />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
