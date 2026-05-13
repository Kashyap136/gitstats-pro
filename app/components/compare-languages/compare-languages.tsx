import { motion } from "framer-motion";
import { GlassCard } from "~/components/glass-card/glass-card";
import { SectionTitle } from "~/components/section-title/section-title";
import type { MergedLanguage } from "~/utils/compare";
import styles from "./compare-languages.module.css";

interface CompareLanguagesProps {
  languages: MergedLanguage[];
  loginA: string;
  loginB: string;
}

export function CompareLanguages({ languages, loginA, loginB }: CompareLanguagesProps) {
  if (languages.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <SectionTitle
        title="Top languages overlap"
        subtitle="Distribution of top languages across both profiles"
      />
      <GlassCard className={styles.card}>
        <div className={styles.header}>
          <span className={`${styles.tag} ${styles.tagA}`}>@{loginA}</span>
          <span className={`${styles.tag} ${styles.tagB}`}>@{loginB}</span>
        </div>
        <ul className={styles.list}>
          {languages.map((lang, idx) => (
            <motion.li
              key={lang.language}
              className={styles.row}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.04 * idx }}
            >
              <span className={styles.langLabel}>
                <span className={styles.dot} style={{ background: lang.color }} aria-hidden="true" />
                {lang.language}
              </span>
              <div className={styles.barTrack}>
                <div className={styles.barASide}>
                  <span className={styles.percent}>{lang.a > 0 ? `${lang.a.toFixed(1)}%` : "—"}</span>
                  <div className={styles.barA} style={{ width: `${lang.a}%`, background: lang.color }} />
                </div>
                <div className={styles.center} aria-hidden="true" />
                <div className={styles.barBSide}>
                  <div className={styles.barB} style={{ width: `${lang.b}%`, background: lang.color }} />
                  <span className={styles.percent}>{lang.b > 0 ? `${lang.b.toFixed(1)}%` : "—"}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}
