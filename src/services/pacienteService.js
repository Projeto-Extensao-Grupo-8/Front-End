import { api } from "./api";

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export const pacienteService = {
  async getKpiAtivos() {
    const { data } = await api.get("/pacientes/kpiPacientesAtivos");
    return data;
  },

  async getKpiAno(ano) {
    const { data } = await api.get(`/pacientes/kpiPacientesAno/ano/${ano}`);
    return data;
  },

  async getKpiTaxaRetencao() {
    const { data } = await api.get("/pacientes/kpiTaxaRetencao");
    return data;
  },

  async getGraficoRetencao() {
    const { data } = await api.get("/pacientes/graficoTaxaRetencaoMes");
    return data.map((item) => ({
      month: typeof item.mes === "string" ? item.mes.substring(0, 3) : MESES[(item.mes ?? 1) - 1],
      value: Number(item.percentualRetencao),
    }));
  },

  async getGraficoNovosPacientes() {
    const { data } = await api.get("/pacientes/graficoNovosPacientesPorMes");
    return data.map((item) => ({
      month: MESES[(item.mes ?? 1) - 1] || String(item.mes),
      value: Number(item.qtd),
    }));
  },

  async getTop5() {
    const { data } = await api.get("/pacientes/top5Pacientes");
    return Array.isArray(data) ? data : [];
  },
};
