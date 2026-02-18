import React from "react";
import styles from "./styles.module.css";

export const FeatureCard = ({ icon, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
