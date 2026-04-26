import { api } from "./api";

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export const agendamentoService = {

  async getKpis() {
    const { data } = await api.get("/consultas/kpisDashboardAgendamentos");

    return {
      agendamentosSemana: Number(data?.kpiAgendamentosSemana ?? 0),
      taxaComparecimento: data?.kpiTaxaComparecimento ?? "0%",
      consultasRealizadas: Number(data?.kpiConsultasRealizadas ?? 0),
      cancelamentos: data?.kpiCancelamentos ?? [],
    };
  },

  async getGraficoDesempenhoSemanal() {
    const { data } = await api.get("/consultas/graficoDesempenhoSemanal");

    const resultado = DIAS.map((dia) => ({
      day: dia,
      agendadas: 0,
      realizadas: 0,
      canceladas: 0,
    }));

    if (!data || data.length === 0) {
      return resultado;
    }

    const diaIndex = 1; // Segunda-feira

    data.forEach((item) => {
      const status = item?.status;
      const qtd = Number(item?.quantidade ?? 0);

      if (status === "CONFIRMADA" || status === "PENDENTE") {
        resultado[diaIndex].agendadas += qtd;
      }

      if (status === "REALIZADA") {
        resultado[diaIndex].realizadas += qtd;
      }

      if (status === "CANCELADA") {
        resultado[diaIndex].canceladas += qtd;
      }
    });

    return resultado;
  },

  async getGraficoDistribuicaoHorario() {
    const { data } = await api.get("/consultas/graficoPeriodo");

    const faixas = [
      { label: "8:00 - 10:00", value: 0 },
      { label: "10:00 - 12:00", value: 0 },
      { label: "13:00 - 15:00", value: 0 },
      { label: "15:00 - 17:00", value: 0 },
      { label: "17:00 - 18:00", value: 0 },
    ];

    if (!data || data.length === 0) {
      return faixas;
    }

    data.forEach((item) => {
      const periodo = (item?.periodo || "").toLowerCase();
      const qtd = Number(item?.quantidade ?? 0);

      if (periodo.includes("08") || periodo.includes("09")) {
        faixas[0].value += qtd;
      } else if (periodo.includes("10") || periodo.includes("11")) {
        faixas[1].value += qtd;
      } else if (periodo.includes("13") || periodo.includes("14")) {
        faixas[2].value += qtd;
      } else if (periodo.includes("15") || periodo.includes("16")) {
        faixas[3].value += qtd;
      } else if (periodo.includes("17") || periodo.includes("18")) {
        faixas[4].value += qtd;
      }
    });

    return faixas;
  },

  async getGraficoAvaliacaoFuncionarios() {
    const { data } = await api.get("/avaliacoes/graficoPorFuncionario");

    return (data || []).map((item) => ({
      name: item?.nome ?? "Sem nome",
      cinco: Number(item?.cincoEstrelas ?? 0),
      quatro: Number(item?.quatroEstrelas ?? 0),
      tres: Number(item?.tresEstrelas ?? 0),
      duas: Number(item?.duasEstrelas ?? 0),
      uma: Number(item?.umaEstrela ?? 0),
      zero: Number(item?.zeroEstrelas ?? 0),
    }));
  },

  async getGraficoAvaliacaoConsultas() {
    const { data } = await api.get("/avaliacoes/graficoPorConsulta");

    return (data || []).map((item) => ({
      name: item?.nome ?? item?.descricao ?? "Consulta",
      cinco: Number(item?.cincoEstrelas ?? 0),
      quatro: Number(item?.quatroEstrelas ?? 0),
      tres: Number(item?.tresEstrelas ?? 0),
      duas: Number(item?.duasEstrelas ?? 0),
      uma: Number(item?.umaEstrela ?? 0),
      zero: Number(item?.zeroEstrelas ?? 0),
    }));
  },
};