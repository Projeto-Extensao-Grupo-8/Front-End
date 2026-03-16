import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { mes: "Jan", valor: 11200 },
  { mes: "Fev", valor: 12400 },
  { mes: "Mar", valor: 11800 },
  { mes: "Abr", valor: 13100 },
  { mes: "Mai", valor: 13980 },
  { mes: "Jun", valor: 15400 },
];

const formatBRL = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ResumoFinanceiro() {
  const [animado, setAnimado] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimado(true), 100);
  }, []);

  const atual = 15400;
  const anterior = 13980;
  const crescimento = (((atual - anterior) / anterior) * 100).toFixed(1);

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
            margin: "0 0 20px",
            fontSize: "22px",
            fontWeight: "700",
            color: "#1a1a2e",
            letterSpacing: "-0.3px",
          }}
        >
          Resumo Financeiro
        </h2>

        <div style={{ height: 140, marginBottom: 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="gradFinanceiro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f4a7b0" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#f4a7b0" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 11, fill: "#aaa", fontFamily: "Georgia, serif" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "12px",
                  fontFamily: "Georgia, serif",
                  padding: "8px 12px",
                }}
                formatter={(v) => [formatBRL(v), "Valor"]}
                labelStyle={{ color: "#aaa", marginBottom: 2 }}
                cursor={{ stroke: "#f4a7b0", strokeWidth: 1.5 }}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#e87c8d"
                strokeWidth={2.5}
                fill="url(#gradFinanceiro)"
                dot={false}
                activeDot={{ r: 5, fill: "#e87c8d", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

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
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "13px", color: "#888" }}>{item.label}</span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a2e" }}>
                {item.valor}
              </span>
            </div>
          ))}

          {/* Crescimento */}
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
                <polyline
                  points="1,12 6,5 10,8 17,2"
                  stroke="#2db87a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <polyline
                  points="13,2 17,2 17,6"
                  stroke="#2db87a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#2db87a" }}>
                + {crescimento}%
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}