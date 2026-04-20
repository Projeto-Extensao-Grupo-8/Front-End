import { useState } from 'react';
import { api } from '../../services';
import { PatientContext } from './PatientContext';

export const PatientProvider = ({ children }) => {
  
  const [patients, setPatients] = useState([])
  const [patientById, setPatientById] = useState([])

  const getPatientById = async (id) => {
    try {
      const {data} = await api.get(`/pacientes/${id}`)
      setPatientById(data);
    } catch (error) {
      console.error(error);
    }
  }

  const createPatient = async (data) => {
    try {
      await api.post("/pacientes", data)
      // Dá para já deixar exibível se deu certo por aqui
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <PatientContext.Provider value={{
      getPatientById,
      createPatient,
      patients,
      patientById
    }}>
      {children}
    </PatientContext.Provider>
  );

};