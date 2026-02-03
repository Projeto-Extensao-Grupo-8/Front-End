import { Button, Input } from "../../atom";
import { useState } from 'react'
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [valorInputUsuario, setValorInputUsuario] = useState('');
    const [valorInputSenha, setValorInputSenha] = useState('');

    const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>
            Usuario:
        </p>
        <Input
          value={valorInputUsuario}
          onChange={e => setValorInputUsuario(e.target.value)}
          placeholder="seu@gmail.com"
        />   
      </div>
      <div>
        <p>
            Senha:
        </p>
        <Input
          value={valorInputSenha}
          onChange={e => setValorInputSenha(e.target.value)}
        />   
      </div>
      <div className={styles.buttonsContainer}>
        <Button text="Logar" onClick={() => {navigate("/dashboard")}} />
      </div>
    </div>
  );
};