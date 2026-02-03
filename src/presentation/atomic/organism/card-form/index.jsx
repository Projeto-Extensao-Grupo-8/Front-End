import Logo from "@/assets/logoCard.png";
import styles from "./styles.module.css";

export const CardForm = ({ type, children }) => {

  if(type == "login") {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo"/>    
        </div>
        <div className={styles.containerForm}>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.containerForm}>
          {children}
        </div>
         <div className={styles.logo}>
          <img src={Logo} alt="Logo"/>    
        </div>
      </div>
    );
  }

};