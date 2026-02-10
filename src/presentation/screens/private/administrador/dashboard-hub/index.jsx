import { useState } from "react";
import { DashboardHeader } from "../../../../atomic/molecule";
import  DashboardFinanceira from "../dashboard-financeira"
import  DashboardPacientes from "../dashboard-pacientes";
import { AdminTemplate } from "../../../../atomic/template";
import styles from "./styles.module.css"

export default function DashboardHub() {
    const [index, setIndex] = useState(1);
    return (
        <AdminTemplate>
            <DashboardHeader value={index} setValue={setIndex}/>
            <div className={styles.div}>
                {index === 1 && <DashboardFinanceira/>}
                {index === 2 && <DashboardPacientes/>}
                {/* {index === 3 && <DashboardAgendamento/>} */}
            </div>
        </AdminTemplate>
    )
}