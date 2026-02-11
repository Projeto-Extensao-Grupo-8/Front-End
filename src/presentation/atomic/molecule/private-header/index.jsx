import Logo from "@/assets/logo.png";
import { useLocation } from "react-router-dom";
import { LinkText, LinkTextIcon } from "../../atom";
import styles from "./styles.module.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const PrivateHeader = ({ paths }) => {
  const location = useLocation();

  console.log(paths)
  return (
    <header className={styles.header }>
      <img className={styles.img} src={Logo} alt="" onClick={() => {window.location.href = "/"}}/>
      <div>
        <ul className={styles.buttonsContainer}>
          {paths.map(({ name, path }) => {
            return (
              <li>
                <LinkText
                  key={name}
                  text={name}
                  isActive={location.pathname === path}
                  redirect={path}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.buttonsContainer}>
        <LinkTextIcon
          text="Sair"
          redirect="/login"
          Icon={ExitToAppIcon}
        />
      </div>
    </header>
  );
};