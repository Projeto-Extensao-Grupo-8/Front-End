import { api } from "./api";

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export const financeiroService = {
    async getKpis() {
        const { data } = await api.get("/consultas/kpisDashboardFinanceira");
        return data;
    },

    async getGraficoConsultasMes() {
        const { data } = await api.get("/consultas/graficoConsultasMes");
        return data.sort((a, b) => a.mes - b.mes).map((item) => ({
            month: MESES[(item.mes ?? 1) - 1],
            value: Number(item.qtd),
        }));
    },

    async getGraficoFaturamentoMensal() {
        const { data } = await api.get("/consultas/graficoFaturamentoMensal");
        return data.sort((a, b) => a.mes - b.mes).map((item) => ({
            month: MESES[(item.mes ?? 1) - 1],
            value: Number(item.valor),
        }));
    },

    async getGraficoComparacaoCusto() {
        const { data } = await api.get("/consultas/graficoComparacaoCusto");
        return data.sort((a, b) => a.mes - b.mes).map((item) => ({
            month: MESES[(item.mes ?? 1) - 1],
            saida: Number(item.valorTeste ?? 0),
            offline: Number(item.valorConsulta ?? 0),
        }));
    },
};