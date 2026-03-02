import { AdminTemplate } from "../../../../atomic/template";
import { AdministrativeDataCard } from "../../../../atomic/molecule"

export default function Home() {
  return (
    <AdminTemplate>
        <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "30px"}}>
             <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center"}}>
                <h2>Bem-vinda de volta, Dra. Ana!</h2>
                <p>Aqui está um resumo das atividades de hoje, Segunda-feira, 05 de Janeiro de 2026</p>
            </div>
            <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center"}}>
                <div style={{display: "flex", width: "50%", justifyContent: "space-between", gap: "var(--gap-xl)"}}>
                    <AdministrativeDataCard title={"Consultas de hoje"} value={"27"} subtitle={"12"} variant={"positivo"}/>
                    <AdministrativeDataCard title={"Pacientes ativos"} value={"84"} subtitle={"5"} variant={"positivo"}/>
                    <AdministrativeDataCard title={"Faturamento(mês)"} value={"R$15.400"} subtitle={"10.5"} variant={"positivo"}/>
                </div>
            </div>
            <div>
                <h2>Agenda do dia</h2>
                {/* Colocar filtro aqui dps quando tiver conectando ao Back-end */}
            </div>
        </div>
    </AdminTemplate>
  )
}