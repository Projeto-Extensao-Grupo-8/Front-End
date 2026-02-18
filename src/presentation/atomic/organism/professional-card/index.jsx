import React from "react";
import styles from "./styles.module.css";

export const ProfessionalCard = ({ 
  image, 
  name, 
  clinic,
  price,
  specialties,
  onViewMore
}) => {
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
      <p className={styles.price}>R$ {price.toFixed(2).replace('.', ',')}</p>
      
      <div className={styles.specialtiesContainer}>
        <p className={styles.specialtiesLabel}>Especialidades:</p>
        <div className={styles.specialties}>
          {specialties.map((specialty, index) => (
            <span key={index} className={styles.badge}>{specialty}</span>
          ))}
        </div>
      </div>

      <button className={styles.button} onClick={onViewMore}>
        Ver mais
      </button>
    </div>
  );
};
