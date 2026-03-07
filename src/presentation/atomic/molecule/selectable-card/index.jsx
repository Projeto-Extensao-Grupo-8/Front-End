import React from "react";
import styles from "./styles.module.css";

const SelectableCard = ({ title, subtitle, selected, onClick }) => {
  return (
    <div
      className={
        styles.card + " " + (selected ? styles.selected : "")
      }
      onClick={onClick}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default SelectableCard;
