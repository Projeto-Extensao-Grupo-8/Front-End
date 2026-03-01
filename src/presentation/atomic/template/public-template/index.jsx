import { PublicHeader } from "../../molecule";
import styles from "./styles.module.css";
import { VLibras } from "../../atom";

export const PublicTemplate = ({ children }) => {
  return (
    <div>
      <VLibras />
      <PublicHeader />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
