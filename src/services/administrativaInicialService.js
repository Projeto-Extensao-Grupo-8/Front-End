import { api } from "./api";

export const administrativaInicialService = {
  async getConsultasHoje() {
    const { data } = await api.get("/consultas/qtdConsultasHoje");
    return data;
  },

  async getPacientesAtivos() {
    const { data } = await api.get("/pacientes/kpiPacientesAtivos");
    return data;
  },

  async getFaturamentoMes() {
    const { data } = await api.get("/consultas/kpisDashboardFinanceira");
    return data.KpiFaturamentoMes;
  },

  async getConsultasHojeDetalhadas() {
    const { data } = await api.get("/consultas/filtrarConsultasHoje");
    return Array.isArray(data) ? data : [];
  },

  async getAlertasEstoque() {
    const { data } = await api.get("/testes/alertasEstoqueAcabando");
    return Array.isArray(data) ? data : [];
  },

  async getResumoFinanceiro() {
    const { data } = await api.get("/consultas/resumoFinanceiro");
    return Array.isArray(data) ? data[0] : data;
  },
};