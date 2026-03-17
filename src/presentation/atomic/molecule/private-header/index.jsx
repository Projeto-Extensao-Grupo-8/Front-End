import Logo from "@/assets/logo.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LinkText, LinkTextIcon } from "../../atom";
import styles from "./styles.module.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const PrivateHeader = ({ paths, homePath }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <img className={styles.img} src={Logo} alt="" onClick={() => { window.location.href = homePath ?? "/"; }} />

        {/* Links desktop */}
        <div className={styles.desktopNav}>
          <ul>
            {paths.map(({ name, path }) => (
              <li key={name}>
                <LinkText text={name} isActive={location.pathname === path} redirect={path} />
              </li>
            ))}
          </ul>
        </div>

        {/* Sair desktop */}
        <div className={styles.desktopSair}>
          <LinkTextIcon text="Sair" redirect="/login" Icon={ExitToAppIcon} />
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
      </div>

      {/* Overlay */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

      {/* Drawer mobile */}
      <nav className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          {paths.map(({ name, path }) => (
            <li key={name}>
              <LinkText
                text={name}
                isActive={location.pathname === path}
                redirect={path}
                onClick={() => setMenuOpen(false)}
              />
            </li>
          ))}
        </ul>
        <div className={styles.mobileSair}>
          <LinkTextIcon text="Sair" redirect="/login" Icon={ExitToAppIcon} />
        </div>
      </nav>
    </header>
  );
};
