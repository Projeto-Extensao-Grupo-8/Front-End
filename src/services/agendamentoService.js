import api from "./api.js";

export const agendamentoService = {
  async getKpis() {
    const response = await api.get("/consultas/kpisDashboardAgendamentos");
    return response.data;
  },

  async getGraficoDesempenhoSemanal() {
    const response = await api.get("/consultas/graficoDesempenhoSemanal");
    return response.data;
  },

  async getGraficoDistribuicaoHorario() {
    const response = await api.get("/consultas/graficoPeriodo");
    return response.data;
  },

  async getGraficoAvaliacaoFuncionarios() {
    return [];
  },

  async getGraficoAvaliacaoConsultas() {
    return [];
  },
};