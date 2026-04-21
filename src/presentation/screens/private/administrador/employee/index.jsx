import { useState, useEffect } from "react";
import { Button, FilterSelect, SearchInput } from "../../../../atomic/atom";
import { AdministrativeEmployeeCards, EmployeeTable, EmployeeModal } from "../../../../atomic/organism";
import { AdminTemplate } from "../../../../atomic/template";
import { funcionarioService } from "../../../../../services/funcionarioService";

export default function Employee() {
    const [status, setStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("cadastrar");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [toast, setToast] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [kpis, setKpis] = useState(null);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3500);
        return () => clearTimeout(t);
    }, [toast]);

    useEffect(() => {
        funcionarioService.getKpis()
            .then(setKpis)
            .catch((err) => console.error("Erro ao carregar KPIs:", err));
    }, [refreshKey]);

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
                    totalFuncionarios={kpis?.totaisFuncionarios ?? "..."}
                    ativos={kpis?.totaisFuncionariosAtivos ?? "..."}
                    inativos={kpis?.totalFuncionariosDesativados ?? "..."}
                    especialidades={kpis?.totalEspecialidades ?? "..."}
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
                            onSearch={(value) => console.log(value)}
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
                    refreshKey={refreshKey}
                    onEditar={(emp) => {
                        setSelectedEmployee(emp);
                        setModalMode("editar");
                        setModalOpen(true);
                    }}
                />

                {modalOpen && (
                    <EmployeeModal
                        mode={modalMode}
                        initialData={selectedEmployee ?? {}}
                        onClose={() => { setModalOpen(false); setSelectedEmployee(null); }}
                        onSuccess={() => {
                            setModalOpen(false);
                            setSelectedEmployee(null);
                            setRefreshKey((k) => k + 1);
                            setToast("Funcionário cadastrado com sucesso!");
                        }}
                    />
                )}
           </div>
        </AdminTemplate>
    );
}
