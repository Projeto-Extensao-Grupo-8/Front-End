import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClientTemplate } from "../../../../atomic/template";
import { Badge } from "../../../../atomic/atom";
import { api } from "../../../../../services/api";
import styles from "./styles.module.css";

const STATUS_MAP = {
  PENDENTE:   { label: "Pendente",   type: "inactive" },
  CONFIRMADA: { label: "Confirmada", type: "active" },
  REALIZADA:  { label: "Concluída",  type: "active" },
  CANCELADA:  { label: "Cancelada",  type: "danger" },
};

const formatData = (isoString) => {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return d.toLocaleDateString("pt-BR");
};

const formatDataHora = (isoString) => {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return `${d.toLocaleDateString("pt-BR")} às ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
};

const Perfil = () => {
  const navigate = useNavigate();
  const usuarioLocal = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [usuario, setUsuario] = useState({
    nome: usuarioLocal.nome || "",
    email: usuarioLocal.email || "",
    telefone: "",
  });
  const [, setIdPaciente] = useState(null);
  const [proximaConsulta, setProximaConsulta] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [testes, setTestes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [selectedConsultaId, setSelectedConsultaId] = useState(null);
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senhaAntiga: "",
    novaSenha: "",
  });
  const [saveError, setSaveError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(usuarioLocal.foto || null);
  const fileInputRef = useRef(null);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("foto", file);
    try {
      const res = await api.patch(`/usuarios/${usuarioLocal.id}/foto`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const novaFoto = res.data.fotoUrl || res.data.foto || URL.createObjectURL(file);
      setAvatarUrl(novaFoto);
      const stored = JSON.parse(localStorage.getItem("usuario") || "{}");
      localStorage.setItem("usuario", JSON.stringify({ ...stored, foto: novaFoto }));
    } catch (err) {
      console.error("Erro ao enviar foto:", err);
    }
    e.target.value = "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const idUsuario = usuarioLocal.id;
    if (!idUsuario) {
      setLoading(false);
      return;
    }

    const carregarDados = async () => {
      try {
        const [usuarioRes, pacienteRes] = await Promise.all([
          api.get(`/usuarios/${idUsuario}`),
          api.get(`/pacientes/buscarPorUsuario/${idUsuario}`),
        ]);

        const u = usuarioRes.data;
        setUsuario({ nome: u.nome, email: u.email, telefone: u.telefone || "" });
        setFormData({ nome: u.nome, email: u.email, telefone: u.telefone || "", senhaAntiga: "", novaSenha: "" });

        const pacId = pacienteRes.data.idPaciente;
        setIdPaciente(pacId);

        const [proximasRes, historicoRes, testesRes] = await Promise.allSettled([
          api.get(`/consultas/pacienteConsultas/${pacId}`),
          api.get(`/consultas/paciente/${pacId}`),
          api.get(`/movimentacoes/${pacId}`),
        ]);

        if (proximasRes.status === "fulfilled") setProximaConsulta(proximasRes.value.data[0] || null);
        if (historicoRes.status === "fulfilled") setHistorico(historicoRes.value.data || []);
        if (testesRes.status === "fulfilled") setTestes(testesRes.value.data || []);
      } catch (err) {
        console.error("Erro ao carregar dados do perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setSaveError("");
    try {
      const body = { nome: formData.nome, email: formData.email, telefone: formData.telefone };
      if (formData.novaSenha) body.senha = formData.novaSenha;

      await api.patch(`/usuarios/${usuarioLocal.id}`, body);

      setUsuario({ nome: formData.nome, email: formData.email, telefone: formData.telefone });
      const stored = JSON.parse(localStorage.getItem("usuario") || "{}");
      localStorage.setItem("usuario", JSON.stringify({ ...stored, nome: formData.nome, email: formData.email }));
      setIsModalOpen(false);
    } catch (err) {
      setSaveError(err.response?.data?.message || "Erro ao salvar alterações.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ nome: usuario.nome, email: usuario.email, telefone: usuario.telefone, senhaAntiga: "", novaSenha: "" });
    setSaveError("");
  };

  const handleOpenRating = (idConsulta, idFuncionario) => {
    setSelectedConsultaId(idConsulta);
    setSelectedFuncionarioId(idFuncionario);
    setRating(0);
    setHoverRating(0);
    setComment("");
    setRatingError("");
    setIsRatingOpen(true);
  };

  const handleSubmitRating = async () => {
    setRatingError("");
    if (rating === 0) {
      setRatingError("Selecione ao menos uma estrela.");
      return;
    }
    try {
      await api.post("/avaliacoes", {
        estrelas: rating,
        descricao: comment,
        fkFuncionario: selectedFuncionarioId,
      });
      setIsRatingOpen(false);
    } catch (err) {
      setRatingError(err.response?.data?.message || "Erro ao enviar avaliação.");
    }
  };

  if (loading) {
    return (
      <ClientTemplate>
        <div className={styles.page}>
          <p>Carregando...</p>
        </div>
      </ClientTemplate>
    );
  }

  return (
    <ClientTemplate>
      <div className={styles.page}>
        <h1 className={styles.greeting}>Saudações, {usuario.nome.split(" ")[0]}! 👋</h1>

        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileLeft}>
            <div
              className={styles.avatarWrapper}
              onClick={() => fileInputRef.current?.click()}
              title="Clique para alterar a foto"
            >
              <img
                src={avatarUrl || "/src/assets/logoCard.png"}
                alt={usuario.nome}
                className={styles.avatar}
              />
              <span className={styles.avatarEditIcon}>📷</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
          <div className={styles.profileCenter}>
            <p className={styles.nameLabel}>Nome:</p>
            <h2 className={styles.name}>{usuario.nome}</h2>
            <div className={styles.contactRow}>
              <span className={styles.contactItem}>✉️ {usuario.email}</span>
              <span className={styles.contactDivider}>•</span>
              <span className={styles.contactItem}>📱 {usuario.telefone || "—"}</span>
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
            {proximaConsulta ? (
              <>
                <p className={styles.appText}>
                  {proximaConsulta.nomeFuncionario} – {formatDataHora(proximaConsulta.dataConsulta)}
                </p>
                <div className={styles.appTagRow}>
                  <Badge
                    text={proximaConsulta.tipo === "ONLINE" ? "🔗 Consulta Online →" : "🏥 Consulta Presencial"}
                    status="inactive"
                  />
                </div>
              </>
            ) : (
              <p className={styles.appText}>Nenhuma consulta agendada.</p>
            )}
          </div>
          {proximaConsulta?.tipo === "ONLINE" && (
            <div className={styles.appRightBtn}>
              <button className={styles.linkBtn}>🔗 Link da Consulta</button>
            </div>
          )}
        </div>

        {/* Two columns */}
        <div className={styles.twoColumns}>
          {/* Histórico de Consultas */}
          <div className={styles.columnCard}>
            <div className={styles.columnHeader}>
              <span className={styles.headerIcon}>📋</span>
              Histórico de Consultas
            </div>
            {historico.length === 0 ? (
              <p className={styles.emptyMsg}>Nenhuma consulta encontrada.</p>
            ) : (
              <ul className={styles.historyList}>
                {historico.map((c) => {
                  const statusInfo = STATUS_MAP[c.status] || { label: c.status, type: "inactive" };
                  return (
                    <li key={c.idConsulta} className={styles.historyRow}>
                      <div className={styles.historyLeft}>
                        <span className={styles.rowCalIcon}>📅</span>
                        <span className={styles.historyDate}>
                          {formatData(c.dataConsulta)} – {c.nomeFuncionario}
                        </span>
                      </div>
                      <div className={styles.historyRight}>
                        {c.status === "REALIZADA" && (
                          <button
                            className={styles.avaliarBtn}
                            onClick={() => handleOpenRating(c.idConsulta, c.idFuncionario)}
                          >
                            ⭐ Avaliar Consulta
                          </button>
                        )}
                        <Badge text={statusInfo.label} status={statusInfo.type} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Histórico de Testes */}
          <div className={styles.columnCard}>
            <div className={styles.columnHeader}>
              <span className={styles.headerIcon}>📊</span>
              Histórico de Testes
            </div>
            {testes.length === 0 ? (
              <p className={styles.emptyMsg}>Nenhum teste encontrado.</p>
            ) : (
              <ul className={styles.testsList}>
                {testes.map((t) => {
                  const expirado = t.isValido;
                  return (
                    <li key={t.idMovimentacaoEstoque} className={styles.testItem}>
                      <div className={styles.testRow}>
                        <div className={styles.testLeft}>
                          <span className={styles.rowCalIcon}>📋</span>
                          <div>
                            <p className={styles.testTitle}>{t.nomeTeste}</p>
                            <p className={styles.testMeta}>Adquirido em {formatData(t.dataMovimentacao)}</p>
                            {t.fkConsulta?.nomeFuncionario && (
                              <p className={styles.testMeta}>Por: {t.fkConsulta.nomeFuncionario}</p>
                            )}
                          </div>
                        </div>
                        <div className={styles.testRight}>
                          <Badge
                            text={expirado ? "Expirado" : "Válido"}
                            status={expirado ? "danger" : "active"}
                          />
                        </div>
                      </div>
                      <div className={styles.testFooter}></div>
                    </li>
                  );
                })}
              </ul>
            )}
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

            {saveError && <p className={styles.errorMsg}>{saveError}</p>}

            <div className={styles.modalButtons}>
              <button className={styles.photoBtn} onClick={() => fileInputRef.current?.click()}>
                📷 Alterar Foto
              </button>
              <div className={styles.modalButtonsRight}>
                <button className={styles.cancelBtn} onClick={handleCancel}>Cancelar</button>
                <button className={styles.saveBtn} onClick={handleSaveChanges}>Salvar Alterações</button>
              </div>
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

            {ratingError && <p className={styles.errorMsg}>{ratingError}</p>}

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
