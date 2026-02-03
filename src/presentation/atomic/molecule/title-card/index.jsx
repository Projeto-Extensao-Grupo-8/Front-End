import { BaseCard } from "../../atom";
import styles from "./styles.module.css";

export const TitleCard = ({ title, subtitle = "", children }) => {
  return (
    <BaseCard>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div>{children}</div>
      </div>
    </BaseCard>
  );
};
