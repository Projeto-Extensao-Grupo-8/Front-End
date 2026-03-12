import React from "react";
import styles from "./styles.module.css";

const StepIndicator = ({ steps = [], icons = [], current = 1 }) => {
  return (
    <div className={styles.container}>
      {steps.map((label, idx) => {
        const stepNumber = idx + 1;
        const isActive = current === stepNumber;
        const isCompleted = current > stepNumber;
        const icon = icons[idx] ?? stepNumber;

        return (
          <div
            key={idx}
            className={[
              styles.step,
              isActive ? styles.active : "",
              isCompleted ? styles.completed : "",
            ].join(" ")}
          >
            <div className={styles.circle}>
              {isCompleted ? "✓" : icon}
            </div>
            <span className={styles.label}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
