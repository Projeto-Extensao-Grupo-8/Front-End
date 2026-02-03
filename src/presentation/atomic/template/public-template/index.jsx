import { PublicHeader } from "../../molecule";
import styles from "./styles.module.css";

export const PublicTemplate = ({ children }) => {
  return (
    <div>
      <PublicHeader />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
