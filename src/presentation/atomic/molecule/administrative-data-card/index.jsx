import { BaseCard } from "../../atom";
import styles from "./styles.module.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const AdministrativeDataCard = ({ title, value, subtitle, variant}) => {
  
    const subtitleClass = () => {
        switch (variant) {
          case "positivo":
            return styles.positivo;
          case "negativo":
            return styles.negativo;
        }
      };
  
  return (
    <BaseCard>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <p>{title}</p>
          <p className={styles.value}>{value}</p>
        </div>
        <div className={styles.iconContainer}>
          {variant == "positivo" ? <TrendingUpIcon/> : <TrendingDownIcon/>}
          <p className={subtitleClass()}>{variant == "positivo" ? "+" : "-"}{subtitle}%</p>
        </div>
      </div>
    </BaseCard>
  );
};