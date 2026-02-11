import Logo from "@/assets/logo.png";
import { useLocation, useNavigate  } from "react-router-dom";
import { Button, LinkText } from "../../atom";
import styles from "./styles.module.css";

export const PublicHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
        <img className={styles.img} src={Logo} alt="" onClick={() => {navigate("/")}}/>
      <div>
        <ul className={styles.buttonsContainer}>
          <li>
            <LinkText
              text="Nossos serviços"
              isActive={location.pathname === "/p"}
              redirect="/"
            />
          </li>
          <li>
            <LinkText
              text="Nosso time"
              isActive={location.pathname === "/new"}
              redirect="/new"
            />
          </li>
          <li>
            <LinkText
              text="Depoimentos"
              isActive={location.pathname === "/about"}
              redirect="/about"
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