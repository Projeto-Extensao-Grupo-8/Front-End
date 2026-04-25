import { api } from "./api";

export const agendamentoService = {
  async getKpis() {
    const { data } = await api.get("/consultas/kpisDashboardAgendamentos");
    return data;
  },

  async getGraficoDesempenhoSemanal() {
    const { data } = await api.get("/consultas/graficoDesempenhoSemanal");

    return data.map((item) => ({
      label: item.status ?? "N/A",
      value: Number(item.quantidade ?? 0),
    }));
  },

  async getGraficoDistribuicaoHorario() {
    const { data } = await api.get("/consultas/graficoPeriodo");

    return data.map((item) => ({
      month: item.periodo ?? "N/A",
      value: Number(item.quantidade ?? 0),
    }));
  },

  async getGraficoAvaliacaoFuncionarios() {
    const { data } = await api.get("/consultas/graficoPorFuncionario");

    return data.map((item) => ({
      name: item.nome,
      cinco: Number(item.cincoEstrelas ?? 0),
      quatro: Number(item.quatroEstrelas ?? 0),
      tres: Number(item.tresEstrelas ?? 0),
      duas: Number(item.duasEstrelas ?? 0),
      uma: Number(item.umaEstrela ?? 0),
      zero: Number(item.zeroEstrelas ?? 0),
    }));
  },

  async getGraficoAvaliacaoConsultas() {
    const { data } = await api.get("/consultas/graficoPorConsulta");

    return data.map((item) => ({
      name: item.nome,
      cinco: Number(item.cincoEstrelas ?? 0),
      quatro: Number(item.quatroEstrelas ?? 0),
      tres: Number(item.tresEstrelas ?? 0),
      duas: Number(item.duasEstrelas ?? 0),
      uma: Number(item.umaEstrela ?? 0),
      zero: Number(item.zeroEstrelas ?? 0),
    }));
  }
};