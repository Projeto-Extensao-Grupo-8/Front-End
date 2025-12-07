import { useState } from "react";
import {
  RegisterFormStepOne,
  RegisterFormStepTwo,
} from "../../../atomic/molecule";
import { CardForm } from "../../../atomic/organism";
import { PublicTemplate } from "../../../atomic/template/public-template";

export default function Cadastro() {
  // EXPLICANDO STEPS

  // step = passo atual, controlado por estado
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Funções para navegar entre os passos
  // O uso de math.max e math.min garante que o passo fique entre 1 e totalSteps
  const go = (n) => setStep(Math.max(1, Math.min(totalSteps, n)));
  const next = () => go(step + 1);
  const prev = () => go(step - 1);

  // Função para resetar o fluxo, sempre que o cadastro for finalizado rode isso pra garantir que o fluxo recomece do passo 1
  const resetFlow = () => {
    go(1);
  };

  // Renderização condicional dos passos com base no estado atual
  return (
    <PublicTemplate>
      <CardForm>
        {step === 1 && <RegisterFormStepOne next={next} />}
        {step === 2 && <RegisterFormStepTwo finish={resetFlow} prev={prev} />}
      </CardForm>
    </PublicTemplate>
  );
}
