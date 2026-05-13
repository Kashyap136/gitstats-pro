import { IconArrowsExchange2, IconSwords } from "@tabler/icons-react";
import { SearchBar } from "~/components/search-bar/search-bar";
import { GlassCard } from "~/components/glass-card/glass-card";
import styles from "./compare-search.module.css";

interface CompareSearchProps {
  valueA: string;
  valueB: string;
  loadingA: boolean;
  loadingB: boolean;
  onSearchA: (username: string) => void;
  onSearchB: (username: string) => void;
  onSwap: () => void;
  onCompare: () => void;
  canCompare: boolean;
}

export function CompareSearch({
  valueA,
  valueB,
  loadingA,
  loadingB,
  onSearchA,
  onSearchB,
  onSwap,
  onCompare,
  canCompare,
}: CompareSearchProps) {
  return (
    <GlassCard className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>
          <IconSwords size={16} /> Compare two GitHub developers
        </span>
        <button type="button" className={styles.swap} onClick={onSwap} title="Swap users" aria-label="Swap users">
          <IconArrowsExchange2 size={16} />
        </button>
      </div>
      <div className={styles.row}>
        <div className={styles.slot}>
          <span className={`${styles.tag} ${styles.tagA}`}>A</span>
          <SearchBar initialValue={valueA} onSearch={onSearchA} loading={loadingA} />
        </div>
        <div className={styles.vs} aria-hidden="true">VS</div>
        <div className={styles.slot}>
          <span className={`${styles.tag} ${styles.tagB}`}>B</span>
          <SearchBar initialValue={valueB} onSearch={onSearchB} loading={loadingB} />
        </div>
      </div>
      <div className={styles.compareRow}>
        <button
          type="button"
          className={styles.compareBtn}
          onClick={onCompare}
          disabled={!canCompare || loadingA || loadingB}
        >
          {loadingA || loadingB ? "Comparing…" : "Compare both"}
        </button>
      </div>
    </GlassCard>
  );
}
