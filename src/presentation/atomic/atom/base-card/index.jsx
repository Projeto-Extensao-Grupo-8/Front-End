import styles from "./styles.module.css";

export const BaseCard = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
