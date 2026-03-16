import { BaseCard } from "../../atom";
import { DataCard } from "../../molecule";

export const StockResume = ({ valorTotal, totalUnidades, tiposTestes }) => {
    return (
        <BaseCard>
            <p style={{ fontSize: "15px", fontWeight: "500", margin: "0 0 16px" }}>Resumo do Estoque</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                <DataCard title="Valor Total em Estoque" value={`R$ ${valorTotal}`} variant="default" />
                <DataCard title="Total de Unidades" value={totalUnidades} variant="default" />
                <DataCard title="Tipos de Testes" value={tiposTestes} variant="default" />
            </div>
        </BaseCard>
    );
};