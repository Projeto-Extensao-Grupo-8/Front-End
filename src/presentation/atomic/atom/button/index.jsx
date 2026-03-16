import styles from "./styles.module.css";

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Button = ({
  onClick,
  text,
  type,
  variant = "default",
}) => {

  const buttonClass = () => {
    switch (variant) {
      case "login":    return styles.login;
      case "logoff":   return styles.logoff;
      case "logar":    return styles.logar;
      case "ok":       return styles.ok;
      case "voltar":   return styles.voltar;
      case "cadastrarFunc": return styles.cadastrarFunc;
      default:         return styles.button;
    }
  };

  return (
    <button type={type} className={buttonClass()} onClick={onClick}>
      {variant === "cadastrar" && <PersonIcon />}
      {text}
    </button>
  );
};