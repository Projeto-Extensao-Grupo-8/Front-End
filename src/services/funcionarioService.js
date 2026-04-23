import { api } from "./api";

export const funcionarioService = {
  async cadastrarUsuario(body) {
    const { data } = await api.post("/usuarios/cadastro", body);
    return data;
  },
  async cadastrar(body) {
    const { data } = await api.post("/funcionarios", body);
    return data;
  },
  async listar(pagina = 1, tamanho = 50) {
    const { data } = await api.get("/funcionarios", { params: { pagina, tamanho } });
    return Array.isArray(data) ? data : [];
  },
  async ativar(id) {
    await api.patch(`/funcionarios/ativar/${id}`);
  },
  async desativar(id) {
    await api.patch(`/funcionarios/desativar/${id}`);
  },
  async getKpis() {
    const { data } = await api.get("/funcionarios/kpisGestaoFuncionarios");
    return data;
  },
};
