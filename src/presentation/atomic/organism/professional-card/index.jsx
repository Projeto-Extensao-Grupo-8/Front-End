import React from "react";
import styles from "./styles.module.css";

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const ProfessionalCard = ({ image, name, clinic, specialties }) => {
  const specialtiesArray = (() => {
    if (Array.isArray(specialties)) {
      return specialties.map((s) => (typeof s === "string" ? s : s?.nome || s)).filter(Boolean);
    }
    return specialties ? [specialties] : [];
  })();

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        {image ? (
          <img src={image} alt={name} className={styles.avatarImg} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <span className={styles.initials}>{getInitials(name)}</span>
          </div>
        )}
      </div>
      <h3 className={styles.name}>{name}</h3>
      {clinic && <p className={styles.role}>{clinic}</p>}
      {specialtiesArray.length > 0 && (
        <div className={styles.tags}>
          {specialtiesArray.map((s, i) => (
            <span key={i} className={styles.tag}>{s}</span>
          ))}
        </div>
      )}
    </div>
  );
};
