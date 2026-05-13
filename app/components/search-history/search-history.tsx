import { IconClock, IconX } from "@tabler/icons-react";
import styles from "./search-history.module.css";

interface SearchHistoryProps {
  history: string[];
  onSelect: (username: string) => void;
  onRemove: (username: string) => void;
  onClear: () => void;
}

export function SearchHistory({ history, onSelect, onRemove, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <span className={styles.label}>
          <IconClock size={14} /> Recent searches
        </span>
        <button type="button" onClick={onClear} className={styles.clearAll}>Clear all</button>
      </div>
      <ul className={styles.list}>
        {history.map((name) => (
          <li key={name} className={styles.chip}>
            <button type="button" onClick={() => onSelect(name)} className={styles.chipMain}>
              {name}
            </button>
            <button
              type="button"
              onClick={() => onRemove(name)}
              className={styles.chipClose}
              aria-label={`Remove ${name} from history`}
            >
              <IconX size={12} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
