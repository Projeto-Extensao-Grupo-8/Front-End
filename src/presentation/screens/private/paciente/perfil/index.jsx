import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientTemplate } from "../../../../atomic/template";
import { Badge } from "../../../../atomic/atom";

import styles from "./styles.module.css";

const Perfil = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "João da Silva",
    email: "joao@email.com",
    telefone: "(11) 1234-4321",
    senhaAntiga: "",
    novaSenha: ""
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // Aqui você pode enviar os dados para a API
    console.log("Dados salvos:", formData);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      nome: "João da Silva",
      email: "joao@email.com",
      telefone: "(11) 1234-4321",
      senhaAntiga: "",
      novaSenha: ""
    });
  };

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
              <button className={styles.editBtn} onClick={() => setIsModalOpen(true)}>✏️ Editar Perfil</button>
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

      {/* Modal de Editar Perfil */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Editar Perfil</h2>
              <button className={styles.closeBtn} onClick={handleCancel}>✕</button>
            </div>
            <p className={styles.modalSubtitle}>Atualize suas informações pessoais</p>
            
            <div className={styles.formGroup}>
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.twoInputsRow}>
              <div className={styles.formGroup}>
                <label>E-mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Telefone *</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.twoInputsRow}>
              <div className={styles.formGroup}>
                <label>Senha antiga:</label>
                <input
                  type="password"
                  name="senhaAntiga"
                  value={formData.senhaAntiga}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="••••"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nova Senha:</label>
                <input
                  type="password"
                  name="novaSenha"
                  value={formData.novaSenha}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="••••"
                />
              </div>
            </div>

            <div className={styles.modalButtons}>
              <button className={styles.cancelBtn} onClick={handleCancel}>Cancelar</button>
              <button className={styles.saveBtn} onClick={handleSaveChanges}>Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}
    </ClientTemplate>
  );
};

export default Perfil;
