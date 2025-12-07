import styles from "./styles.module.css";

export const Button = ({
  onClick,
  text,
  type,
  variant = "default",
}) => {

  const buttonClass = () => {
    switch (variant) {
      case "login":
        return styles.login;
      case "logoff":
        return styles.logoff;
      case "logar":
        return styles.logar;
      case "ok":
        return styles.ok;
      case "voltar":
        return styles.voltar;
      default:
        return styles.button;
    }
  };

  return (
    <button type={type} className={buttonClass()} onClick={onClick}>
      {text}
    </button>
  );

};