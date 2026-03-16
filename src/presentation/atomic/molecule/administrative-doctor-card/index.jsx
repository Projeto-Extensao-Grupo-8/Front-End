import { useState } from "react";
import styles from "./styles.module.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
 
export const AdministrativeDoctorCard = ({ doctorName, specialty, appointments }) => {
  const [expanded, setExpanded] = useState(true);
 
  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setExpanded((prev) => !prev)}>
        <div>
          <h2 className={styles.doctorName}>{doctorName}</h2>
          <p className={styles.specialty}>{specialty}</p>
        </div>
        <button className={styles.toggleButton} aria-label="Expandir/Recolher">
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>
 
      {expanded && (
        <div className={styles.list}>
          {appointments.map((appointment, index) => (
            <div key={index} className={styles.item}>
              <AccessTimeIcon className={styles.clockIcon} sx={{ fontSize: 18 }} />
              <span className={styles.time}>
                {appointment.startTime} - {appointment.endTime}
              </span>
              <div className={styles.divider} />
              <span className={styles.patientName}>{appointment.patientName}</span>
              <div className={styles.action}>{appointment.action}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 