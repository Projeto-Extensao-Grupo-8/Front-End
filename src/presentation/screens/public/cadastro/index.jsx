import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterFormStepOne, RegisterFormStepTwo } from "../../../atomic/molecule";
import { CardForm } from "../../../atomic/organism";
import { PublicTemplate } from "../../../atomic/template/public-template";
import { api } from "../../../../services/api";
import styles from "./styles.module.css";

const initialForm = {
  nome: "",
  email: "",
  telefone: "",
  dataNascimento: "",
  cpf: "",
  senha: "",
  cep: "",
  numero: "",
  complemento: "",
  newsletter: false,
};

export default function Cadastro() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const totalSteps = 2;
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const go = (n) => setStep(Math.max(1, Math.min(totalSteps, n)));
  const next = () => go(step + 1);
  const prev = () => go(step - 1);

  const handleFinish = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/usuarios/cadastro", {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        dataNascimento: formData.dataNascimento,
        cpf: formData.cpf.replace(/\D/g, ""),
        senha: formData.senha,
        nivelPermissao: "PACIENTE",
        newsletter: formData.newsletter,
        cep: formData.cep.replace(/\D/g, ""),
        numero: formData.numero,
        complemento: formData.complemento,
      });

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      const data = err.response?.data;
      const msg = (typeof data === "string" ? data : data?.message) || "Erro ao realizar cadastro. Tente novamente.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicTemplate hideFooter>
      <CardForm>
        {step === 1 && (
          <RegisterFormStepOne data={formData} onChange={handleChange} next={next} />
        )}
        {step === 2 && (
          <RegisterFormStepTwo data={formData} onChange={handleChange} finish={handleFinish} prev={prev} />
        )}
        {error && <p className={styles.error}>{error}</p>}
        {loading && <p className={styles.loading}>Cadastrando...</p>}
      </CardForm>

      {showToast && (
        <div className={styles.toast}>✅ Cadastro realizado com sucesso!</div>
      )}
    </PublicTemplate>
  );
}
