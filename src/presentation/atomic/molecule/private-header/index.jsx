import Logo from "@/assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { LinkText, LinkTextIcon } from "../../atom";
// reuse public header styles so visual appearance stays in sync
import styles from "../public-header/styles.module.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const PrivateHeader = ({ paths, homePath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <img className={styles.img} src={Logo} alt="" onClick={() => navigate(homePath ?? paths[0]?.path ?? "/")}/>
        <div>
          <ul className={styles.buttonsContainer}>
            {paths.map(({ name, path }) => {
              return (
                <li key={name}>
                  <LinkText
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
      </div>
    </header>
  );
};
