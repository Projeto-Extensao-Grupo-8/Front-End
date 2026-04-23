import { useState, useEffect } from "react";

const formatBRL = (v) =>
  (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ResumoFinanceiroNew({ resumo }) {
  const [animado, setAnimado] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimado(true), 100);
  }, []);

  const atual    = resumo?.faturamentoAtual    ?? 0;
  const anterior = resumo?.faturamentoAnterior ?? 0;
  const crescimento = resumo?.crescimentoPercentual ?? 0;
  const positivo = crescimento >= 0;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "32px 28px 28px",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0 8px 40px rgba(0,0,0,0.09)",
        fontFamily: "'Georgia', serif",
        opacity: animado ? 1 : 0,
        transform: animado ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <h2
        style={{
          margin: "0 0 24px",
          fontSize: "22px",
          fontWeight: "700",
          color: "#1a1a2e",
          letterSpacing: "-0.3px",
        }}
      >
        Resumo Financeiro
      </h2>

      <div
        style={{
          background: "#faf9fb",
          borderRadius: "16px",
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {[
          { label: "Mês Atual:", valor: formatBRL(atual) },
          { label: "Mês Anterior:", valor: formatBRL(anterior) },
        ].map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span style={{ fontSize: "13px", color: "#888" }}>{item.label}</span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a2e" }}>
              {item.valor}
            </span>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "4px",
            borderTop: "1px solid #eee",
          }}
        >
          <span style={{ fontSize: "13px", color: "#888" }}>Crescimento:</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              {positivo ? (
                <>
                  <polyline points="1,12 6,5 10,8 17,2" stroke="#2db87a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <polyline points="13,2 17,2 17,6"      stroke="#2db87a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </>
              ) : (
                <>
                  <polyline points="1,2 6,9 10,6 17,12" stroke="#e86b3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <polyline points="13,12 17,12 17,8"   stroke="#e86b3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </>
              )}
            </svg>
            <span style={{ fontSize: "13px", fontWeight: "700", color: positivo ? "#2db87a" : "#e86b3a" }}>
              {positivo ? "+ " : ""}{crescimento.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}