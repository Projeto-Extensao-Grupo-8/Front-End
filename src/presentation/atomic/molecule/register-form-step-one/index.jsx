import { useState } from "react";
import { Button, Input } from "../../atom";
import styles from "./styles.module.css";

const maskCPF = (value) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};

const maskTelefone = (value) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const SENHA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,32}$/;

const validate = (data) => {
  const errs = {};
  if (!data.nome.trim()) errs.nome = "Nome é obrigatório";
  if (!data.email.trim()) {
    errs.email = "E-mail é obrigatório";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errs.email = "Formato de e-mail inválido";
  }
  if (data.telefone.replace(/\D/g, "").length !== 11)
    errs.telefone = "Telefone inválido — use o formato (00) 00000-0000";
  if (!data.dataNascimento) errs.dataNascimento = "Data de nascimento é obrigatória";
  if (data.cpf.replace(/\D/g, "").length !== 11)
    errs.cpf = "CPF deve conter exatamente 11 dígitos";
  if (!data.senha) {
    errs.senha = "Senha é obrigatória";
  } else if (!SENHA_REGEX.test(data.senha)) {
    errs.senha = "A senha não atende aos requisitos abaixo";
  }
  return errs;
};

export const RegisterFormStepOne = ({ data, onChange, next }) => {
  const [errors, setErrors] = useState({});

  const handle = (field) => (e) => {
    let value = e.target.value;
    if (field === "cpf") value = maskCPF(value);
    if (field === "telefone") value = maskTelefone(value);
    onChange(field, value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    next();
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>Nome:</p>
        <Input value={data.nome} onChange={handle("nome")} placeholder="Nome Sobrenome" />
        {errors.nome && <span className={styles.fieldError}>{errors.nome}</span>}
      </div>

      <div className={styles.inputContainer}>
        <p>E-mail:</p>
        <Input value={data.email} onChange={handle("email")} placeholder="seu@email.com" type="email" />
        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
      </div>

      <div className={styles.inputContainer}>
        <p>Telefone:</p>
        <Input value={data.telefone} onChange={handle("telefone")} placeholder="(00) 00000-0000" />
        {errors.telefone && <span className={styles.fieldError}>{errors.telefone}</span>}
      </div>

      <div className={styles.divContainer}>
        <div className={styles.inputContainer}>
          <p>Data de nascimento:</p>
          <Input value={data.dataNascimento} onChange={handle("dataNascimento")} type="date" />
          {errors.dataNascimento && <span className={styles.fieldError}>{errors.dataNascimento}</span>}
        </div>
        <div className={styles.inputContainer}>
          <p>CPF:</p>
          <Input value={data.cpf} onChange={handle("cpf")} placeholder="000.000.000-00" />
          {errors.cpf && <span className={styles.fieldError}>{errors.cpf}</span>}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <p>Senha:</p>
        <Input value={data.senha} onChange={handle("senha")} placeholder="Ex: Senha@1234" type="password" />
        <span className={styles.hint}>
          8–32 caracteres · 1 maiúscula · 1 minúscula · 1 número · 1 caractere especial (ex: @, #, !)
        </span>
        {errors.senha && <span className={styles.fieldError}>{errors.senha}</span>}
      </div>

      <div className={styles.buttonsContainer}>
        <Button text="Próximo passo" onClick={handleNext} />
      </div>
    </div>
  );
};
