// FilterSelect.tsx
import { useState, useRef, useEffect } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{
      transition: "transform 0.2s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0,
    }}
  >
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function FilterSelect({
  options = [],
  placeholder = "Todos os status",
  value,
  onChange,
  disabled = false,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange?.(option.value);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative", width: "180px" }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          backgroundColor: "#ffffff",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          fontSize: "14px",
          color: selected ? "#1A202C" : "#718096",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          boxShadow: open ? "0 0 0 3px rgba(232,93,122,0.12)" : "none",
          borderColor: open ? "#e85d7a" : "#E2E8F0",
          opacity: disabled ? 0.5 : 1,
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {/* Ícone filtro */}
        <span style={{ color: "#718096", display: "flex", alignItems: "center" }}>
          <FilterIcon />
        </span>

        {/* Label */}
        <span style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "left",
        }}>
          {selected ? selected.label : placeholder}
        </span>

        {/* Chevron */}
        <span style={{ color: "#718096", display: "flex", alignItems: "center" }}>
          <ChevronDown open={open} />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            margin: 0,
            padding: "4px 0",
            listStyle: "none",
            backgroundColor: "#ffffff",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            zIndex: 50,
            maxHeight: "220px",
            overflowY: "auto",
          }}
        >
          {options.length === 0 ? (
            <li style={{ padding: "10px 16px", fontSize: "14px", color: "#A0AEC0" }}>
              Nenhuma opção
            </li>
          ) : (
            options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option)}
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: option.value === value ? "#e85d7a" : "#1A202C",
                  backgroundColor: option.value === value ? "#fff0f3" : "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  if (option.value !== value)
                    (e.currentTarget as HTMLLIElement).style.backgroundColor = "#F7FAFC";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLLIElement).style.backgroundColor =
                    option.value === value ? "#fff0f3" : "transparent";
                }}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}