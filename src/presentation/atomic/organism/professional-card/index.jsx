import React from "react";
import styles from "./styles.module.css";

export const ProfessionalCard = ({ 
  image, 
  name, 
  clinic,
  specialties,
  onViewMore
}) => {
  const specialtiesArray = (() => {
    if (Array.isArray(specialties)) {
      return specialties.map(s => typeof s === 'string' ? s : s?.nome || s).filter(Boolean);
    }
    return specialties ? [specialties] : [];
  })();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {image ? (
          <img src={image} alt={name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}></div>
        )}
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.clinic}>{clinic}</p>
      <div className={styles.specialtiesContainer}>
        <p className={styles.specialtiesLabel}>Especialidades:</p>
        <div className={styles.specialties}>
          {specialtiesArray.length > 0 ? specialtiesArray.map((specialty, index) => (
            <span key={index} className={styles.badge}>{specialty}</span>
          )) : (
            <span className={styles.badge}>Nenhuma especialidade</span>
          )}
        </div>
      </div>

      <button className={styles.button} onClick={onViewMore}>
        Ver mais
      </button>
    </div>
  );
};
