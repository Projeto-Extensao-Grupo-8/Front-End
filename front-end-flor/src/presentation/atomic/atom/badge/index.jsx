import styles from "./styles.module.css";

export const Badge = ({ text, status = "active" }) => {
  const badgeClass = () => {
    switch (status) {
      case "active":
        return styles.active;
      default:
        return styles.inactive;
    }
  };

  return <span className={badgeClass()}>{text}</span>;
};
