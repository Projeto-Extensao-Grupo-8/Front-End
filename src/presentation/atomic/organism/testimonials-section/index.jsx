import React, { useState, useEffect, useRef } from "react";
import { TestimonialCard } from "../testimonial-card";
import styles from "./styles.module.css";
import { api } from "../../../../services/api";


const CARDS_PER_VIEW = 3;
const INTERVAL_MS = 3500;

const formatarData = (data) => {
  if (!data) return "";
  const date = new Date(data);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const timerRef = useRef(null);

    const [avaliacoes, setAvaliacoes] = useState([]);
  
  
    const buscarAvaliacoes = async () => {
      try {
        const response = await api.get("/avaliacoes/consultas");
        setAvaliacoes(response.data);
      } catch (error) {
        console.error("Nao foi possivel listar as avaliacoes", error);
      }
    };
  
    useEffect(() => {
      buscarAvaliacoes();
    }, []);


  // Triplica para garantir que nunca fique vazio durante o reset
  const loopedAvaliacoes = [...avaliacoes, ...avaliacoes, ...avaliacoes];
  const totalOriginal = avaliacoes.length;

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  // Reseta quando termina o segundo bloco (índice totalOriginal * 2)
  // O terceiro bloco garante que há cards visíveis enquanto o reset acontece
  useEffect(() => {
    if (currentIndex >= totalOriginal * 2) {
      const timeout = setTimeout(() => {
        setAnimated(false);
        setCurrentIndex(totalOriginal); // volta para o início do segundo bloco
      }, 520);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!animated) {
      const timeout = setTimeout(() => setAnimated(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [animated]);

  const totalCards = loopedAvaliacoes.length; // 15

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Depoimentos</h2>
        <p className={styles.subtitle}>O que nossos pacientes dizem sobre a nossa clínica</p>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselTrackContainer}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * (100 / CARDS_PER_VIEW)}%)`,
              transition: animated ? "transform 0.5s ease" : "none",
              width: `100%`,
            }}
          >
            {loopedAvaliacoes.map((t, i) => (
              <div key={i} className={styles.carouselItem}>
                <TestimonialCard
                  author={t.nomePaciente}
                  date={formatarData(t.data)}
                  text={t.descricao}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};