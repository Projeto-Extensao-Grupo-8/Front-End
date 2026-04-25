import { createContext, useContext } from 'react';

export const AppointmentsContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentsContext);
};