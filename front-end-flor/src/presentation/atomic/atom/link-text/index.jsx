// import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const LinkText = ({
//   redirect,
  text,
  isActive = false,
}) => {
//   const navigate = useNavigate();

//   const handleRedirect = () => {
//     navigate(redirect);
//   };

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={()=>{}}
    >
      {text}
    </button>
  );
};