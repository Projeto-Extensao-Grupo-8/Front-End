import { BaseCard } from "../../atom";
import styles from "./styles.module.css";

export const DataCard = ({ title, value, Icon }) => {
  return (
    <BaseCard>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <p>{title}</p>
          <p className={styles.value}>{value}</p>
        </div>
        <div className={styles.iconContainer}>
          <Icon className={styles.Icon} />
        </div>
      </div>
    </BaseCard>
  );
};
