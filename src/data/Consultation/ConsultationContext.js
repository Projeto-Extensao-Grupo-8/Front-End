import { createContext, useContext } from 'react';

export const ConsultationContext = createContext();

export const useConsultation = () => {
  return useContext(ConsultationContext);
};