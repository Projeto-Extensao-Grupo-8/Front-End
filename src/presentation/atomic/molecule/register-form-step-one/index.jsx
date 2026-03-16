import { Button, Input } from "../../atom";
import styles from "./styles.module.css";

export const RegisterFormStepOne = ({ data, onChange, next }) => {
  const handle = (field) => (e) => onChange(field, e.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>Nome:</p>
        <Input
          value={data.nome}
          onChange={handle("nome")}
          placeholder="Nome Sobrenome"
        />
      </div>

      <div className={styles.inputContainer}>
        <p>E-mail:</p>
        <Input
          value={data.email}
          onChange={handle("email")}
          placeholder="seu@email.com"
          type="email"
        />
      </div>

      <div className={styles.inputContainer}>
        <p>Telefone:</p>
        <Input
          value={data.telefone}
          onChange={handle("telefone")}
          placeholder="11 99999-9999"
        />
      </div>

      <div className={styles.divContainer}>
        <div className={styles.inputContainer}>
          <p>Data de nascimento:</p>
          <Input
            value={data.dataNascimento}
            onChange={handle("dataNascimento")}
            type="date"
          />
        </div>
        <div className={styles.inputContainer}>
          <p>CPF:</p>
          <Input
            value={data.cpf}
            onChange={handle("cpf")}
            placeholder="000.000.000-00"
          />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <p>Senha:</p>
        <Input
          value={data.senha}
          onChange={handle("senha")}
          placeholder="Ex: Senha1234"
          type="password"
        />
        <span className={styles.hint}>
          8–32 caracteres · apenas letras e números · 1 maiúscula · 1 minúscula · 1 número
        </span>
      </div>

      <div className={styles.buttonsContainer}>
        <Button text="Próximo passo" onClick={next} />
      </div>
    </div>
  );
};
