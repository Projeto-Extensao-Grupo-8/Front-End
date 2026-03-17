// TestModal/index.jsx
import { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "../../atom";

// ─── Icons ────────────────────────────────────────────────────────────────────

const BoxIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke="#e85d7a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const PlusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke="#e85d7a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const FieldIcon = ({ d }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#e85d7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

// ─── Step 0 — Confirmação ─────────────────────────────────────────────────────

function StepConfirmacao({ onResponder }) {
  return (
    <div className={styles.stepConfirmacao}>
      <p className={styles.confirmacaoTexto}>Teste já em estoque?</p>
      <div className={styles.confirmacaoAcoes}>
        <Button variant="voltar" text="Não" onClick={() => onResponder(false)} />
        <Button variant="ok" text="Sim" onClick={() => onResponder(true)} />
      </div>
    </div>
  );
}

// ─── Step 1 — Dados básicos ───────────────────────────────────────────────────

function StepDadosBasicos({ data, onChange }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.imageUpload}>
        <PlusIcon />
        <span>Adicionar imagem do Teste</span>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldRow}>
          <FieldIcon d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          <input
            className={styles.input}
            placeholder="Digitar nome"
            value={data.nome}
            onChange={(e) => onChange("nome", e.target.value)}
          />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <input
            className={styles.input}
            placeholder="Digitar código"
            value={data.codigo}
            onChange={(e) => onChange("codigo", e.target.value)}
          />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          <select
            className={styles.select}
            value={data.categoria}
            onChange={(e) => onChange("categoria", e.target.value)}
          >
            <option value="">Selecionar Categoria</option>
            <option value="hemograma">Hemograma</option>
            <option value="bioquimica">Bioquímica</option>
            <option value="hormonio">Hormônio</option>
          </select>
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          <select
            className={styles.select}
            value={data.tipo}
            onChange={(e) => onChange("tipo", e.target.value)}
          >
            <option value="">Selecionar Tipo</option>
            <option value="Bipolaridade">Bipolaridade</option>
            <option value="TDAH">TDAH</option>
            <option value="Autismo">Autismo</option>
          </select>
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          <input
            className={styles.input}
            placeholder="Digitar Editora"
            value={data.editora}
            onChange={(e) => onChange("editora", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 — Preço / Validade ────────────────────────────────────────────────

function StepPrecoValidade({ data, onChange, jaEmEstoque }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.imagePreview}>
        <BoxIcon />
        <span className={styles.imagePreviewLabel}>Imagem do Teste</span>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldRow}>
          <FieldIcon d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          <input
            className={styles.input}
            placeholder="Digitar Preço"
            value={data.preco}
            onChange={(e) => onChange("preco", e.target.value)}
          />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          <select
            className={styles.select}
            value={data.validade}
            onChange={(e) => onChange("validade", e.target.value)}
          >
            <option value="">Selecionar Validade</option>
            <option value="30">30 dias</option>
            <option value="60">60 dias</option>
            <option value="90">90 dias</option>
          </select>
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M3 3h18v18H3zM3 9h18M9 21V9" />
          <input
            className={styles.input}
            placeholder="Digitar estoque-mínimo"
            value={data.estoqueMinimo}
            onChange={(e) => onChange("estoqueMinimo", e.target.value)}
          />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <select
            className={styles.select}
            value={data.quantidade}
            onChange={(e) => onChange("quantidade", e.target.value)}
          >
            <option value="">Selecionar Quantidade</option>
            {[1,5,10,20,50,100].map(n => (
              <option key={n} value={n}>{n} unidades</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3 — Sucesso ─────────────────────────────────────────────────────────

function StepSucesso({ nomeTeste, jaEmEstoque, onClose }) {
  return (
    <div className={styles.stepSucesso}>
      <BoxIcon />
      <p className={styles.sucessoTexto}>
        Teste {nomeTeste} foi {jaEmEstoque ? "atualizado" : "cadastrado"} com Sucesso!
      </p>
      <Button variant="ok" text="Ok!" onClick={onClose} />
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

function Stepper({ total, current, onNext, onBack, onSubmit }) {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div className={styles.stepperWrapper}>
      <div className={styles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ""}`} />
        ))}
      </div>
      <div className={styles.stepperActions}>
        {!isFirst && <Button variant="voltar" text="Voltar" onClick={onBack} />}
        {isLast
          ? <Button variant="ok" text="Cadastrar" onClick={onSubmit} />
          : <Button variant="ok" text="Avançar" onClick={onNext} />
        }
      </div>
    </div>
  );
}

// ─── Modal Principal ──────────────────────────────────────────────────────────

const INITIAL_DATA = {
  nome: "", codigo: "", categoria: "", tipo: "", editora: "",
  preco: "", validade: "", estoqueMinimo: "", quantidade: "",
};

export function TestModal({ onClose }) {
  const [fase, setFase] = useState("confirmacao"); // "confirmacao" | "formulario" | "sucesso"
  const [jaEmEstoque, setJaEmEstoque] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResponder = (emEstoque) => {
    setJaEmEstoque(emEstoque);
    setFase("formulario");
  };

  const handleSubmit = () => {
    // Futuramente: POST /api/tests ou PUT /api/tests/:id
    console.log("Submit", { jaEmEstoque, ...formData });
    setFase("sucesso");
  };

  const STEPS = [
    <StepDadosBasicos data={formData} onChange={handleChange} />,
    <StepPrecoValidade data={formData} onChange={handleChange} jaEmEstoque={jaEmEstoque} />,
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          {fase === "formulario" && step > 0 && (
            <button className={styles.backLink} onClick={() => setStep(s => s - 1)}>
              ← Voltar
            </button>
          )}
          {fase !== "sucesso" && (
            <h2 className={styles.title}>Cadastro de novo Teste</h2>
          )}
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Conteúdo por fase */}
        {fase === "confirmacao" && (
          <StepConfirmacao onResponder={handleResponder} />
        )}

        {fase === "formulario" && (
          <>
            {STEPS[step]}
            <Stepper
              total={STEPS.length}
              current={step}
              onBack={() => setStep(s => s - 1)}
              onNext={() => setStep(s => s + 1)}
              onSubmit={handleSubmit}
            />
          </>
        )}

        {fase === "sucesso" && (
          <StepSucesso
            nomeTeste={formData.nome}
            jaEmEstoque={jaEmEstoque}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}