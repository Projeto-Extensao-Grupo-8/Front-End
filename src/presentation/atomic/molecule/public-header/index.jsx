import Logo from "@/assets/logo.png";
import { useLocation, useNavigate  } from "react-router-dom";
import { Button, LinkText } from "../../atom";
import styles from "./styles.module.css";

export const PublicHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className={styles.header}>
        <img className={styles.img} src={Logo} alt="" onClick={() => {navigate("/")}}/>
      <div>
        <ul className={styles.buttonsContainer}>
          <li>
            <LinkText
              text="Nossos serviços"
              isActive={false}
              redirect="/"
              onClick={() => scrollToSection("servicos")}
            />
          </li>
          <li>
            <LinkText
              text="Nosso time"
              isActive={false}
              redirect="/"
              onClick={() => scrollToSection("nosso-time")}
            />
          </li>
          <li>
            <LinkText
              text="Depoimentos"
              isActive={false}
              redirect="/"
              onClick={() => scrollToSection("depoimentos")}
            />
          </li>
        </ul>
      </div>
      <div className={styles.divButtons}>
        <div className={styles.buttonsContainer}>
          <Button text="Login" onClick={() => {navigate("/login")}} variant="login" />
        </div>
        <div className={styles.buttonsContainer}>
          <Button text="Cadastrar" onClick={() => {navigate("/cadastro")}}/>
        </div>
      </div>
    </header>
  );
};
