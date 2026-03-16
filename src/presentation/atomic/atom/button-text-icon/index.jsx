import styles from "./styles.module.css";

export const ButtonTextIcon = ({ onClick, text, isActive = false, Icon, className = "" }) => {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ""} ${className}`}
      onClick={onClick}
    >
      <Icon style={{ fontSize: 20 }} className={styles.icon} />
      {text}
    </button>
  );
};