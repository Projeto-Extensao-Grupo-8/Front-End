import { useState } from "react";
import { Button, FilterSelect, SearchInput } from "../../../../atomic/atom";
import { AdministrativeEmployeeCards, EmployeeTable, EmployeeModal } from "../../../../atomic/organism";
import { AdminTemplate } from "../../../../atomic/template";

export default function Employee() {
    const [status, setStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("cadastrar");
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    return (
        <AdminTemplate>
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
                    totalFuncionarios={5}
                    ativos={5}
                    inativos={0}
                    especialidades={4}
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
                        onSubmit={(data) => console.log(data)}
                    />
                )}
           </div>
        </AdminTemplate>
    );
}