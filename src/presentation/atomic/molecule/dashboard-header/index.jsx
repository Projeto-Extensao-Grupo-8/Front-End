
import { ButtonTextIcon } from "../../atom";
import styles from "./styles.module.css";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const DashboardHeader = ({value, setValue}) => {
  return (
    <div className={styles.div}>
      <div>
        <ul className={styles.buttonsContainer}>
            <li> <ButtonTextIcon isActive={value == 1} onClick={()=> setValue(1)} text={"Financeiro"} Icon={InsertChartIcon}/> </li>
            <li> <ButtonTextIcon isActive={value == 2} onClick={()=> setValue(2)} text={"Pacientes"} Icon={GroupIcon}/> </li>
            <li> <ButtonTextIcon isActive={value == 3} onClick={()=> setValue(3)} text={"Agendamentos"} Icon={CalendarMonthIcon}/> </li>
        </ul>
      </div>
    </div>
  );
};