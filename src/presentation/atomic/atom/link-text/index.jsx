import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const LinkText = ({
  redirect,
  text,
  isActive = false,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(redirect);
    }
  };

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={handleRedirect}
    >
      {text}
    </button>
  );
};