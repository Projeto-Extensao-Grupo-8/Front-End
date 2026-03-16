import { AdminTemplate } from "../../../../atomic/template";
import { AdministrativeDataCard, AdministrativeDoctorCard, StockAlert } from "../../../../atomic/molecule";
import { Badge, FilterSelect, LinkText } from "../../../../atomic/atom";
import { ResumeChart } from "../../../../atomic/organism";

export default function Home() {

    const produtos = [
        { nome: "Teste HTP",     quantidade: 8, minimo: 10 },
        { nome: "Teste WISC IV", quantidade: 4, minimo: 5  },
        { nome: "Teste CAT",     quantidade: 3, minimo: 5  },
    ];

    return (
        <AdminTemplate>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "30px", padding: "32px"}}>

                <div style={{ display: "flex", width: "100%", alignItems: "start", justifyContent: "center", flexDirection: "column", borderBottom: "1px solid #e0e0e0", paddingBottom: "16px" }}>
                    <h2>Bem-vinda de volta, Dra. Ana! <span>👋</span></h2>
                    <p>Aqui está um resumo das atividades de hoje, Segunda-feira, 05 de Janeiro de 2026</p>
                </div>

                <div style={{ display: "flex", width: "100%", gap: "var(--gap-xl)" }}>
                    <div style={{ flex: 1 }}><AdministrativeDataCard title="Consultas de hoje" value="27" subtitle="12" variant="positivo" /></div>
                    <div style={{ flex: 1 }}><AdministrativeDataCard title="Pacientes ativos" value="84"/></div>
                    <div style={{ flex: 1 }}><AdministrativeDataCard title="Faturamento(mês)" value="R$15.400" subtitle="10.5" variant="positivo" /></div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <h2 style={{ whiteSpace: "nowrap" }}>Agenda do dia</h2>
                        <div style={{ marginTop: "1px" }}>
                            <Badge text="2024-11-24" status="information" />
                        </div>
                    </div>
                    <div style={{ width: "240px" }}>
                        <FilterSelect options={[
                            { label: "Todos os psicólogos", value: "all" },
                            { label: "Psicólogos ativos", value: "active" },
                        ]} />
                    </div>
                </div>

                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                        <AdministrativeDoctorCard
                            doctorName="Dra. Joana Almeida"
                            specialty="Terapia Cognitivo-Comportamental"
                            appointments={[
                                { startTime: "10:00", endTime: "11:00", patientName: "Junior das Neves",  action: <LinkText isActive={true} text="Ver perfil" /> },
                                { startTime: "11:30", endTime: "12:30", patientName: "Matheus Torres",    action: <LinkText isActive={true} text="Ver perfil" /> },
                                { startTime: "14:00", endTime: "15:00", patientName: "Ana Paula Silva",   action: <LinkText isActive={true} text="Ver perfil" /> },
                            ]}
                        />
                        <AdministrativeDoctorCard
                            doctorName="Dr. Cleber da Silva"
                            specialty="Psicologia Infantil"
                            appointments={[
                                { startTime: "10:00", endTime: "11:00", patientName: "Junior das Neves",  action: <LinkText isActive={true} text="Ver perfil" /> },
                                { startTime: "11:30", endTime: "12:30", patientName: "Matheus Torres",    action: <LinkText isActive={true} text="Ver perfil" /> },
                                { startTime: "14:00", endTime: "15:00", patientName: "Ana Paula Silva",   action: <LinkText isActive={true} text="Ver perfil" /> },
                            ]}
                        />
                        <AdministrativeDoctorCard
                            doctorName="Dra. Caroline Lima"
                            specialty="Terapia de Casal"
                            appointments={[
                                { startTime: "10:00", endTime: "11:00", patientName: "Junior das Neves",  action: <LinkText isActive={true} text="Ver perfil" /> },
                                { startTime: "11:30", endTime: "12:30", patientName: "Matheus Torres",    action: <LinkText isActive={true} text="Ver perfil" /> },
                                { startTime: "14:00", endTime: "15:00", patientName: "Ana Paula Silva",   action: <LinkText isActive={true} text="Ver perfil" /> },
                            ]}
                        />
                    </div>

                    <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                        <StockAlert items={produtos} />
                        <ResumeChart />
                    </div>

                </div>
            </div>
        </AdminTemplate>
    );
}