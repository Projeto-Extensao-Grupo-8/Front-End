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

  async getGraficoConsultasMes() {
    const response = await api.get("/consultas/graficoConsultasMes");
    return response.data;
  },

  async getGraficoFaturamentoMensal() {
    const response = await api.get("/consultas/graficoFaturamentoMensal");
    return response.data;
  },

  async getResumoFinanceiro() {
    const response = await api.get("/consultas/resumoFinanceiro");
    return response.data;
  },

  async getGraficoComparacaoCustoReceita() {
    const response = await api.get("/consultas/graficoComparacaoCusto");
    return response.data;
  },

  async getQtdConsultasFuncionario(idFuncionario) {
    const response = await api.get(
      `/consultas/qtdFuncionarioConsultas/${idFuncionario}`
    );
    return response.data;
  },

  async getQtdConsultasPaciente(idPaciente) {
    const response = await api.get(
      `/consultas/qtdPacienteConsultas/${idPaciente}`
    );
    return response.data;
  },

  async getConsultasHoje() {
    const response = await api.get("/consultas/filtrarConsultasHoje");
    return response.data;
  },

  async getConsultasHojePorFuncionario(idFuncionario) {
    const response = await api.get(
      `/consultas/filtrarConsultasHoje/${idFuncionario}`
    );
    return response.data;
  },
};