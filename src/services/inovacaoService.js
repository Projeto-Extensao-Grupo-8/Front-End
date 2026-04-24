import { api } from "./api";

export const inovacaoService = {
  async gerarLinkWhatsapp({ data, horario, status, idPaciente }) {
    const { data: response } = await api.get("/usuarios/whatsapp-link", {
      params: { data, horario, status, idPaciente },
    });
    return response.link;
  },
};