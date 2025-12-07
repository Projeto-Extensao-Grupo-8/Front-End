import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const LinkTextIcon = ({
  redirect,
  text,
  isActive = false,
  Icon,
}) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(redirect);
  };

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={handleRedirect}
    >
      <Icon sx={{ fontSize: 20 }} className={styles.icon} />
      {text}
    </button>
  );
};
