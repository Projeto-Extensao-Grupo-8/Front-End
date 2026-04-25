import { BaseCard } from "../../atom";

const ResumoItem = ({ title, value, titleColored = false }) => (
    <div style={{
        background: "#fff",
        border: "1px solid #f0f0f0",
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flex: 1,
    }}>
        <p style={{ fontSize: "13px", fontWeight: "500", color: titleColored ? "var(--primary)" : "#333", margin: 0 }}>
            {title}
        </p>
        <p style={{ fontSize: "22px", fontWeight: "600", color: "var(--primary)", margin: 0 }}>
            {value}
        </p>
    </div>
);

export const StockResume = ({ valorTotal, totalUnidades, tiposTestes }) => {
    const valorFormatado = typeof valorTotal === "number"
        ? valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : "0,00";

    return (
        <BaseCard>
            <p style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 20px", textAlign: "left", width: "100%", color: "#333" }}>
                Resumo do Estoque
            </p>
            <div style={{ display: "flex", gap: "16px", width: "100%" }}>
                <ResumoItem title="Valor Total em Estoque" value={`R$ ${valorFormatado}`} titleColored />
                <ResumoItem title="Total de Unidades" value={totalUnidades ?? 0} titleColored />
                <ResumoItem title="Tipos de Testes" value={tiposTestes ?? 0} titleColored />
            </div>
        </BaseCard>
    );
};
