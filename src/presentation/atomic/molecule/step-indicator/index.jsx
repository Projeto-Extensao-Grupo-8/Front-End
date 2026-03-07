import React from "react";
import styles from "./styles.module.css";

const StepIndicator = ({ steps = [], current = 1 }) => {
  return (
    <div className={styles.container}>
      {steps.map((label, idx) => {
        const stepNumber = idx + 1;
        const isActive = current === stepNumber;
        const isCompleted = current > stepNumber;
        return (
          <div
            key={idx}
            className={
              styles.step + " " + (isActive ? styles.active : "") + " " +
              (isCompleted ? styles.completed : "")
            }
          >
            <div className={styles.circle}>{stepNumber}</div>
            <span className={styles.label}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
