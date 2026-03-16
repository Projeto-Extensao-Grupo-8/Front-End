import { useState } from "react";
import { Button, Input } from "../../../atomic/atom";
import { CardForm } from "../../../atomic/organism";
import { PublicTemplate } from "../../../atomic/template/public-template";
import styles from "./styles.module.css";

export default function EsqueciMinhaSenha() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setEnviado(true);
    }
  };

  return (
    <PublicTemplate>
      <CardForm>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Esqueci minha senha</h2>
            <p className={styles.subtitle}>
              Digite seu e-mail e enviaremos um link para redefinir sua senha.
            </p>
          </div>

          {enviado ? (
            <div className={styles.successMessage}>
              <p>E-mail enviado! Verifique sua caixa de entrada.</p>
            </div>
          ) : (
            <>
              <div className={styles.inputContainer}>
                <p>E-mail:</p>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>
              <Button text="Enviar link" onClick={handleSubmit} />
            </>
          )}

          <a href="/login" className={styles.backLink}>
            Voltar para o login
          </a>
        </div>
      </CardForm>
    </PublicTemplate>
  );
}
