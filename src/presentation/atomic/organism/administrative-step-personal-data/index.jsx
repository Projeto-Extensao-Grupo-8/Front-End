// EmployeeModal/index.jsx
import { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../atom";
import { funcionarioService } from "../../../../services/funcionarioService";

function maskDate(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function maskCPF(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function toISODate(ddmmyyyy) {
  const digits = ddmmyyyy.replace(/\D/g, "");
  if (digits.length !== 8) return ddmmyyyy;
  return `${digits.slice(4)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
}

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
          <Input placeholder="DD/MM/AAAA" value={data.dataNascimento}
            onChange={(e) => onChange("dataNascimento", maskDate(e.target.value))} />
        </div>
        <div className={styles.field}>
          <label>CPF</label>
          <Input placeholder="000.000.000-00" value={data.cpf}
            onChange={(e) => onChange("cpf", maskCPF(e.target.value))} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Telefone</label>
          <Input placeholder="(11) 99765-4321" value={data.telefone}
            onChange={(e) => onChange("telefone", e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>CRP</label>
          <Input placeholder="06/123456" value={data.CRP}
            onChange={(e) => onChange("CRP", e.target.value)} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Permissionamento</label>
          <select value={data.permissao} onChange={(e) => onChange("permissao", e.target.value)}>
            <option value="">Nível de Permissão</option>
            <option value="4">Administrador</option>
            <option value="3">Funcionário</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Especialidade</label>
          <select value={data.especialidade} onChange={(e) => onChange("especialidade", e.target.value)}>
            <option value="">Selecione</option>
            <option value="Psicanálise">Psicanálise</option>
            <option value="Neuropsicologia">Neuropsicologia</option>
            <option value="Terapia Cognitivo-Comportamental">Terapia Cognitivo-Comportamental</option>
            <option value="Terapia de Casal">Terapia de Casal</option>
          </select>
        </div>
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

function Stepper({ total, current, onNext, onBack, onSubmit, loading }) {
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
          <Button variant="ok" text={loading ? "Cadastrando..." : "Cadastrar"} onClick={onSubmit} />
        ) : (
          <Button variant="ok" text="Avançar" onClick={onNext} />
        )}
      </div>
    </div>
  );
}

const INITIAL_DATA = {
  nome: "", sobrenome: "", dataNascimento: "", cpf: "",
  telefone: "", CRP: "", especialidade: "", permissao: "",
  cep: "", estado: "", cidade: "", bairro: "",
  logradouro: "", complemento: "", numero: "",
  email: "", senha: "", confirmarSenha: "",
};

export function EmployeeModal({ mode = "cadastrar", initialData = {}, onClose, onSuccess }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ ...INITIAL_DATA, ...initialData });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const usuarioBody = {
        nome: `${formData.nome} ${formData.sobrenome}`.trim(),
        email: formData.email,
        dataNascimento: toISODate(formData.dataNascimento),
        telefone: formData.telefone.replace(/\D/g, ""),
        cpf: formData.cpf.replace(/\D/g, ""),
        senha: formData.senha,
        nivelPermissao: formData.permissao || "3",
        cep: formData.cep.replace(/\D/g, ""),
        numero: formData.numero,
        complemento: formData.complemento,
      };

      const usuario = await funcionarioService.cadastrarUsuario(usuarioBody);

      const funcionarioBody = {
        crp: formData.CRP,
        fkUsuario: usuario.id,
        especialidades: formData.especialidade ? [{ nome: formData.especialidade }] : [],
      };

      await funcionarioService.cadastrar(funcionarioBody);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data;
      setError(typeof msg === "string" ? msg : "Erro ao cadastrar. Verifique os campos e tente novamente.");
    } finally {
      setSubmitting(false);
    }
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

        {error && (
          <p style={{ color: "#e85d7a", fontSize: "13px", margin: "8px 0 0", textAlign: "center" }}>
            {error}
          </p>
        )}

        <Stepper
          total={STEPS.length}
          current={step}
          onBack={() => setStep((s) => s - 1)}
          onNext={() => setStep((s) => s + 1)}
          onSubmit={handleSubmit}
          loading={submitting}
        />
      </div>
    </div>
  );
}
