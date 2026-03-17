// EmployeeModal/index.jsx
import { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../atom";
import { SelectableCard } from "../../molecule";

function StepDadosPessoais({ data, onChange }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Dados pessoais</h3>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Nome</label>
          <Input value={data.nome} onChange={(e) => onChange("nome", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Sobrenome</label>
          <Input value={data.sobrenome} onChange={(e) => onChange("sobrenome", e.target.value)} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Data de nascimento</label>
          <Input value={data.dataNascimento} onChange={(e) => onChange("dataNascimento", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>CPF</label>
          <Input placeholder="000.000.000-00" value={data.cpf} onChange={(e) => onChange("cpf", e.target.value)} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Telefone</label>
          <Input placeholder="(11) 99765-4321" value={data.telefone} onChange={(e) => onChange("telefone", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Permissionamento</label>
          <SelectableCard
            value={data.permissao}
            onChange={(val) => onChange("permissao", val)}
            placeholder="Nível de Permissão"
            options={[
              { label: "Administrador", value: "admin" },
              { label: "Funcionário", value: "funcionario" },
            ]}
          />
        </div>
      </div>
      <div className={styles.fieldFull}>
        <label>Especialidade</label>
        <SelectableCard
          value={data.especialidade}
          onChange={(val) => onChange("especialidade", val)}
          placeholder="Selecione a espec."
          options={[
            { label: "Psicanálise", value: "psicanalise" },
            { label: "Neuropsicologia", value: "neuropsicologia" },
            { label: "Terapia Cognitivo-Comportamental", value: "tcc" },
            { label: "Terapia de Casal", value: "casal" },
          ]}
        />
      </div>
    </div>
  );
}

function StepEndereco({ data, onChange }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Endereço</h3>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>CEP:</label>
          <Input placeholder="00000-000" value={data.cep} onChange={(e) => onChange("cep", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Estado:</label>
          <Input value={data.estado} onChange={(e) => onChange("estado", e.target.value)} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Cidade:</label>
          <Input value={data.cidade} onChange={(e) => onChange("cidade", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Bairro:</label>
          <Input value={data.bairro} onChange={(e) => onChange("bairro", e.target.value)} />
        </div>
      </div>
      <div className={styles.fieldFull}>
        <label>Logradouro:</label>
        <Input value={data.logradouro} onChange={(e) => onChange("logradouro", e.target.value)} />
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Complemento:</label>
          <Input value={data.complemento} onChange={(e) => onChange("complemento", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Número:</label>
          <Input value={data.numero} onChange={(e) => onChange("numero", e.target.value)} />
        </div>
      </div>
    </div>
  );
}

function StepDadosAcesso({ data, onChange }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Dados de acesso</h3>
      <div className={styles.fieldFull}>
        <label>E-mail:</label>
        <Input placeholder="email@exemplo.com" value={data.email} onChange={(e) => onChange("email", e.target.value)} />
      </div>
      <div className={styles.fieldFull}>
        <label>Senha (Será redefinida no primeiro login):</label>
        <Input type="password" value={data.senha} onChange={(e) => onChange("senha", e.target.value)} />
      </div>
      <div className={styles.fieldFull}>
        <label>Confirmar Senha:</label>
        <Input type="password" value={data.confirmarSenha} onChange={(e) => onChange("confirmarSenha", e.target.value)} />
      </div>
    </div>
  );
}

function Stepper({ total, current, onNext, onBack, onSubmit }) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div className={styles.stepperWrapper}>
      <div className={styles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
          />
        ))}
      </div>
      <div className={styles.stepperActions}>
        {!isFirst && (
          <Button variant="voltar" text="Voltar" onClick={onBack} />
        )}
        {isLast ? (
          <Button variant="ok" text="Cadastrar" onClick={onSubmit} />
        ) : (
          <Button variant="ok" text="Avançar" onClick={onNext} />
        )}
      </div>
    </div>
  );
}

const INITIAL_DATA = {
  nome: "", sobrenome: "", dataNascimento: "", cpf: "",
  telefone: "", CRP: "", especialidade: "",
  cep: "", estado: "", cidade: "", bairro: "",
  logradouro: "", complemento: "", numero: "",
  email: "", senha: "", confirmarSenha: "",
};

export function EmployeeModal({ mode = "cadastrar", initialData = {}, onClose, onSubmit }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ ...INITIAL_DATA, ...initialData });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submit", formData);
    onSubmit?.(formData);
    onClose?.();
  };

  const STEPS = [
    <StepDadosPessoais data={formData} onChange={handleChange} />,
    <StepEndereco data={formData} onChange={handleChange} />,
    <StepDadosAcesso data={formData} onChange={handleChange} />,
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {mode === "cadastrar" ? "Cadastrar Novo Funcionário" : "Editar Funcionário"}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {STEPS[step]}

        <Stepper
          total={STEPS.length}
          current={step}
          onBack={() => setStep((s) => s - 1)}
          onNext={() => setStep((s) => s + 1)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}