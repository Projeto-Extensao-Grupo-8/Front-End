import { useState } from 'react';
import { api } from '../../services';
import { AppointmentsContext } from './AppointmentsContext';

export const AppointmentsProvider = ({ children }) => {
  
  const [appointmentss, setAppointmentss] = useState([])
  const [appointmentsByPsychologistId, setAppointmentsByPsychologistId] = useState([])

  const getAppointmentss = async () => {
    try {
      const {data} = await api.get(`/pacientes`)
      setAppointmentss(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getAppointmentsByPsychologistId = async (id, date) => {

    const newDate = new Date(date);
    const formatted = newDate.toLocaleDateString("en-CA");

    try {
      const {data} = await api.get(`/agendamentos/funcionario/${id}`,{
        params: {
          data: formatted
        }
      })
      setAppointmentsByPsychologistId(data);
    } catch (error) {
      console.error(error);
    }
  }

  const createAppointments = async (data) => {
    try {
      await api.post("/agendamentos", data)
      alert("Cadastro feito com sucesso")
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <AppointmentsContext.Provider value={{
      getAppointmentss,
      getAppointmentsByPsychologistId,
      createAppointments,
      appointmentss,
      appointmentsByPsychologistId,
    }}>
      {children}
    </AppointmentsContext.Provider>
  );

};