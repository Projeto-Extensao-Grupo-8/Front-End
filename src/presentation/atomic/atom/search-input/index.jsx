import { useState } from "react";
import styles from "./styles.module.css";

export function SearchInput({ placeholder = "Buscar por nome, email ou CRP...", onSearch }) {
    const [focused, setFocused] = useState(false);

    const handleChange = (e) => {
        onSearch?.(e.target.value);
    };

    return (
        <div className={`${styles.wrapper} ${focused ? styles.focused : ""}`}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9e9e9e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
                type="text"
                onChange={handleChange}
                placeholder={placeholder}
                className={styles.input}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    );
}