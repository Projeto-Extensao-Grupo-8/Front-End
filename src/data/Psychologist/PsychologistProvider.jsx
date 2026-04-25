import { useState } from 'react';
import { api } from '../../services';
import { PsychologistContext } from './PsychologistContext';

export const PsychologistProvider = ({ children }) => {
  
  const [psychologists, setPsychologists] = useState([])
  const [psychologistById, setPsychologistById] = useState([])

  const getPsychologist = async () => {
    try {
      const {data} = await api.get("/pacientes")
      setPsychologists(data);

    } catch (error) {
      console.error(error);
    }
  }

  const getPsychologistById = async (id) => {
    try {
      const {data} = await api.get(`/funcionarios/${id}`)
      setPsychologistById(data);
    } catch (error) {
      console.error(error);
    }
  }

  const createPsychologist = async (data) => {
    try {
      await api.post("/funcionarios", data)
      // Dá para já deixar exibível se deu certo por aqui
    } catch (error) {
      console.error(error);
    }
  }
  
  const updatePsychologist = async (data) => {
    try {
      return await api.patch("/funcionarios", data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <PsychologistContext.Provider value={{
      getPsychologist,
      getPsychologistById,
      createPsychologist,
      updatePsychologist,
      psychologists,
      psychologistById
    }}>
      {children}
    </PsychologistContext.Provider>
  );
};