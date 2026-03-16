import React from "react";

const styles = {
  card: {
    background: "#fff9f4",
    borderRadius: 20,
    padding: "24px 20px",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
    border: "1px solid #f0e6db",
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    background: "#fff0e8",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e86b3a",
    fontSize: 16,
    flexShrink: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
    color: "#2a1f1a",
    letterSpacing: "-0.3px",
    margin: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f0e6db",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#2a1f1a",
  },
  itemQty: {
    fontSize: 12,
    color: "#a08070",
  },
  badge: {
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 20,
    whiteSpace: "nowrap",
  },
};

function EstoqueItem({ nome, quantidade, minimo, isLast }) {
  const abaixo = quantidade < minimo;

  return (
    <div style={{ ...styles.item, ...(isLast ? { borderBottom: "none" } : {}) }}>
      <div style={styles.itemInfo}>
        <span style={styles.itemName}>{nome}</span>
        <span style={styles.itemQty}>
          {quantidade} unidade{quantidade !== 1 ? "s" : ""} restante
          {quantidade !== 1 ? "s" : ""}
        </span>
      </div>
      <span
        style={{
          ...styles.badge,
          background: abaixo ? "#e86b3a" : "#4caf7d",
        }}
      >
        Mín: {minimo}
      </span>
    </div>
  );
}

/**
 * @param {{ items: Array<{ nome: string, quantidade: number, minimo: number }> }} props
 */
export default function StockAlert({ items = [] }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconWrapper}>⚠</div>
        <h2 style={styles.title}>Alertas de Estoque</h2>
      </div>

      {items.map((item, i) => (
        <EstoqueItem
          key={i}
          nome={item.nome}
          quantidade={item.quantidade}
          minimo={item.minimo}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  );
}