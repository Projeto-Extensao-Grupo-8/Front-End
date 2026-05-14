import React, { useEffect, useState } from "react";
import { ProfessionalCard } from "../professional-card";
import styles from "./styles.module.css";
import { api } from "../../../../services/api";

const CARDS_PER_VIEW = 3;

export const ProfessionalsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [funcionarios, setFuncionarios] = useState([]);

  const buscarFuncionarios = async () => {
    try {
      const response = await api.get("/funcionarios/cards");
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Nao foi possivel listar os funcionarios", error);
    }
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const totalPages = Math.ceil(funcionarios.length / CARDS_PER_VIEW);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>Nosso time</div>
        <h2 className={styles.title}>Conheça nossos profissionais</h2>
        <p className={styles.subtitle}>
          Especialistas altamente qualificados, dedicados ao seu bem-estar com empatia e expertise.
        </p>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselTrackContainer}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className={styles.carouselPage}>
                {funcionarios
                  .slice(pageIndex * CARDS_PER_VIEW, pageIndex * CARDS_PER_VIEW + CARDS_PER_VIEW)
                  .map((p) => (
                    <ProfessionalCard
                      key={p.idFuncionario}
                      image={p.fotoPerfil || null}
                      name={p.nomeUsuario}
                      clinic={p.modalidade}
                      specialties={p.especialidades?.nome || p.especialidades}
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
