<<<<<<< HEAD
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Badge, Button, ButtonTextIcon } from "../../atom";
import { api } from "../../../../services/api";
=======
import { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";
import { Badge, Button, ButtonTextIcon } from "../../atom";
import { funcionarioService } from "../../../../services/funcionarioService";

function formatarData(iso) {
  if (!iso) return "—";
  const [ano, mes, dia] = String(iso).split("-");
  return `${dia}/${mes}/${ano}`;
}
>>>>>>> main

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

export function EmployeeTable({ onEditar, searchTerm, status, refreshTrigger, onStatusChange }) {
  const [employees, setEmployees] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSize = 5;

  useEffect(() => {
    setPage(1);
    if (searchTerm) {
      searchEmployees(searchTerm);
    } else if (status) {
      filterByStatus(status);
    } else {
      fetchEmployees(1);
    }
  }, [searchTerm, status, refreshTrigger]);

  useEffect(() => {
    if (allResults.length > 0) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setEmployees(allResults.slice(startIndex, endIndex));
    }
  }, [page, allResults]);

  const fetchEmployees = async (currentPage) => {
    setLoading(true);
    try {
      const response = await api.get(`/funcionarios?pagina=${currentPage}&tamanho=1000`);
      const employeesData = response.data || [];
      const mappedEmployees = employeesData.map(emp => ({
        id: emp.idFuncionario,
        nome: emp.nomeUsuario,
        especialidade: emp.especialidades.map(e => e.nome).join(', '),
        email: emp.emailUsuario,
        dataAdmissao: formatDate(emp.dtAdmissao),
        crp: emp.crp,
        status: emp.ativo ? 'ativo' : 'inativo'
      }));
      setAllResults(mappedEmployees);
      setTotal(mappedEmployees.length);
      const paginatedEmployees = mappedEmployees.slice(0, pageSize);
      setEmployees(paginatedEmployees);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      setEmployees([]);
      setAllResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const searchEmployees = async (termo) => {
    setLoading(true);
    try {
      const response = await api.get(`/funcionarios/buscarPorTermo/${termo}`);
      const employeesData = response.data || [];
      const mappedEmployees = employeesData.map(emp => ({
        id: emp.idFuncionario,
        nome: emp.nomeUsuario,
        especialidade: emp.especialidades.map(e => e.nome).join(', '),
        email: emp.emailUsuario,
        dataAdmissao: formatDate(emp.dtAdmissao),
        crp: emp.crp,
        status: emp.ativo ? 'ativo' : 'inativo'
      }));
      setAllResults(mappedEmployees);
      setTotal(mappedEmployees.length);
      const paginatedEmployees = mappedEmployees.slice(0, pageSize);
      setEmployees(paginatedEmployees);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      setEmployees([]);
      setAllResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = async (statusFilter) => {
    setLoading(true);
    try {
      const ativoValue = statusFilter === 'ativo' ? true : false;
      const response = await api.get(`/funcionarios/buscarPorStatus?ativo=${ativoValue}`);
      const employeesData = response.data || [];
      const mappedEmployees = employeesData.map(emp => ({
        id: emp.idFuncionario,
        nome: emp.nomeUsuario,
        especialidade: emp.especialidades.map(e => e.nome).join(', '),
        email: emp.emailUsuario,
        dataAdmissao: formatDate(emp.dtAdmissao),
        crp: emp.crp,
        status: emp.ativo ? 'ativo' : 'inativo'
      }));
      setAllResults(mappedEmployees);
      setTotal(mappedEmployees.length);
      const paginatedEmployees = mappedEmployees.slice(0, pageSize);
      setEmployees(paginatedEmployees);
    } catch (error) {
      console.error('Erro ao filtrar funcionários por status:', error);
      setEmployees([]);
      setAllResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const endpoint = currentStatus === 'ativo' ? 'desativar' : 'ativar';
    try {
      await api.patch(`/funcionarios/${endpoint}/${id}`, {});
      // Atualiza o estado local após sucesso da API
      setAllResults((prev) =>
        prev.map((emp) => emp.id === id ? { ...emp, status: currentStatus === 'ativo' ? 'inativo' : 'ativo' } : emp)
      );
      setEmployees((prev) =>
        prev.map((emp) => emp.id === id ? { ...emp, status: currentStatus === 'ativo' ? 'inativo' : 'ativo' } : emp)
      );
      onStatusChange?.();
    } catch (error) {
      console.error(`Erro ao ${endpoint} funcionário:`, error);
    }
  };

  const handleDesativar = (id) => {
    toggleStatus(id, 'ativo');
  };

  const handleAtivar = (id) => {
    toggleStatus(id, 'inativo');
  };

  const maxPage = Math.ceil(total / pageSize);

  return (
    <div className={styles.wrapper}>
      {loading && <p>Carregando...</p>}
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
          Exibindo {employees.length} de {total} funcionários
        </span>
        <div className={styles.paginacao}>
          <Button
            variant="voltar"
            text="Anterior"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
          <Button
            variant="ok"
            text="Próxima"
            onClick={() => setPage((p) => p + 1)}
            disabled={page * pageSize >= total}
          />
        </div>
      </div>
    </div>
  );
}
