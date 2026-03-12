import React, { useState } from "react";
import { ClientTemplate } from "../../../../atomic/template";
import { Badge } from "../../../../atomic/atom";
import styles from "./styles.module.css";

const history = [
  { date: "17/08/2025", doctor: "Dra. Ana Souza", status: "Concluída", statusType: "active" },
  { date: "10/08/2025", doctor: "Dra. Ana Souza", status: "Concluída", statusType: "active" },
  { date: "25/07/2025", doctor: "Dr. João Silva", status: "Cancelar", statusType: "danger" },
  { date: "15/07/2025", doctor: "Dra. Maria Lima", status: "Concluída", statusType: "active" },
  { date: "08/07/2025", doctor: "Dra. Ana Souza", status: "Concluída", statusType: "active" },
];

const tests = [
  {
    title: "Teste de Depressão (Beck)",
    date: "Adquirido em 29/03/2025",
    by: "Por: Dra. Ana",
    result: "Válido",
    severity: "Moderado",
  },
  {
    title: "Teste de Ansiedade (BAI)",
    date: "Adquirido em 23/03/2025",
    by: "Por: Dra. Ana",
    result: "Válido",
    severity: "Leve",
  },
];

const Perfil = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formData, setFormData] = useState({
    nome: "João da Silva",
    email: "joao@email.com",
    telefone: "(11) 1234-4321",
    senhaAntiga: "",
    novaSenha: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
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
      novaSenha: "",
    });
  };

  const handleOpenRating = () => {
    setRating(0);
    setHoverRating(0);
    setComment("");
    setIsRatingOpen(true);
  };

  const handleSubmitRating = () => {
    console.log("Avaliação enviada:", { rating, comment });
    setIsRatingOpen(false);
  };

  return (
    <ClientTemplate>
      <div className={styles.page}>
        <h1 className={styles.greeting}>Saudações, João! 👋</h1>

        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileLeft}>
            <div className={styles.avatarWrapper}>
              <img src="/src/assets/logoCard.png" alt="João" className={styles.avatar} />
              <span className={styles.avatarEditIcon}>📷</span>
            </div>
          </div>
          <div className={styles.profileCenter}>
            <p className={styles.nameLabel}>Nome:</p>
            <h2 className={styles.name}>João da Silva</h2>
            <div className={styles.contactRow}>
              <span className={styles.contactItem}>✉️ joao@email.com</span>
              <span className={styles.contactDivider}>•</span>
              <span className={styles.contactItem}>📱 (11) 1234-4321</span>
            </div>
          </div>
          <div className={styles.profileRight}>
            <button className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
              ✏️ Editar Perfil
            </button>
          </div>
        </div>

        {/* Next Appointment Card */}
        <div className={styles.appointmentCard}>
          <div className={styles.appIconCircle}>📅</div>
          <div className={styles.appCenter}>
            <p className={styles.appLabel}>Próxima consulta agendada:</p>
            <p className={styles.appText}>Dra. Ana Souza – 10/09/2025 às 14:00</p>
            <div className={styles.appTagRow}>
              <Badge text="🔗 Consulta Online →" status="inactive" />
            </div>
          </div>
          <div className={styles.appRightBtn}>
            <button className={styles.linkBtn}>🔗 Link da Consulta</button>
          </div>
        </div>

        {/* Two columns */}
        <div className={styles.twoColumns}>
          {/* Histórico de Consultas */}
          <div className={styles.columnCard}>
            <div className={styles.columnHeader}>
              <span className={styles.headerIcon}>📋</span>
              Histórico de Consultas
            </div>
            <ul className={styles.historyList}>
              {history.map((h, idx) => (
                <li key={idx} className={styles.historyRow}>
                  <div className={styles.historyLeft}>
                    <span className={styles.rowCalIcon}>📅</span>
                    <span className={styles.historyDate}>
                      {h.date} – {h.doctor}
                    </span>
                  </div>
                  <div className={styles.historyRight}>
                    <button className={styles.avaliarBtn} onClick={handleOpenRating}>⭐ Avaliar Consulta</button>
                    <Badge text={h.status} status={h.statusType} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Histórico de Testes */}
          <div className={styles.columnCard}>
            <div className={styles.columnHeader}>
              <span className={styles.headerIcon}>📊</span>
              Histórico de Testes
            </div>
            <ul className={styles.testsList}>
              {tests.map((t, i) => (
                <li key={i} className={styles.testItem}>
                  <div className={styles.testRow}>
                    <div className={styles.testLeft}>
                      <span className={styles.rowCalIcon}>📋</span>
                      <div>
                        <p className={styles.testTitle}>{t.title}</p>
                        <p className={styles.testMeta}>{t.date}</p>
                        <p className={styles.testMeta}>{t.by}</p>
                      </div>
                    </div>
                    <div className={styles.testRight}>
                      <Badge text={t.result} status="active" />
                      <Badge text={t.severity} status="inactive" />
                    </div>
                  </div>
                  <div className={styles.testFooter}>
                    <button className={styles.moreInfoBtn}>Ver mais informações</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
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
      {/* Rating Modal */}
      {isRatingOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.ratingModalContent}>
            <div className={styles.modalHeader}>
              <h2>Avalie nossa consulta</h2>
              <button className={styles.closeBtn} onClick={() => setIsRatingOpen(false)}>✕</button>
            </div>

            <div className={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`${styles.starBtn} ${star <= (hoverRating || rating) ? styles.starActive : ""}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </button>
              ))}
            </div>

            <div className={styles.formGroup}>
              <label>Adicione um comentário (Opcional):</label>
              <textarea
                className={styles.ratingTextarea}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            <div className={styles.ratingFooter}>
              <button className={styles.saveBtn} onClick={handleSubmitRating}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </ClientTemplate>
  );
};

export default Perfil;
