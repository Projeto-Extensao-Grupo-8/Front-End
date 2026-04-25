import { Button, Input } from "../../atom";
import { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../services/api";

const REDIRECT_BY_ROLE = {
  "4": "/admin/dashboard",
  "3": "/psicologo/pacientes",
  "2": "/paciente/perfil",
  "1": "/paciente/perfil",
};

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/usuarios/login", { email, senha });

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify({
        id: data.idUsuario,
        nome: data.nome,
        email: data.email,
        nivelPermissao: data.nivelPermissao,
        idPaciente: data.idPaciente ?? null,
        idFuncionario: data.idFuncionario ?? null,
      }));

      const destino = REDIRECT_BY_ROLE[data.nivelPermissao] ?? "/paciente/perfil";
      navigate(destino);
    } catch {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>E-mail:</p>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          type="email"
        />
      </div>
      <div className={styles.inputContainer}>
        <p>Senha:</p>
        <Input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
        />
      </div>
      <a href="/esqueci-minha-senha" className={styles.forgotPassword}>
        Esqueci minha senha
      </a>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.buttonsContainer}>
        <Button text={loading ? "Entrando..." : "Logar"} onClick={handleLogin} />
      </div>
    </div>
  );
};
