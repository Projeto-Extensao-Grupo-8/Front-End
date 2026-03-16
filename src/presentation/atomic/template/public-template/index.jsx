import { PublicHeader } from "../../molecule";
import { Footer } from "../../organism";
import styles from "./styles.module.css";
import { VLibras } from "../../atom";

export const PublicTemplate = ({ children, hideFooter = false }) => {
  return (
    <div className={styles.wrapper}>
      <VLibras />
      <PublicHeader />
      <main className={styles.container}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
