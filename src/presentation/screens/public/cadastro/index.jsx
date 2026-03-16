import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RegisterFormStepOne,
  RegisterFormStepTwo,
} from "../../../atomic/molecule";
import { CardForm } from "../../../atomic/organism";
import { PublicTemplate } from "../../../atomic/template/public-template";
import styles from "./styles.module.css";

export default function Cadastro() {
  const [step, setStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const totalSteps = 2;
  const navigate = useNavigate();

  const go = (n) => setStep(Math.max(1, Math.min(totalSteps, n)));
  const next = () => go(step + 1);
  const prev = () => go(step - 1);

  const handleFinish = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <PublicTemplate hideFooter>
      <CardForm>
        {step === 1 && <RegisterFormStepOne next={next} />}
        {step === 2 && <RegisterFormStepTwo finish={handleFinish} prev={prev} />}
      </CardForm>
      {showToast && (
        <div className={styles.toast}>✅ Cadastro realizado com sucesso!</div>
      )}
    </PublicTemplate>
  );
}
