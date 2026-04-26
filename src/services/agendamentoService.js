import { api } from "./api.js";

export const agendamentoService = {

  async getKpis() {
    const response = await api.get("/consultas/kpisDashboardAgendamentos");
    return response.data;
  },

  async getKpiCancelamentos() {
    const response = await api.get("/consultas/kpiCancelamentos");
    return response.data;
  },

  async getQtdConsultasHoje() {
    const response = await api.get("/consultas/qtdConsultasHoje");
    return response.data;
  },

  async getQtdConsultasMesAtual() {
    const response = await api.get("/consultas/qtdConsultasMesAtual");
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
    const response = await api.get("/avaliacoes/graficoPorFuncionario");
    return response.data;
  },

  async getGraficoAvaliacaoConsultas() {
    const response = await api.get("/avaliacoes/graficoPorConsulta");
    return response.data;
  },
};