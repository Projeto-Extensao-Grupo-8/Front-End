import { useState } from "react";
import { Button, Input } from "../../atom";
import styles from "./styles.module.css";

export const RegisterFormStepOne = ({ next }) => {
  const [valorInputUsuario, setValorInputUsuario] = useState("");
  const [valorInputSenha, setValorInputSenha] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>Nome:</p>
        <Input
          value={valorInputUsuario}
          onChange={(e) => setValorInputUsuario(e.target.value)}
          placeholder="nome sobrenome"
        />
      </div>
      <div className={styles.inputContainer}>
        <p>E-mail:</p>
        <Input
          value={valorInputUsuario}
          onChange={(e) => setValorInputUsuario(e.target.value)}
          placeholder="seu@gmail.com"
        />
      </div>
      <div className={styles.inputContainer}>
        <p>Telefone:</p>
        <Input
          value={valorInputUsuario}
          onChange={(e) => setValorInputUsuario(e.target.value)}
          placeholder="55 11 9999-9999"
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.divContainer}>
          <div className={styles.inputContainer}>
            <p>Data de nascimento:</p>
            <Input
              value={valorInputUsuario}
              onChange={(e) => setValorInputUsuario(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>CPF:</p>
            <Input
              value={valorInputUsuario}
              onChange={(e) => setValorInputUsuario(e.target.value)}
              placeholder="123.456.789.0"
            />
          </div>
        </div>
      </div>
      <div>
        <p>Senha:</p>
        <Input
          value={valorInputSenha}
          onChange={(e) => setValorInputSenha(e.target.value)}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button text="Próximo passo" onClick={next} />
      </div>
    </div>
  );
};
