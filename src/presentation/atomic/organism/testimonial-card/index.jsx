import React from "react";
import styles from "./styles.module.css";

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const TestimonialCard = ({ author, date, text, stars = 0 }) => {
  const totalStars = Math.max(0, Math.min(5, Number(stars)));

  return (
    <div className={styles.card}>
      <span className={styles.quoteSymbol}>&ldquo;</span>

      <div className={styles.stars}>
        {[...Array(totalStars)].map((_, i) => (
          <span key={i} className={styles.star}>★</span>
        ))}
      </div>

      <p className={styles.text}>{text}</p>

      <div className={styles.authorRow}>
        <div className={styles.avatar}>
          <span className={styles.initials}>{getInitials(author)}</span>
        </div>

        <div>
          <div className={styles.authorName}>{author}</div>
          <div className={styles.authorDate}>{date}</div>
        </div>
      </div>
    </div>
  );
};