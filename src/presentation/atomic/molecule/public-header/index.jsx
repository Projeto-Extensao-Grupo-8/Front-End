import Logo from "@/assets/logo.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, LinkText } from "../../atom";
import styles from "./styles.module.css";

export const PublicHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={styles.header}>
<<<<<<< Updated upstream
      <div className={styles.inner}>
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
            <li>
              <LinkText
                text="Blog"
                isActive={location.pathname === "/blog"}
                redirect="/blog"
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
=======
      <img className={styles.img} src={Logo} alt="" onClick={() => navigate("/")} />

      {/* Links desktop */}
      <div className={styles.desktopNav}>
        <ul className={styles.buttonsContainer}>
          <li>
            <LinkText text="Nossos serviços" isActive={false} redirect="/" onClick={() => scrollToSection("servicos")} />
          </li>
          <li>
            <LinkText text="Nosso time" isActive={false} redirect="/" onClick={() => scrollToSection("nosso-time")} />
          </li>
          <li>
            <LinkText text="Depoimentos" isActive={false} redirect="/" onClick={() => scrollToSection("depoimentos")} />
          </li>
          <li>
            <LinkText text="Blog" isActive={location.pathname === "/blog"} redirect="/blog" />
          </li>
        </ul>
      </div>

      {/* Botões desktop */}
      <div className={styles.desktopButtons}>
        <Button text="Login" onClick={() => navigate("/login")} variant="login" />
        <Button text="Cadastrar" onClick={() => navigate("/cadastro")} />
>>>>>>> Stashed changes
      </div>

      {/* Botão hamburguer (só mobile) */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

      {/* Drawer mobile */}
      <nav className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          <li>
            <LinkText text="Nossos serviços" isActive={false} redirect="/" onClick={() => scrollToSection("servicos")} />
          </li>
          <li>
            <LinkText text="Nosso time" isActive={false} redirect="/" onClick={() => scrollToSection("nosso-time")} />
          </li>
          <li>
            <LinkText text="Depoimentos" isActive={false} redirect="/" onClick={() => scrollToSection("depoimentos")} />
          </li>
          <li>
            <LinkText text="Blog" isActive={location.pathname === "/blog"} redirect="/blog" onClick={() => setMenuOpen(false)} />
          </li>
        </ul>
        <div className={styles.mobileButtons}>
          <Button text="Login" onClick={() => handleNavigate("/login")} variant="login" />
          <Button text="Cadastrar" onClick={() => handleNavigate("/cadastro")} />
        </div>
      </nav>
    </header>
  );
};
