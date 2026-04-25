import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Button } from "../../atom";
import { testeService } from "../../../../services/testeService";

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

// ─── Step Busca — Selecionar teste existente ─────────────────────────────────

function StepBusca({ onEncontrado }) {
  const [testes, setTestes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [erro, setErro] = useState(null);

  useEffect(() => {
    testeService.listarTodos()
      .then(setTestes)
      .catch(() => setErro("Erro ao carregar testes."))
      .finally(() => setCarregando(false));
  }, []);

  const filtrados = testes.filter((t) =>
    t.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    t.codigo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={styles.stepContent}>
      <p style={{ margin: "0 0 10px", fontSize: "14px", color: "#555" }}>
        Selecione o teste que já está em estoque:
      </p>

      <div className={styles.fieldRow}>
        <FieldIcon d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        <input
          className={styles.input}
          placeholder="Buscar por nome ou código..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          autoFocus
        />
      </div>

      {erro && (
        <p style={{ color: "#e85d7a", fontSize: "13px", margin: "8px 0 0", textAlign: "center" }}>
          {erro}
        </p>
      )}

      <div style={{ marginTop: "10px", maxHeight: "220px", overflowY: "auto", border: "1px solid #f0f0f0", borderRadius: "8px" }}>
        {carregando ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#888", fontSize: "13px" }}>Carregando...</p>
        ) : filtrados.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#888", fontSize: "13px" }}>Nenhum teste encontrado</p>
        ) : filtrados.map((teste) => (
          <div
            key={teste.idTeste}
            onClick={() => onEncontrado(teste)}
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid #f5f5f5",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#fff5f7"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <div>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>{teste.nome}</span>
              <span style={{ fontSize: "12px", color: "#888", marginLeft: "8px" }}>{teste.codigo}</span>
            </div>
            <span style={{ fontSize: "12px", color: "#aaa" }}>{teste.categoria}</span>
          </div>
        ))}
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
          <input className={styles.input} placeholder="Nome do teste"
            value={data.nome} onChange={(e) => onChange("nome", e.target.value)} />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <input className={styles.input} placeholder="Código (ex: WISC-V)"
            value={data.codigo} onChange={(e) => onChange("codigo", e.target.value)} />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          <select className={styles.select} value={data.categoria}
            onChange={(e) => onChange("categoria", e.target.value)}>
            <option value="">Selecionar Categoria</option>
            <option value="Inteligência">Inteligência</option>
            <option value="Personalidade">Personalidade</option>
            <option value="Atenção">Atenção</option>
            <option value="Memória">Memória</option>
            <option value="Neuropsicológico">Neuropsicológico</option>
            <option value="Desenvolvimento">Desenvolvimento</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          <input className={styles.input} placeholder="Subcategoria (ex: Inteligência Fluida)"
            value={data.subCategoria} onChange={(e) => onChange("subCategoria", e.target.value)} />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <select className={styles.select} value={data.tipo}
            onChange={(e) => onChange("tipo", e.target.value)}>
            <option value="">Selecionar Tipo</option>
            <option value="Digital">Digital</option>
            <option value="Fisico">Físico</option>
          </select>
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          <input className={styles.input} placeholder="Editora (ex: Vetor Editora)"
            value={data.editora} onChange={(e) => onChange("editora", e.target.value)} />
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 — Preço / Validade ────────────────────────────────────────────────

function StepPrecoValidade({ data, onChange }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.imagePreview}>
        <BoxIcon />
        <span className={styles.imagePreviewLabel}>Imagem do Teste</span>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldRow}>
          <FieldIcon d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          <input className={styles.input} type="number" min="0" step="0.01"
            placeholder="Preço (ex: 150.75)" value={data.preco}
            onChange={(e) => onChange("preco", e.target.value)} />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          <input className={styles.input} type="date" value={data.validade}
            onChange={(e) => onChange("validade", e.target.value)} />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M3 3h18v18H3zM3 9h18M9 21V9" />
          <input className={styles.input} type="number" min="0"
            placeholder="Estoque mínimo" value={data.estoqueMinimo}
            onChange={(e) => onChange("estoqueMinimo", e.target.value)} />
        </div>

        <div className={styles.fieldRow}>
          <FieldIcon d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <select className={styles.select} value={data.quantidade}
            onChange={(e) => onChange("quantidade", e.target.value)}>
            <option value="">Selecionar Quantidade</option>
            {[1, 5, 10, 20, 50, 100].map((n) => (
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
        Teste <strong>{nomeTeste}</strong> foi {jaEmEstoque ? "atualizado" : "cadastrado"} com sucesso!
      </p>
      <Button variant="ok" text="Ok!" onClick={onClose} />
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

function Stepper({ total, current, onNext, onBack, onSubmit, loading, submitLabel }) {
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
          ? <Button variant="ok" text={loading ? "Salvando..." : (submitLabel ?? "Cadastrar")} onClick={onSubmit} />
          : <Button variant="ok" text="Avançar" onClick={onNext} />
        }
      </div>
    </div>
  );
}

// ─── Modal Principal ──────────────────────────────────────────────────────────

const INITIAL_DATA = {
  nome: "", codigo: "", categoria: "", subCategoria: "", tipo: "", editora: "",
  preco: "", validade: "", estoqueMinimo: "", quantidade: "",
};

export function TestModal({ onClose, onSuccess }) {
  const handleSuccess = onSuccess || onClose;

  const [fase, setFase] = useState("confirmacao");
  const [jaEmEstoque, setJaEmEstoque] = useState(false);
  const [existingTesteId, setExistingTesteId] = useState(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResponder = (emEstoque) => {
    setJaEmEstoque(emEstoque);
    if (emEstoque) {
      setFase("busca");
    } else {
      setExistingTesteId(null);
      setFormData(INITIAL_DATA);
      setFase("formulario");
    }
  };

  const handleEncontrado = (teste) => {
    setExistingTesteId(teste.idTeste);
    setFormData({
      nome: teste.nome ?? "",
      codigo: teste.codigo ?? "",
      categoria: teste.categoria ?? "",
      subCategoria: teste.subCategoria ?? "",
      tipo: teste.tipo ?? "",
      editora: teste.editora ?? "",
      preco: String(teste.preco ?? ""),
      validade: String(teste.validade ?? ""),
      estoqueMinimo: String(teste.estoqueMinimo ?? ""),
      quantidade: String(teste.qtd ?? ""),
    });
    setStep(0);
    setFase("formulario");
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const body = {
        codigo: formData.codigo,
        nome: formData.nome,
        categoria: formData.categoria,
        subCategoria: formData.subCategoria,
        editora: formData.editora,
        tipo: formData.tipo,
        preco: parseFloat(formData.preco) || 0,
        estoqueMinimo: parseInt(formData.estoqueMinimo) || 0,
        validade: formData.validade || null,
        qtd: parseInt(formData.quantidade) || 0,
      };

      if (existingTesteId) {
        await testeService.atualizar(existingTesteId, body);
      } else {
        await testeService.cadastrar(body);
      }

      setFase("sucesso");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Este teste já está cadastrado (código duplicado).");
      } else {
        setError("Erro ao salvar teste. Verifique os campos e tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const STEPS = [
    <StepDadosBasicos data={formData} onChange={handleChange} />,
    <StepPrecoValidade data={formData} onChange={handleChange} />,
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          {fase === "formulario" && step > 0 && (
            <button className={styles.backLink} onClick={() => setStep(s => s - 1)}>
              ← Voltar
            </button>
          )}
          {fase !== "sucesso" && (
            <h2 className={styles.title}>
              {fase === "busca"
                ? "Localizar Teste"
                : existingTesteId
                  ? "Atualizar Teste"
                  : "Cadastro de novo Teste"}
            </h2>
          )}
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {fase === "confirmacao" && (
          <StepConfirmacao onResponder={handleResponder} />
        )}

        {fase === "busca" && (
          <StepBusca onEncontrado={handleEncontrado} />
        )}

        {fase === "formulario" && (
          <>
            {STEPS[step]}
            {error && (
              <p style={{ color: "#e85d7a", fontSize: "13px", margin: "8px 0 0", textAlign: "center" }}>
                {error}
              </p>
            )}
            <Stepper
              total={STEPS.length}
              current={step}
              onBack={() => setStep(s => s - 1)}
              onNext={() => setStep(s => s + 1)}
              onSubmit={handleSubmit}
              loading={submitting}
              submitLabel={existingTesteId ? "Atualizar" : "Cadastrar"}
            />
          </>
        )}

        {fase === "sucesso" && (
          <StepSucesso
            nomeTeste={formData.nome}
            jaEmEstoque={jaEmEstoque}
            onClose={handleSuccess}
          />
        )}
      </div>
    </div>
  );
}
