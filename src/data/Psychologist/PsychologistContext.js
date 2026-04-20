import { createContext, useContext } from 'react';

export const PsychologistContext = createContext();

export const usePsychologist = () => {
  return useContext(PsychologistContext);
};