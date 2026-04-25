import { api } from "./api";

export const agendamentoService = {
  async getKpis() {
    const { data } = await api.get("/consultas/kpisDashboardAgendamentos");
    return data;
  },

  async getGraficoDesempenhoSemanal() {
    const { data } = await api.get("/consultas/graficoDesempenhoSemanal");

    return data.map((item) => ({
      label: item.status,    
      value: Number(item.quantidade),
    }));
  },

  async getGraficoDistribuicaoHorario() {
    const { data } = await api.get("/consultas/graficoPeriodo");

    return data.map((item) => ({
      label: item.periodo,    
      value: Number(item.quantidade),
    }));
  }
};