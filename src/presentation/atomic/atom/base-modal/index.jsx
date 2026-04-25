import styles from "./styles.module.css";

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <div
      style={isOpen ? {} : { display: "none" }}
      className={styles.overlay}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};