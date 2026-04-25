import { useState } from 'react';
import { api } from '../../services';
import { StockMovementContext } from './StockMovementContext';

export const StockMovementProvider = ({ children }) => {
  
  const [stockMovements, setStockMovements] = useState([])
  const [stockMovementByPatientId, setStockMovementByPatientId] = useState([])
  const [stockMovementByPsychologistId, setStockMovementByPsychologistId] = useState([])

  const getStockMovement = async () => {
    try {
      const {data} = await api.get("/movimentacoes")
      setStockMovements(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getStockMovementByPatientId = async (id) => {
    try {
      const {data} = await api.get(`/movimentacoes/${id}`)
      setStockMovementByPatientId(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getStockMovementByPsychologistId = async (id) => {
    try {
      const { data } = await api.get(`/movimentacoes/buscarPorFunc/${id}`);
      
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const aplicador = usuario?.nome;

      const groupedByPatient = data.reduce((acc, item) => {
        const idPaciente = item.fkConsulta?.fkPaciente?.idPaciente;

        if (!idPaciente) return acc;

        const infoTeste = {
          nome: item.nomeTeste,
          datAplicacao: item.fkConsulta?.data
            ? new Date(item.fkConsulta.data).toLocaleDateString("pt-BR")
            : null,
          aplicador,
          status: item.fkConsulta?.status,
        };

        const existing = acc.find((entry) => entry.idPaciente === idPaciente);

        if (existing) {
          existing.infoTestes.push(infoTeste);
        } else {
          acc.push({ idPaciente, infoTestes: [infoTeste] });
        }

        return acc;
      }, []);

      setStockMovementByPsychologistId(groupedByPatient);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StockMovementContext.Provider value={{
      getStockMovement,
      getStockMovementByPatientId,
      getStockMovementByPsychologistId,
      stockMovements,
      stockMovementByPatientId,
      stockMovementByPsychologistId
    }}>
      {children}
    </StockMovementContext.Provider>
  );
};