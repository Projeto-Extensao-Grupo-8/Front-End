import { Button, Input } from "../../atom";
import styles from "./styles.module.css";

export const RegisterFormStepTwo = ({ data, onChange, finish, prev }) => {
  const handle = (field) => (e) => onChange(field, e.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>CEP:</p>
        <Input
          value={data.cep}
          onChange={handle("cep")}
          placeholder="00000-000"
        />
      </div>

      <div className={styles.divContainer}>
        <div className={styles.inputContainer}>
          <p>Número:</p>
          <Input
            value={data.numero}
            onChange={handle("numero")}
            placeholder="Ex: 123"
          />
        </div>
        <div className={styles.inputContainer}>
          <p>Complemento:</p>
          <Input
            value={data.complemento}
            onChange={handle("complemento")}
            placeholder="Apto 42, Bloco B..."
          />
        </div>
      </div>

      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={data.newsletter}
          onChange={(e) => onChange("newsletter", e.target.checked)}
          className={styles.checkbox}
        />
        <span>Desejo receber newsletter com novidades e artigos</span>
      </label>

      <div className={styles.buttonsContainer}>
        <Button text="Voltar" variant="voltar" onClick={prev} />
        <Button text="Cadastrar" onClick={finish} />
      </div>
    </div>
  );
};
