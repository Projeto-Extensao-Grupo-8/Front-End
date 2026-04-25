import { useState } from "react";
import { Button, Input } from "../../atom";
import styles from "./styles.module.css";

const maskCEP = (value) => {
  const d = value.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
};

const validate = (data) => {
  const errs = {};
  if (data.cep.replace(/\D/g, "").length !== 8)
    errs.cep = "CEP deve conter exatamente 8 dígitos";
  if (!data.numero.trim()) errs.numero = "Número é obrigatório";
  return errs;
};

export const RegisterFormStepTwo = ({ data, onChange, finish, prev }) => {
  const [errors, setErrors] = useState({});

  const handle = (field) => (e) => {
    let value = e.target.value;
    if (field === "cep") value = maskCEP(value);
    onChange(field, value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFinish = () => {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    finish();
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>CEP:</p>
        <Input value={data.cep} onChange={handle("cep")} placeholder="00000-000" />
        {errors.cep && <span className={styles.fieldError}>{errors.cep}</span>}
      </div>

      <div className={styles.divContainer}>
        <div className={styles.inputContainer}>
          <p>Número:</p>
          <Input value={data.numero} onChange={handle("numero")} placeholder="Ex: 123" />
          {errors.numero && <span className={styles.fieldError}>{errors.numero}</span>}
        </div>
        <div className={styles.inputContainer}>
          <p>Complemento:</p>
          <Input value={data.complemento} onChange={handle("complemento")} placeholder="Apto 42, Bloco B..." />
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
        <Button text="Cadastrar" onClick={handleFinish} />
      </div>
    </div>
  );
};
