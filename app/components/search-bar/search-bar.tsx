import { IconSearch, IconX } from "@tabler/icons-react";
import { useState, type FormEvent } from "react";
import styles from "./search-bar.module.css";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (username: string) => void;
  loading?: boolean;
  autoFocus?: boolean;
}

export function SearchBar({ initialValue = "", onSearch, loading = false, autoFocus = false }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || loading) return;
    onSearch(value.trim());
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <span className={styles.icon} aria-hidden="true">
        <IconSearch size={20} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a GitHub username, e.g. torvalds"
        className={styles.input}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        aria-label="GitHub username"
        autoFocus={autoFocus}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className={styles.clear}
          aria-label="Clear search"
        >
          <IconX size={16} />
        </button>
      )}
      <button type="submit" disabled={loading || !value.trim()} className={styles.submit}>
        {loading ? "Analyzing…" : "Analyze"}
      </button>
    </form>
  );
}
