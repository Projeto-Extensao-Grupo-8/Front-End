import { useEffect, useState } from "react";
import { Button, FilterSelect, SearchInput } from "../../../../atomic/atom";
import { AdministrativeEmployeeCards, EmployeeTable, EmployeeModal } from "../../../../atomic/organism";
import { AdminTemplate } from "../../../../atomic/template";
import { api } from "../../../../../services/api";


export default function Employee() {
    const [status, setStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("cadastrar");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshTable, setRefreshTable] = useState(false);

    const [funcionarios, setFuncionarios] = useState();

    const [dadosKpis, setDadosKpis] = useState([]);

    const formatDateForAPI = (dateStr) => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const formatDateForDisplay = (dateStr) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split('-');
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    };

    const permissionMap = { "admin": "1", "funcionario": "2" };
    const reversePermissionMap = { "1": "admin", "2": "funcionario" };

 const buscarDadosKpis = async () => {
    try {
      const response = await api.get("/funcionarios/kpisGestaoFuncionarios");
      setDadosKpis(response.data);
    } catch (error) {
      console.error("Nao foi possivel listar os dados da KPIS", error);
    }
  };

   useEffect(() => {
      buscarDadosKpis();
    }, []);

    useEffect(() => {
      buscarDadosKpis();
    }, [refreshTable]);

    useEffect(() => {
      if (!modalOpen) {
        buscarDadosKpis();
      }
    }, [modalOpen]);

    const handleSearch = async (termo) => {
      setSearchTerm(termo);
    };

    return (
        <AdminTemplate>
            {toast && (
                <div style={{
                    position: "fixed", top: "24px", right: "24px", zIndex: 9999,
                    background: "#22c55e", color: "#fff", padding: "12px 20px",
                    borderRadius: "8px", fontSize: "14px", fontWeight: "500",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}>
                    {toast}
                </div>
            )}
           <div>
                <div style={{ marginBottom: "24px" }}>
                    <h1 style={{
                        fontSize: "35px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        margin: 0,
                        paddingBottom: "8px",
                        borderBottom: "2px solid #e85d7a",
                        display: "inline-block"
                    }}>
                        Gestão de Funcionários
                    </h1>
                </div>

                <AdministrativeEmployeeCards
                    totalFuncionarios={dadosKpis.totaisFuncionarios}
                    ativos={dadosKpis.totaisFuncionariosAtivos || 0}
                    inativos={dadosKpis.totalFuncionariosDesativados || 0}
                    especialidades={dadosKpis.totalEspecialidades || 0}
                />

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginTop: "30px",
                    marginBottom: "24px",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <SearchInput
                            placeholder="Buscar por nome, email ou CRP..."
                            onSearch={handleSearch}
                        />
                        <FilterSelect
                            value={status}
                            onChange={setStatus}
                            options={[
                                { label: "Todos os status", value: "" },
                                { label: "Ativo", value: "ativo" },
                                { label: "Inativo", value: "inativo" },
                            ]}
                        />
                    </div>
                    <Button
                        variant="cadastrar"
                        text="Cadastrar Funcionário"
                        onClick={() => { setModalMode("cadastrar"); setModalOpen(true); }}
                    />
                </div>

                <EmployeeTable
                    searchTerm={searchTerm}
                    status={status}
                    refreshTrigger={refreshTable}
                    onStatusChange={() => setRefreshTable((prev) => !prev)}
                    onEditar={async (emp) => {
                        try {
                            const response = await api.get(`/funcionarios/${emp.id}`);
                            if (!response.data) {
                                
                                return;
                            }
                            const responseUser = await api.get(`/usuarios/${response.data.idUsuario}`);
                            if (!responseUser.data) {
                                console.error("No data in response for usuario");
                                return;
                            }
                            console.log("Resposta do funcionário:", responseUser.data);
                            const fullData = response.data;
                            setSelectedEmployee({
                                id: emp.id,
                                nome: response.data.nomeUsuario,
                                dataNascimento: formatDateForDisplay(responseUser.data.dataNascimento) || "",
                                telefone: responseUser.data.telefone || "",
                                CRP: response.data.crp || "",
                                permissao: reversePermissionMap[responseUser.data.nivelPermissao] || responseUser.data.nivelPermissao,
                                especialidade: response.data.especialidades ? response.data.especialidades.map(e => e.nome) : [],
                                cep: responseUser.data.endereco?.cep || "",
                                estado: responseUser.data.endereco?.estado || "",
                                cidade: responseUser.data.endereco?.cidade || "",
                                bairro: responseUser.data.endereco?.bairro || "",
                                logradouro: responseUser.data.endereco?.logradouro || "",
                                complemento: responseUser.data.endereco?.complemento || "",
                                numero: responseUser.data.endereco?.numero || "",
                                idEndereco: responseUser.data.endereco?.idEndereco || "",
                                email: response.data.emailUsuario || "",
                                senha: '',
                                confirmarSenha: '',
                                idFuncionario: response.data.idFuncionario,
                                idUsuario: response.data.idUsuario,
                            });
                            setModalMode("editar");
                            setModalOpen(true);
                        } catch (error) {
                            console.error("Erro ao buscar detalhes do funcionário:", error);
                        }
                    }}
                />

                {modalOpen && (
                    console.log("Dados para modal:", selectedEmployee),
                    <EmployeeModal
                        key={modalMode + (selectedEmployee?.idFuncionario || 'new')}
                        mode={modalMode}
                        initialData={selectedEmployee ?? {}}
                        onClose={() => { setModalOpen(false); setSelectedEmployee(null); }}
                        onSubmit={async (data) => {
                            try {
                                if (modalMode === "editar" && selectedEmployee?.idFuncionario) {
                
                                    const userData = {
                                        nomeUsuario: data.nome,
                                        emailUsuario: data.email,
                                        telefone: data.telefone,
                                        dataNascimento: formatDateForAPI(data.dataNascimento),
                                        nivelPermissao: permissionMap[data.permissao] || data.permissao,
                                        fkEndereco: {
                                            idEndereco: data.idEndereco,
                                            cep: data.cep,
                                            estado: data.estado,
                                            cidade: data.cidade,
                                            bairro: data.bairro,
                                            logradouro: data.logradouro,
                                            complemento: data.complemento,
                                            numero: data.numero
                                        }
                                    };
                                    console.log("Sending userData:", userData);
                                    const userResponse = await api.patch(`/usuarios/${selectedEmployee.idUsuario}`, userData);
                                    console.log("User update response:", userResponse);

                                    const employeeData = {
                                        crp: data.CRP,
                                        especialidades: data.especialidade.map(nome => ({ nome })),
                
                                    };
                                    const empResponse = await api.patch(`/funcionarios/${selectedEmployee.idFuncionario}`, employeeData);
                                    console.log("Employee update response:", empResponse);
                                    console.log(selectedEmployee);
                                } else {
                                    // cadastro de funcionário
                                
                                    const userData = {
                                        crp: data.crp,
                                        nome: data.nome,
                                        email: data.email,
                                        senha: data.senha,
                                        telefone: data.telefone,
                                        dataNascimento: formatDateForAPI(data.dataNascimento),
                                        cpf: data.cpf,
                                        cep: data.cep,
                                        estado: data.estado,
                                        cidade: data.cidade,
                                        bairro: data.bairro,
                                        logradouro: data.logradouro,
                                        complemento: data.complemento,
                                        numero: data.numero,
                                        especialidades: data.especialidade.map(nome => ({ nome }))
                                    };
                                 
                                    await api.post("/funcionarios", userData);
                                }
                                setModalOpen(false);
                                setSelectedEmployee(null);
                                setRefreshTable((prev) => !prev); // Força o recarregamento da tabela
                            } catch (error) {
                                console.error(`Erro ao ${modalMode} funcionário:`, error);
                            }
                        }}
                    />
                )}
           </div>
        </AdminTemplate>
    );
}
