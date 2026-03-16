import styles from "./styles.module.css";

export const Input = ({ value, onChange, placeholder, label, type = "text" }) => {
  return (
    <div>
      {
        label && <label className={styles.label}>{label}</label>
      }
      <div className={styles.container}>
        <input
          className={styles.input}
          type={type}
          placeholder={type === "date" ? undefined : (placeholder || "Digite aqui...")}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};