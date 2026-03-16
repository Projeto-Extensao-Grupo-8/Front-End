import { useState } from "react";
import styles from "./styles.module.css";
import { Badge, Button, ButtonTextIcon } from "../../atom";

const MOCK_EMPLOYEES = [
  { id: "1", nome: "Ana Beatriz Silva", especialidade: "Terapia Cognitivo-Comportamental",
    email: "ana.b@email.com", dataAdmissao: "15/03/2024", crp: "06/123456", status: "ativo" },
  { id: "2", nome: "Carlos Oliveira", especialidade: "Psicanálise",
    email: "carlos.o@email.com", dataAdmissao: "01/11/2023", crp: "06/98543", status: "ativo" },
  { id: "3", nome: "Marcos Vinicius", especialidade: "Neuropsicologia",
    email: "marcos.v@email.com", dataAdmissao: "22/07/2024", crp: "06/175321", status: "ativo" },
  { id: "4", nome: "Julia Pereira", especialidade: "Terapia de Casal",
    email: "julia.p@email.com", dataAdmissao: "10/01/2023", crp: "06/112987", status: "ativo" },
  { id: "5", nome: "Douglas da Costa Alves", especialidade: "Neuropsicologia",
    email: "douglas.c@email.com", dataAdmissao: "06/06/2022", crp: "06/205468", status: "inativo" },
];

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ToggleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
    <circle cx="16" cy="12" r="3" />
  </svg>
);

export function EmployeeTable({ onEditar }) {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [page, setPage] = useState(1);

  // Pra implementar o back-end aí:
  // useEffect(() => {
  //   fetch("/api/employees").then(res => res.json()).then(setEmployees);
  // }, []);

  const handleDesativar = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => emp.id === id ? { ...emp, status: "inativo" } : emp)
    );
  };

  const handleAtivar = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => emp.id === id ? { ...emp, status: "ativo" } : emp)
    );
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Funcionário</th>
            <th>Especialidade</th>
            <th>E-mail</th>
            <th>Data de Admissão</th>
            <th>CRP</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className={styles.nome}>{emp.nome}</td>
              <td className={styles.especialidade}>{emp.especialidade}</td>
              <td className={styles.email}><strong>{emp.email}</strong></td>
              <td>{emp.dataAdmissao}</td>
              <td>{emp.crp}</td>
              <td>
                <Badge
                  text={emp.status === "ativo" ? "Ativo" : "Inativo"}
                  status={emp.status === "ativo" ? "active" : "inactive"}
                />
              </td>
              <td className={styles.acoes}>
                <ButtonTextIcon
                    text="Editar"
                    Icon={EditIcon}
                    onClick={() => onEditar?.(emp)}
                />
                {emp.status === "ativo" ? (
                  <ButtonTextIcon
                    text="Desativar"
                    Icon={ToggleIcon}
                    onClick={() => handleDesativar(emp.id)}
                    className={styles.desativar}
                  />
                ) : (
                  <ButtonTextIcon
                    text="Ativar"
                    Icon={ToggleIcon}
                    onClick={() => handleAtivar(emp.id)}
                    className={styles.ativar}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <span className={styles.exibindo}>
          Exibindo {employees.length} de {employees.length} funcionários
        </span>
        <div className={styles.paginacao}>
          <Button variant="voltar" text="Anterior" onClick={() => setPage((p) => Math.max(1, p - 1))} />
          <Button variant="ok" text="Próxima" onClick={() => setPage((p) => p + 1)} />
        </div>
      </div>
    </div>
  );
}