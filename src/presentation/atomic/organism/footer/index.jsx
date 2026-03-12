import React from "react";
import Logo from "@/assets/logo.png";
import styles from "./styles.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.col}>
          <img src={Logo} alt="Flor de Lótus" className={styles.logo} />
          <p className={styles.tagline}>
            Cuidando da sua saúde mental com profissionalismo e acolhimento.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Links Rápidos</h4>
          <ul className={styles.list}>
            <li><a href="/" className={styles.link}>Início</a></li>
            <li><a href="/#sobre" className={styles.link}>Sobre Nós</a></li>
            <li><a href="/#nosso-time" className={styles.link}>Nossos Psicólogos</a></li>
            <li><a href="/#depoimentos" className={styles.link}>Depoimentos</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Serviços</h4>
          <ul className={styles.list}>
            <li><span className={styles.link}>Atendimento Online</span></li>
            <li><span className={styles.link}>Atendimento Presencial</span></li>
            <li><span className={styles.link}>Psicologia Infantil</span></li>
            <li><span className={styles.link}>Nossos Psicólogos</span></li>
            <li><span className={styles.link}>Avaliação Psicológica</span></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contato</h4>
          <ul className={styles.list}>
            <li className={styles.contactItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6 6l.8-.8a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.27 16z"/>
              </svg>
              (11) 22245-4122
            </li>
            <li className={styles.contactItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              contato@flor.com.br
            </li>
            <li className={styles.contactItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Av. Fútbol, 1000, São Paulo, SP
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Clínica Flor de Lótus. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
