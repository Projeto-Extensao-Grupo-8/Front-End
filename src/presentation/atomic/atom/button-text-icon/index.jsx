import styles from "./styles.module.css";

export const ButtonTextIcon = ({
  onClick,
  text,
  isActive = false,
  Icon,
}) => {

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <Icon sx={{ fontSize: 20 }} className={styles.icon} />
      {text}
    </button>
  );
};
