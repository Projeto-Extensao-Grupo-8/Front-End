import React, { useState, useEffect, useRef } from "react";
import { TestimonialCard } from "../testimonial-card";
import styles from "./styles.module.css";

const CARDS_PER_VIEW = 3;
const INTERVAL_MS = 3500;

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const timerRef = useRef(null);

  const testimonials = [
    { id: 1, author: "Mariana Gomes Silva", date: "20/06/2023", text: "O atendimento humanizado fez toda a diferença no meu tratamento. Me sinto acolhida e compreendida em cada sessão. A profissional é extremamente dedicada aos seus pacientes e familiares." },
    { id: 2, author: "João Pedro Silva", date: "10/04/2023", text: "Finalmente encontrei uma clínica onde me sinto à vontade para compartilhar minhas questões. O atendimento humanizado fez toda a diferença no meu tratamento. Minha experiência aqui tem sido transformadora." },
    { id: 3, author: "Ana Eduardo Costa", date: "05/06/2023", text: "Excelente atendimento! A psicóloga me ajudou muito no meu processo de autoconhecimento e lida com a ansiedade de forma muito profissional e acolhedora. Recomendo muito!" },
    { id: 4, author: "Carlos Henrique Almeida", date: "15/07/2023", text: "A clínica oferece um ambiente acolhedor e profissionais qualificados. O suporte emocional recebido foi fundamental para minha recuperação. Muito obrigado!" },
    { id: 5, author: "Maria Clara Santos", date: "20/08/2023", text: "A clínica oferece um ambiente acolhedor e profissionais qualificados. O suporte emocional recebido foi fundamental para minha recuperação. Muito obrigado!" },
    { id: 6, author: "Lucas Oliveira", date: "30/09/2023", text: "O atendimento humanizado fez toda a diferença no meu tratamento. Me sinto acolhido e compreendido em cada sessão. A profissional é extremamente dedicada aos seus pacientes e familiares." },
    { id: 7, author: "Fernanda Lima", date: "12/10/2023", text: "Finalmente encontrei uma clínica onde me sinto à vontade para compartilhar minhas questões. O atendimento humanizado fez toda a diferença no meu tratamento. Minha experiência aqui tem sido transformadora." 

    },
    { id: 8, author: "Rafael Costa", date: "25/11/2023", text: "Excelente atendimento! A psicóloga me ajudou muito no meu processo de autoconhecimento e lida com a ansiedade de forma muito profissional e acolhedora. Recomendo muito!" }
  ];

  // Triplica para garantir que nunca fique vazio durante o reset
  const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const totalOriginal = testimonials.length;

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

  const totalCards = loopedTestimonials.length; // 15

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
            {loopedTestimonials.map((t, i) => (
              <div key={i} className={styles.carouselItem}>
                <TestimonialCard
                  author={t.author}
                  date={t.date}
                  text={t.text}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};