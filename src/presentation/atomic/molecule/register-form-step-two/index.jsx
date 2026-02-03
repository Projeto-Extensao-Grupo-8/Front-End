import { useState } from "react";
import { Button, Input } from "../../atom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export const RegisterFormStepTwo = ({ finish, prev }) => {
  const [valorInputUsuario, setValorInputUsuario] = useState("");
  const [valorInputSenha, setValorInputSenha] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    finish
    navigate("/login")
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>CEP:</p>
        <Input
          value={valorInputUsuario}
          onChange={(e) => setValorInputUsuario(e.target.value)}
          placeholder="Seu CEP"
        />
      </div>
      <div className={styles.divContainer}>
        <div className={styles.inputContainer}>
          <p>Estado</p>
          <Input
            value={valorInputUsuario}
            onChange={(e) => setValorInputUsuario(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <p>Cidade:</p>
          <Input
            value={valorInputUsuario}
            onChange={(e) => setValorInputUsuario(e.target.value)}
            placeholder="123.456.789.0"
          />
        </div>
      </div>
      <div className={styles.divContainer}>
        <div className={styles.inputContainer}>
          <p>Rua</p>
          <Input
            value={valorInputUsuario}
            onChange={(e) => setValorInputUsuario(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <p>Número:</p>
          <Input
            value={valorInputUsuario}
            onChange={(e) => setValorInputUsuario(e.target.value)}
            placeholder="123.456.789.0"
          />
        </div>
      </div>
      <div>
        <p>Bairro</p>
        <Input
          value={valorInputSenha}
          onChange={(e) => setValorInputSenha(e.target.value)}
        />
      </div>
      <div>
        <p>Complemento</p>
        <Input
          value={valorInputSenha}
          onChange={(e) => setValorInputSenha(e.target.value)}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button text="Voltar" variant="voltar" onClick={prev} />
        <Button text="Cadastrar" variant= "" onClick={handleSubmit} />
      </div>
    </div>
  );
};
