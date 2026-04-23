// administrative-test-detail-card/index.jsx
import { useState } from "react";
import styles from "./styles.module.css";
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

const FieldIcon = ({ d }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="#e85d7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SaveIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

// ─── Modo Visualização ────────────────────────────────────────────────────────

function ViewMode({ teste }) {
  const estoquePercent = Math.min((teste.quantidade / (teste.estoqueMinimo * 5)) * 100, 100);
  const estoqueCritico = teste.quantidade <= teste.estoqueMinimo;

  const formatarPreco = (valor) => {
    if (valor == null) return "—";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  };

  return (
    <div className={styles.viewContent}>
      <div className={styles.imageArea}>
        <BoxIcon />
        <span className={styles.imageLabel}>Imagem do Teste</span>
      </div>

      <div className={styles.estoqueBar}>
        <div className={styles.estoqueBarHeader}>
          <span className={styles.estoqueLabel}>Estoque Atual</span>
          <span className={`${styles.estoqueQtd} ${estoqueCritico ? styles.estoqueCritico : styles.estoqueOk}`}>
            {teste.quantidade} unidades
          </span>
        </div>
        <div className={styles.barTrack}>
          <div
            className={`${styles.barFill} ${estoqueCritico ? styles.barCritico : styles.barOk}`}
            style={{ width: `${estoquePercent}%` }}
          />
        </div>
        <span className={styles.estoqueMin}>Mínimo: {teste.estoqueMinimo} unidades</span>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <FieldIcon d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          <div>
            <span className={styles.infoLabel}>Categoria / Subcategoria</span>
            <span className={styles.infoValue}>{teste.categoria} / {teste.subCategoria ?? "—"}</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <FieldIcon d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          <div>
            <span className={styles.infoLabel}>Editora</span>
            <span className={styles.infoValue}>{teste.editora ?? "—"}</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <FieldIcon d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          <div>
            <span className={styles.infoLabel}>Preço</span>
            <span className={styles.infoValue}>{formatarPreco(teste.preco)}</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <FieldIcon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          <div>
            <span className={styles.infoLabel}>Validade</span>
            <span className={styles.infoValue}>{teste.validade}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modo Edição ──────────────────────────────────────────────────────────────

function EditMode({ data, onChange }) {
  return (
    <div className={styles.editContent}>
      <div className={styles.imageArea}>
        <BoxIcon />
        <span className={styles.imageLabel}>Imagem do Teste</span>
      </div>

      <div className={styles.editGrid}>
        {/* Coluna esquerda */}
        <div className={styles.editCol}>
          <div className={styles.editField}>
            <FieldIcon d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Nome</span>
              <div className={styles.editInputRow}>
                <input className={styles.editInput} value={data.nome}
                  onChange={(e) => onChange("nome", e.target.value)} />
                <EditIcon />
              </div>
            </div>
          </div>

          <div className={styles.editField}>
            <FieldIcon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Código</span>
              <input className={styles.editInput} value={data.codigo}
                onChange={(e) => onChange("codigo", e.target.value)} />
            </div>
          </div>

          <div className={styles.editField}>
            <FieldIcon d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Categoria</span>
              <select className={styles.editSelect} value={data.categoria}
                onChange={(e) => onChange("categoria", e.target.value)}>
                <option value="Autismo">Autismo</option>
                <option value="Inteligência">Inteligência</option>
                <option value="Personalidade">Personalidade</option>
                <option value="Atenção">Atenção</option>
              </select>
            </div>
          </div>

          <div className={styles.editField}>
            <FieldIcon d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Tipo</span>
              <select className={styles.editSelect} value={data.tipo}
                onChange={(e) => onChange("tipo", e.target.value)}>
                <option value="Digital">Digital</option>
                <option value="Físico">Físico</option>
              </select>
            </div>
          </div>

          <div className={styles.editField}>
            <FieldIcon d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Editora</span>
              <select className={styles.editSelect} value={data.editora}
                onChange={(e) => onChange("editora", e.target.value)}>
                <option value="Pearson">Pearson</option>
                <option value="Casa do Psicólogo">Casa do Psicólogo</option>
                <option value="Vetor">Vetor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Coluna direita */}
        <div className={styles.editCol}>
          <div className={styles.editField}>
            <FieldIcon d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Preço</span>
              <input className={styles.editInput} value={data.preco}
                onChange={(e) => onChange("preco", e.target.value)} />
            </div>
          </div>

          <div className={styles.editField}>
            <FieldIcon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Validade</span>
              <input className={styles.editInput} type="date" value={data.validadeISO ?? data.validade}
                onChange={(e) => onChange("validadeISO", e.target.value)} />
            </div>
          </div>

          <div className={styles.editField}>
            <FieldIcon d="M3 3h18v18H3zM3 9h18M9 21V9" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Estoque Mínimo</span>
              <input className={styles.editInput} type="number" value={data.estoqueMinimo}
                onChange={(e) => onChange("estoqueMinimo", e.target.value)} />
            </div>
          </div>

          <div className={styles.editField}>
            <FieldIcon d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <div className={styles.editFieldInner}>
              <span className={styles.editLabel}>Quantidade</span>
              <input className={styles.editInput} type="number" value={data.quantidade}
                onChange={(e) => onChange("quantidade", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal Principal ──────────────────────────────────────────────────────────

export function TestDetailCard({ teste, onClose, onSave }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...teste });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const body = {
        codigo: formData.codigo,
        nome: formData.nome,
        categoria: formData.categoria,
        subCategoria: formData.subCategoria,
        editora: formData.editora,
        tipo: formData.tipo,
        preco: parseFloat(formData.preco) || null,
        estoqueMinimo: parseInt(formData.estoqueMinimo) || null,
        validade: formData.validadeISO || null,
        qtd: parseInt(formData.quantidade) || null,
      };
      await testeService.atualizar(teste.idTeste, body);
      onSave?.(formData);
      setEditing(false);
    } catch (err) {
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerNome}>{teste.nome}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              className={`${styles.editBtn} ${editing ? styles.editBtnActive : ""}`}
              onClick={() => setEditing((e) => !e)}
            >
              {editing ? "Cancelar" : "Editar"}
            </button>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", color: "#fff", fontSize: "16px", cursor: "pointer", lineHeight: 1, padding: "2px 4px" }}
              title="Fechar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        {editing
          ? <EditMode data={formData} onChange={handleChange} />
          : <ViewMode teste={formData} />
        }

        {/* Footer */}
        {error && (
          <p style={{ color: "#e85d7a", fontSize: "13px", textAlign: "center", margin: "0 0 8px" }}>{error}</p>
        )}
        <div className={styles.footer}>
          {editing ? (
            <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
              <SaveIcon /> {saving ? "Salvando..." : "Salvar"}
            </button>
          ) : (
            <button className={styles.saveBtn} onClick={() => setEditing(true)}>
              <EditIcon /> Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}