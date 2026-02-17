import { BaseCard } from "../../atom";
import styles from "./styles.module.css";

export const DataCard = ({ title, value, Icon, subtitle, variant = "default"}) => {
  
    const subtitleClass = () => {
        switch (variant) {
          case "positivo":
            return styles.positivo;
          case "negativo":
            return styles.negativo;
          default:
            return styles.subtitle;
        }
      };
  
  return (
    <BaseCard>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <p>{title}</p>
          <p className={styles.value}>{value}</p>
          <p className={subtitleClass()}>{subtitle}</p>
        </div>
        <div className={styles.iconContainer}>
          {Icon && <Icon className={styles.Icon} />}
        </div>
      </div>
    </BaseCard>
  );
};