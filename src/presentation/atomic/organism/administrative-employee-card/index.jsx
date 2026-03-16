import { Users, UserCheck, UserX, Briefcase } from "lucide-react";
import styles from "./styles.module.css";

const CARD_CONFIG = [
  {
    key: "totalFuncionarios",
    label: "Total de Funcionários",
    iconBg: "blue",
    Icon: Users,
  },
  {
    key: "ativos",
    label: "Ativos",
    iconBg: "green",
    Icon: UserCheck,
  },
  {
    key: "inativos",
    label: "Inativos",
    iconBg: "red",
    Icon: UserX,
  },
  {
    key: "especialidades",
    label: "Especialidades",
    iconBg: "purple",
    Icon: Briefcase,
  },
];

function StockCard({ label, value, iconBg, Icon }) {
  return (
    <div className={`${styles.card} ${styles[`card__accent--${iconBg}`]}`}>
      <div className={styles.card__header}>
        <span className={styles.card__label}>{label}</span>
        <div className={`${styles.card__icon} ${styles[`card__icon--${iconBg}`]}`}>
          <Icon size={20} color="#fff" strokeWidth={2} />
        </div>
      </div>
      <span className={styles.card__value}>{value}</span>
    </div>
  );
}

export default function AdministrativeStockCard({
  totalFuncionarios = 0,
  ativos = 0,
  inativos = 0,
  especialidades = 0,
}) {
  const values = { totalFuncionarios, ativos, inativos, especialidades };

  return (
    <div className={styles.grid}>
      {CARD_CONFIG.map((card) => (
        <StockCard
          key={card.key}
          label={card.label}
          value={values[card.key]}
          iconBg={card.iconBg}
          Icon={card.Icon}
        />
      ))}
    </div>
  );
}