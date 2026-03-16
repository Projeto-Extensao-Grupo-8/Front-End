import styles from "./styles.module.css";

export const Badge = ({ text, status = "active" }) => {
  const badgeClass = () => {
    switch (status) {
      case "active":
        return styles.active;
      case "danger":
        return styles.danger;
      case "information":
        return styles.information  
      default:
        return styles.inactive;
    }
  };

  return <span className={badgeClass()}>{text}</span>;
};
