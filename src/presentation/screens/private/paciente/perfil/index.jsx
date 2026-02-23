import React from "react";
import { useNavigate } from "react-router-dom";
import { ClientTemplate } from "../../../../atomic/template";
import { Badge } from "../../../../atomic/atom";

import styles from "./styles.module.css";

const Perfil = () => {
  const navigate = useNavigate();

  const history = [
    { date: "17/08/2025", doctor: "Dra. Ana Souza", status: "Concluída" },
    { date: "10/08/2025", doctor: "Dra. Ana Souza", status: "Concluída" },
    { date: "25/07/2025", doctor: "Dr. João Silva", status: "Concluída" },
    { date: "15/07/2025", doctor: "Dra. Maria Lima", status: "Concluída" },
    { date: "08/07/2025", doctor: "Dra. Ana Souza", status: "Concluída" },
  ];

  const tests = [
    { title: "Teste de Depressão (Beck)", date: "Adquirido em 29/03/2025", by: "Por: Dra. Ana", result: "Válido", badge2: "Moderado" },
    { title: "Teste de Ansiedade (BAI)", date: "Adquirido em 23/03/2025", by: "Por: Dra. Ana", result: "Válido", badge2: "Leve" },
  ];

  return (
    <ClientTemplate>
      <div className={styles.page}>
        <h1 className={styles.greeting}>Saudações, João! 👋</h1>

        {/* Profile Card */}
        <div className={styles.profileSection}>
          <div className={styles.profileCard}>
            <div className={styles.profileLeft}>
              <img src="/src/assets/logoCard.png" alt="João" className={styles.avatar} />
            </div>
            <div className={styles.profileCenter}>
              <div className={styles.nameLabel}>Nome:</div>
              <h2 className={styles.name}>João da Silva</h2>
              <div className={styles.contactRow}>
                <span className={styles.contactIcon}>✉️</span>
                <span className={styles.contactText}>joao@email.com</span>
                <span className={styles.spacer}>•</span>
                <span className={styles.contactIcon}>📱</span>
                <span className={styles.contactText}>(11) 1234-4321</span>
              </div>
            </div>
            <div className={styles.profileRight}>
              <button className={styles.editBtn}>✏️ Editar Perfil</button>
            </div>
          </div>
        </div>

        {/* Appointment Card */}
        <div className={styles.appointmentSection}>
          <div className={styles.appointmentCard}>
            <div className={styles.appLeftIcon}>
              <span className={styles.appIconCircle}>📅</span>
            </div>
            <div className={styles.appCenter}>
              <p className={styles.appLabel}>Próxima consulta agendada:</p>
              <p className={styles.appText}>Dra. Ana Souza – 10/09/2025 às 14:00</p>
              <p className={styles.appAction}><a href="#">Consulta Online</a></p>
            </div>
            <div className={styles.appRightBtn}>
              <button className={styles.linkBtn}>Link da Consulta</button>
            </div>
          </div>
        </div>

        {/* Two columns: History + Tests */}
        <div className={styles.twoColumns}>
          {/* Histórico de Consultas */}
          <div className={styles.historyColumn}>
            <div className={styles.historyCard}>
              <div className={styles.columnHeader}>
                <span className={styles.headerIcon}>📋</span>
                Histórico de Consultas
              </div>
              <ul className={styles.historyList}>
                {history.map((h, idx) => (
                  <li key={idx} className={styles.historyRow}>
                    <div className={styles.historyLeft}>
                      <span className={styles.rowIcon}>📅</span>
                      <span className={styles.historyDate}>{h.date} – {h.doctor}</span>
                    </div>
                    <div className={styles.historyRight}>
                      <button className={styles.avaliarBtn}>⭐ Avaliar Consulta</button>
                      <Badge text={h.status} status="active" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Histórico de Testes */}
          <div className={styles.testsColumn}>
            <div className={styles.testsCard}>
              <div className={styles.columnHeader}>
                <span className={styles.headerIcon}>📊</span>
                Histórico de Testes
              </div>
              <ul className={styles.testsList}>
                {tests.map((t, i) => (
                  <li key={i} className={styles.testRowContainer}>
                    <div className={styles.testRow}>
                      <div className={styles.testLeft}>
                        <span className={styles.rowIcon}>📋</span>
                        <div>
                          <div className={styles.testTitle}>{t.title}</div>
                          <div className={styles.testMeta}>{t.date}</div>
                          <div className={styles.testMeta}>{t.by}</div>
                        </div>
                      </div>
                      <div className={styles.testRight}>
                        <Badge text={t.result} status="active" />
                        <Badge text={t.badge2} status="inactive" />
                      </div>
                    </div>
                    <div className={styles.testFooter}>
                      <input type="text" className={styles.inputMoreInfo} placeholder="Ver mais informações" readOnly />
                    </div>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </div>
    </ClientTemplate>
  );
};

export default Perfil;
