import { api } from "./api";

export const testeService = {
  async getKpisGestao() {
    const { data } = await api.get("/testes/kpisGestaoEstoque");
    return data;
  },

  async getKpisResumo() {
    const { data } = await api.get("/testes/kpisResumoEstoque");
    return data;
  },

  async listarTodos() {
    const { data } = await api.get("/testes");
    return Array.isArray(data) ? data : [];
  },

  async cadastrar(body) {
    const { data } = await api.post("/testes", body);
    return data;
  },

  async deletar(id) {
    await api.delete(`/testes/${id}`);
  },

  async atualizar(id, body) {
    const { data } = await api.patch(`/testes/${id}`, body);
    return data;
  },

  async buscarPorCodigo(codigo) {
    const { data } = await api.get(`/testes/buscarPorCodigo/${encodeURIComponent(codigo)}`);
    return data;
  },
};
