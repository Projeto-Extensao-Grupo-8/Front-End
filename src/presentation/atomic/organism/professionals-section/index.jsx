import React, { useState } from "react";
import { ProfessionalCard } from "../professional-card";
import styles from "./styles.module.css";

const CARDS_PER_VIEW = 3;

export const ProfessionalsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const professionals = [
    { id: 1, name: "Solange Lopes", image: null, clinic: "Clínica Presencial", price: 200.00, specialties: ["Ansiedade", "Autoconhecimento"] },
    { id: 2, name: "Ana Paula Ferreira", image: null, clinic: "Clínica Online", price: 200.00, specialties: ["Estresse no trabalho", "TPM", "Depressão", "Ansiedade"] },
    { id: 3, name: "Beatriz Souza", image: null, clinic: "Clínica Presencial", price: 200.00, specialties: ["Psicologia Infantil", "Autismo", "Trauma Interpessoal"] },
    { id: 4, name: "Solange Lopes", image: null, clinic: "Clínica Presencial", price: 200.00, specialties: ["Ansiedade", "Autoconhecimento"] },
    { id: 5, name: "Ana Paula Ferreira", image: null, clinic: "Clínica Online", price: 200.00, specialties: ["Estresse no trabalho", "TPM", "Depressão", "Ansiedade"] },
    { id: 6, name: "Beatriz Souza", image: null, clinic: "Clínica Presencial", price: 200.00, specialties: ["Psicologia Infantil", "Autismo", "Trauma Interpessoal"] }
  ];

  const totalPages = Math.ceil(professionals.length / CARDS_PER_VIEW);

  const handleViewMore = (id) => console.log(`Ver mais do profissional: ${id}`);

 return (
  <section className={styles.section}>
    <h2 className={styles.title}>Conheça nossos profissionais</h2>

    <div className={styles.carouselWrapper}>
      <div className={styles.carouselTrackContainer}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} className={styles.carouselPage}>
              {professionals
                .slice(pageIndex * CARDS_PER_VIEW, pageIndex * CARDS_PER_VIEW + CARDS_PER_VIEW)
                .map((p) => (
                  <ProfessionalCard
                    key={p.id}
                    image={p.image}
                    name={p.name}
                    clinic={p.clinic}
                    price={p.price}
                    specialties={p.specialties}
                    onViewMore={() => handleViewMore(p.id)}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className={styles.nav}>
          <button
            className={styles.navBtn}
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 0}
          >
            &#8249;
          </button>
          <button
            className={styles.navBtn}
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            &#8250;
          </button>
        </div>
      )}
    </div>

    {totalPages > 1 && (
      <div className={styles.dots}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === currentPage ? styles.dotActive : ""}`}
            onClick={() => setCurrentPage(i)}
          />
        ))}
      </div>
    )}
  </section>
);
};

