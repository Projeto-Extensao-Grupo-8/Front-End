import { Monitor, Package, AlertTriangle, Calendar } from "lucide-react";
import { Button } from "../../../../atomic/atom";
import { AdminTemplate } from "../../../../atomic/template";
import { DataCard, StockResume } from "../../../../atomic/molecule";
import { StockTable, TestModal } from "../../../../atomic/organism";
import { useState } from "react";

export default function Stock() {

    const testes = [
        { nome: "WISC-V", categoria: "Inteligência", quantidade: 15, status: "ok", validade: "30/12/2025" },
        { nome: "BFP - Bateria Fatorial de Personalidade", categoria: "Personalidade", quantidade: 25, status: "ok", validade: "29/06/2026" },
        { nome: "Teste de Atenção Concentrada - AC", categoria: "Atenção", quantidade: 8, status: "critico", validade: "14/09/2025" },
        { nome: "NEO-PI-R", categoria: "Personalidade", quantidade: 20, status: "ok", validade: "19/11/2026" },
    ];
    const [testModalOpen, setTestModalOpen] = useState(false);

    return (
        <AdminTemplate>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

    <div>
        <h1 style={{ fontSize: "28px", fontWeight: "600", margin: 0 }}>Gestão de Estoque</h1>
        <p style={{ fontSize: "15px", color: "#666", margin: "4px 0 0" }}>Gerencie seus testes psicológicos digitais e físicos</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        <DataCard title="Total de Testes Digitais" value={68} Icon={Monitor} variant="default" />
        <DataCard title="Total de Testes Físicos" value={36} Icon={Package} variant="default" />
        <DataCard title="Estoque Baixo/Crítico" value={2} Icon={AlertTriangle} subtitle="Atenção necessária" variant="negativo" />
        <DataCard title="Validade Próxima (90 dias)" value={1} Icon={Calendar} subtitle="Renovar em breve" variant="negativo" />
    </div>

    <div>
        <Button text="+ Cadastrar Novo Teste" variant="cadastrarFunc" onClick={() => setTestModalOpen(true)} />
    </div>
    <StockResume valorTotal="41970,00" totalUnidades={104} tiposTestes={8} />
    <StockTable variant="digital" testes={testes} />
    <StockTable variant="fisico" testes={testes} />
</div>
        {testModalOpen && (
            <TestModal onClose={() => setTestModalOpen(false)} />
        )}
        
        </AdminTemplate>
    );
}