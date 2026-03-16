import { useState } from "react";
import { Badge, SearchInput, FilterSelect, BaseCard } from "../../atom";
import styles from "./styles.module.css";

export const StockTable = ({ variant = "digital", testes = [] }) => {
    const [search, setSearch] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("");

    const titulo = variant === "digital" ? "Testes Digitais" : "Testes Físicos";

    const statusOptions = [
        { label: "Todos", value: "" },
        { label: "Ok", value: "ok" },
        { label: "Crítico", value: "critico" },
    ];

    const filtrados = testes.filter((t) => {
        const matchSearch = t.nome.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filtroStatus ? t.status === filtroStatus : true;
        return matchSearch && matchStatus;
    });

    return (
        <BaseCard>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "16px" }}>
                <span style={{ fontSize: "15px", fontWeight: "500" }}>{titulo}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <SearchInput placeholder="Buscar teste..." onSearch={setSearch} />
                    <FilterSelect
                        options={statusOptions}
                        placeholder="Filtrar"
                        value={filtroStatus}
                        onChange={setFiltroStatus}
                    />
                </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "left", fontWeight: "500", color: "#888", fontSize: "13px", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>Nome do teste</th>
                        <th style={{ textAlign: "left", fontWeight: "500", color: "#888", fontSize: "13px", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>Categoria</th>
                        <th style={{ textAlign: "left", fontWeight: "500", color: "#888", fontSize: "13px", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>Quantidade</th>
                        <th style={{ textAlign: "left", fontWeight: "500", color: "#888", fontSize: "13px", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>Status</th>
                        <th style={{ textAlign: "left", fontWeight: "500", color: "#888", fontSize: "13px", padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>Validade</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.map((teste, index) => (
                        <tr key={index}>
                            <td style={{ padding: "12px", borderBottom: "1px solid #f9f9f9", textAlign: "left" }}>
                                <div className={styles.nomeCell}>
                                    <span className={styles.borda} />
                                    {teste.nome}
                                </div>
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #f9f9f9", textAlign: "left" }}><Badge text={teste.categoria} status="inactive" /></td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #f9f9f9", textAlign: "left" }}>{teste.quantidade}</td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #f9f9f9", textAlign: "left" }}>
                                <Badge
                                    text={teste.status === "ok" ? "Ok" : "Crítico"}
                                    status={teste.status === "ok" ? "active" : "danger"}
                                />
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #f9f9f9", textAlign: "left" }}>{teste.validade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p style={{ fontSize: "13px", color: "#888", margin: "12px 0 0", textAlign: "left", display: "block", width: "100%" }}>
                Total: {filtrados.length} testes
            </p>
        </BaseCard>
    );
};