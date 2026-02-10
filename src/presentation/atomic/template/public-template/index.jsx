import { PublicHeader } from "../../molecule";
import styles from "./styles.module.css";
import ReactVLibrasPlugin from '@moreiraste/react-vlibras';

export const PublicTemplate = ({ children }) => {
  return (
    <div>
      <ReactVLibrasPlugin forceOnload={true} position="left" avatar="hosana" opacity="0.8" />
      <PublicHeader />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
