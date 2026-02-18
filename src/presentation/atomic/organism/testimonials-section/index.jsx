import React from "react";
import { TestimonialCard } from "../testimonial-card";
import styles from "./styles.module.css";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      author: "Mariana Gomes Silva",
      date: "20/06/2023",
      text: "O atendimento humanizado fez toda a diferença no meu tratamento. Me sinto acolhida e compreendida em cada sessão. A profissional é extremamente dedicada aos seus pacientes e familiares.",
    },
    {
      id: 2,
      author: "João Pedro Silva",
      date: "10/04/2023",
      text: "Finalmente encontrei uma clínica onde me sinto à vontade para compartilhar minhas questões. O atendimento humanizado fez toda a diferença no meu tratamento. Minha experiência aqui tem sido transformadora.",
    },
    {
      id: 3,
      author: "Ana Eduardo Costa",
      date: "05/06/2023",
      text: "Excelente atendimento! A psicóloga me ajudou muito no meu processo de autoconhecimento e é lida com a ansiedade de forma muito profissional e acolhedora. Recomendo muito!",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Depoimentos</h2>
        <p className={styles.subtitle}>O que nossos pacientes dizem sobre a nossa clínica</p>
      </div>
      <div className={styles.grid}>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            author={testimonial.author}
            date={testimonial.date}
            text={testimonial.text}
          />
        ))}
      </div>
    </section>
  );
};
