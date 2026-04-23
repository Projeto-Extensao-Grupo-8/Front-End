// EmployeeModal/index.jsx
import { useEffect, useState, useCallback } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../atom";
import { SelectableCard } from "../../molecule";
import { api } from "../../../../services/api";

function StepDadosPessoais({ data, onChange }) {
  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Dados pessoais</h3>
      <div className={styles.fieldFull}>
        <label>Nome</label>
        <Input value={data.nome || ""} onChange={(e) => onChange("nome", e.target.value)} />
      </div>
            <div className={styles.fieldFull}>
        <label>CPF</label>
        <Input value={data.cpf || ""} onChange={(e) => onChange("cpf", e.target.value)} />
      </div>
      <div className={styles.fieldFull}>
        <label>Data de nascimento</label>
        <Input type="date" value={data.dataNascimento || ""} onChange={(e) => onChange("dataNascimento", e.target.value)} />
      </div>
      <div className={styles.fieldFull}>
        <label>Telefone</label>
        <Input placeholder="(11) 99765-4321" value={data.telefone || ""} onChange={(e) => onChange("telefone", e.target.value)} />
      </div>
    </div>
  );
}

function StepProfissional({ data, onChange, especialidades }) {
  const [novaEspecialidade, setNovaEspecialidade] = useState("");

  const adicionarEspecialidade = () => {
    if (novaEspecialidade.trim() && !data.especialidade.includes(novaEspecialidade.trim())) {
      onChange("especialidade", [...data.especialidade, novaEspecialidade.trim()]);
      setNovaEspecialidade("");
      console.log("Especialidade adicionada:", novaEspecialidade.trim());
    }
  };

  return (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>Dados profissionais</h3>
      <div className={styles.fieldFull}>
        <label>crp</label>
        <Input value={data.crp || ""} onChange={(e) => onChange("crp", e.target.value)} />
      </div>
      {/* <div className={styles.fieldFull}>
        <label>Permissão</label>
        <SelectableCard
          value={data.permissao || ""}
          onChange={(val) => onChange("permissao", val)}
          placeholder="Nível de Permissão"
          options={[
            { label: "Administrador", value: "admin" },
            { label: "Funcionário", value: "funcionario" },
          ]}
        />
      </div> */}
      <div className={styles.fieldFull}>
        <label>Especialidade</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
          {especialidades.map((option, index) => (
            <label key={option.id || index} style={{ display: 'flex', justifyContent: 'left', alignItems: 'left',gap: '20px' }}>
              <input style={{width: '14px '}}
                type="checkbox"
                checked={data.especialidade.includes(option.nome)}
                onChange={(e) => {
                  const newEspecialidade = e.target.checked
                    ? [...data.especialidade, option.nome]
                    : data.especialidade.filter(v => v !== option.nome);
                  onChange("especialidade", newEspecialidade);
                }}
              />
              <span style={{ fontSize: '14px', width: '100%' }}  >
              {option.nome}
              </span>
            </label>
          ))}
        </div>
        {data.especialidade.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <strong>Especialidades selecionadas:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
              {data.especialidade.map((esp, index) => (
                <span key={index} style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                  {esp} <button type="button" onClick={() => onChange("especialidade", data.especialidade.filter(v => v !== esp))} style={{ marginLeft: '5px', cursor: 'pointer' }}>x</button>
                </span>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Input
            placeholder="Adicionar nova especialidade"
            value={novaEspecialidade}
            onChange={(e) => setNovaEspecialidade(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={adicionarEspecialidade} style={{ minWidth: '40px', padding: '8px' }}>+</button>
        </div>
      </div>
    </div>
  );
}

const INITIAL_DATA = {
  nome: "", dataNascimento: "",
  telefone: "", crp: "", especialidade: [],
  cep: "", estado: "", cidade: "", bairro: "",
  logradouro: "", complemento: "", numero: "",
  email: "", senha: "", confirmarSenha: "",
};

export function EmployeeModal({ mode = "cadastrar", initialData = {}, onClose, onSubmit }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ ...INITIAL_DATA, ...initialData });
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    setFormData({ ...INITIAL_DATA, ...initialData });
  }, [initialData]);

  useEffect(() => {
    buscarEspecialidades();
  }, []);

  const buscarEspecialidades = async () => {
    try {
      const response = await api.get("/funcionarios/especialidades");
      setEspecialidades(response.data);
      console.log("Especialidades:", response.data);
    } catch (error) {
      console.error("Nao foi possivel listar as especialidades", error);
    }
  };

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = () => {
    let dataNascimentoFormatada = formData.dataNascimento;
    
    // Converte de YYYY-MM-DD para DD/MM/YYYY para a função formatDateForAPI do pai não quebrar
    if (dataNascimentoFormatada && dataNascimentoFormatada.includes("-")) {
      const [ano, mes, dia] = dataNascimentoFormatada.split("-");
      dataNascimentoFormatada = `${dia}/${mes}/${ano}`;
    }

    const payload = { ...formData, dataNascimento: dataNascimentoFormatada };

    console.log("Submit", payload);
    onSubmit?.(payload);
    onClose?.();
  };

  const STEPS = [
    <StepDadosPessoais data={formData} onChange={handleChange} />,
    <StepProfissional data={formData} onChange={handleChange} especialidades={especialidades} />,
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
          submitText={mode === "cadastrar" ? "Cadastrar" : "Editar"}
        />
      </div>
    </div>
  );
}

function StepEndereco({ data, onChange }) {
  useEffect(() => {
    const cep = data.cep?.replace(/\D/g, "");

    if (cep?.length === 8) {
      const buscarEndereco = async () => {
        try {
          // Formata o CEP com hífen caso a API exija (ex: 04674-225)
          const cepFormatadoParaApi = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
          const response = await api.get(`/endereco/consulta/${cepFormatadoParaApi}`);
          if (response.data) {
            onChange("logradouro", response.data.logradouro);
            onChange("bairro", response.data.bairro);
            onChange("cidade", response.data.cidade);
            onChange("estado", response.data.estado);
          }
        } catch (error) {
          console.error("Não foi possível buscar o endereço pelo CEP", error);
        }
      };
      buscarEndereco();
    }
  }, [data.cep, onChange]);

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

function Stepper({ total, current, onNext, onBack, onSubmit, submitText = "Cadastrar" }) {
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
          <Button variant="ok" text={submitText} onClick={onSubmit} />
        ) : (
          <Button variant="ok" text="Avançar" onClick={onNext} />
        )}
      </div>
    </div>
  );
}
