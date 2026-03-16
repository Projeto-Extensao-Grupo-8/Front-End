import styles from "./styles.module.css";
import { BaseCard } from "../../atom";
 
export const AdministrativeDataCard = ({ title, value}) => {
  
  return (
    <BaseCard>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <p className={styles.title}>{title}</p>
          <p className={styles.value}>{value}</p>
        </div>
      </div>
    </BaseCard>
  );
};