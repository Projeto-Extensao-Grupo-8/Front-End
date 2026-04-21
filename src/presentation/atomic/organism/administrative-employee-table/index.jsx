import { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import { Badge, Button, ButtonTextIcon } from "../../atom";
import { funcionarioService } from "../../../../services/funcionarioService";

function formatarData(iso) {
  if (!iso) return "—";
  const [ano, mes, dia] = String(iso).split("-");
  return `${dia}/${mes}/${ano}`;
}

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

export function EmployeeTable({ onEditar, refreshKey }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await funcionarioService.listar();
      setEmployees(data);
    } catch (err) {
      console.error("Erro ao carregar funcionários:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, refreshKey]);

  const handleDesativar = async (id) => {
    try {
      await funcionarioService.desativar(id);
      setEmployees((prev) =>
        prev.map((emp) => emp.idFuncionario === id ? { ...emp, ativo: false } : emp)
      );
    } catch (err) {
      console.error("Erro ao desativar:", err);
    }
  };

  const handleAtivar = async (id) => {
    try {
      await funcionarioService.ativar(id);
      setEmployees((prev) =>
        prev.map((emp) => emp.idFuncionario === id ? { ...emp, ativo: true } : emp)
      );
    } catch (err) {
      console.error("Erro ao ativar:", err);
    }
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
          {loading ? (
            <tr><td colSpan={7} style={{ textAlign: "center", padding: "24px" }}>Carregando...</td></tr>
          ) : employees.length === 0 ? (
            <tr><td colSpan={7} style={{ textAlign: "center", padding: "24px" }}>Nenhum funcionário cadastrado</td></tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.idFuncionario}>
                <td className={styles.nome}>{emp.nomeUsuario}</td>
                <td className={styles.especialidade}>
                  {emp.especialidades?.[0]?.nome ?? "—"}
                </td>
                <td className={styles.email}><strong>{emp.emailUsuario}</strong></td>
                <td>{formatarData(emp.dtAdmissao)}</td>
                <td>{emp.crp}</td>
                <td>
                  <Badge
                    text={emp.ativo ? "Ativo" : "Inativo"}
                    status={emp.ativo ? "active" : "inactive"}
                  />
                </td>
                <td className={styles.acoes}>
                  <ButtonTextIcon
                    text="Editar"
                    Icon={EditIcon}
                    onClick={() => onEditar?.(emp)}
                  />
                  {emp.ativo ? (
                    <ButtonTextIcon
                      text="Desativar"
                      Icon={ToggleIcon}
                      onClick={() => handleDesativar(emp.idFuncionario)}
                      className={styles.desativar}
                    />
                  ) : (
                    <ButtonTextIcon
                      text="Ativar"
                      Icon={ToggleIcon}
                      onClick={() => handleAtivar(emp.idFuncionario)}
                      className={styles.ativar}
                    />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={styles.footer}>
        <span className={styles.exibindo}>
          Exibindo {employees.length} funcionário{employees.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
