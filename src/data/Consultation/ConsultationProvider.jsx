import { useState } from 'react';
import { api } from '../../services';
import { ConsultationContext } from './ConsultationContext';

export const ConsultationProvider = ({ children }) => {
  
  const [nextConsultations, setNextConsultations] = useState([])
  const [patientHistoricConsultations, setPatientHistoricConsultations] = useState([])
  const [historicConsultations, setHistoricConsultations] = useState([])
  const [consultationById, setConsultationById] = useState([])
  const [monthQuantityConsultationsByPsychologist, setMonthQuantityConsultationsByPsychologist ] = useState([])

  const getNextsConsultations = async (id) => {
    try {
      const { data } = await api.get(`/consultas/funcionarioConsultas/${id}`);

      const formatted = data.map((consulta) => {
        const dataObj = new Date(consulta.dataConsulta);

        const data = dataObj.toLocaleDateString('pt-BR');

        const horaInicio = dataObj.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const horaFim = new Date(dataObj.getTime() + 60 * 60 * 1000)
          .toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          });

        return {
          id: consulta.idConsulta,
          idPaciente: consulta.idPaciente,
          data,
          horario: `${horaInicio} - ${horaFim}`,
          paciente: consulta.nomePaciente,
          modalidade: consulta.tipo,
          status: consulta.status.charAt(0).toUpperCase() + 
                  consulta.status.slice(1).toLowerCase(),
        };
      });

      setNextConsultations(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  const getPatientHistoricConsultations = async (id) => {
    try {
      const { data } = await api.get(`/consultas/paciente/${id}`);

      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const idFuncionario = usuario?.idFuncionario;

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const formatted = data
      .filter((consulta) => new Date(consulta.dataConsulta) <= hoje && consulta.idFuncionario === idFuncionario)
      .sort((a, b) => new Date(b.dataConsulta) - new Date(a.dataConsulta))
      .map((consulta) => {
          const dataObj = new Date(consulta.dataConsulta);

          return {
            id: consulta.idConsulta,
            idPaciente: consulta.idPaciente,
            data: dataObj.toLocaleDateString('pt-BR'),
            paciente: consulta.nomePaciente,
            status: consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1).toLowerCase(),
          };
        });

      setPatientHistoricConsultations(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  const getHistoricConsultations = async (id) => {
    try {
      const { data } = await api.get(`/consultas/funcionario/${id}`);

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const formatted = data
        .filter((consulta) => new Date(consulta.dataConsulta) <= hoje)
        .sort((a, b) => new Date(b.dataConsulta) - new Date(a.dataConsulta))
        .map((consulta) => {
          const dataObj = new Date(consulta.dataConsulta);
      
          return {
            id: consulta.idConsulta,
            idPaciente: consulta.idPaciente,
            data: dataObj.toLocaleDateString('pt-BR'),
            paciente: consulta.nomePaciente,
            status: consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1).toLowerCase(),
          };
        });

      setHistoricConsultations(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  const updateConsultationStatus = async (id, novoStatus) => {
    try {
      await api.patch(`/consultas/status/${id}`, { novoStatus: novoStatus.toUpperCase() });
    } catch (error) {
    console.error(error);
    }
  };

  const getConsultationById = async (id) => {
    try {
      const {data} = await api.get(`/consultas/${id}`)
      setConsultationById(data);
    } catch (error) {
      console.error(error);
    }
  }   

    const getMonthQuantityConsultationsByPsychologist = async (id) => {
    try {
      const {data} = await api.get(`/consultas/funcionario/qtdConsultasMesAtual/${id}`)
      setMonthQuantityConsultationsByPsychologist(data);
    } catch (error) {
      console.error(error);
    }
  }   

  const createConsultation = async (data) => {
    try {
      await api.post("/pacientes", data)
      // Dá para já deixar exibível se deu certo por aqui
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <ConsultationContext.Provider value={{
      getNextsConsultations,
      getPatientHistoricConsultations,
      getHistoricConsultations,
      getConsultationById,
      getMonthQuantityConsultationsByPsychologist,
      createConsultation,
      updateConsultationStatus,
      nextConsultations,
      patientHistoricConsultations,
      historicConsultations,
      consultationById,
      monthQuantityConsultationsByPsychologist
    }}>
      {children}
    </ConsultationContext.Provider>
  );
};