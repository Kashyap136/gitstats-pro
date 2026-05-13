import { motion } from "framer-motion";
import { CompareProfileCard } from "~/components/compare-profile-card/compare-profile-card";
import { CompareStats } from "~/components/compare-stats/compare-stats";
import { CompareLanguages } from "~/components/compare-languages/compare-languages";
import { SectionTitle } from "~/components/section-title/section-title";
import { ReposGrid } from "~/components/repos-grid/repos-grid";
import { buildCompareMetrics, mergeLanguages } from "~/utils/compare";
import type { ProfileSummary } from "~/types/github";
import styles from "./compare-view.module.css";

interface CompareViewProps {
  a: ProfileSummary;
  b: ProfileSummary;
}

export function CompareView({ a, b }: CompareViewProps) {
  const metrics = buildCompareMetrics(a, b);
  const mergedLangs = mergeLanguages(a.languages, b.languages);

  return (
    <motion.div
      key={`${a.user.login}-vs-${b.user.login}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={styles.wrapper}
    >
      <div className={styles.profilesRow}>
        <CompareProfileCard summary={a} side="a" />
        <CompareProfileCard summary={b} side="b" />
      </div>

      <CompareStats metrics={metrics} loginA={a.user.login} loginB={b.user.login} />

      <CompareLanguages
        languages={mergedLangs}
        loginA={a.user.login}
        loginB={b.user.login}
      />

      <div className={styles.reposSection}>
        <SectionTitle title="Top repositories side-by-side" subtitle="Most starred public repos for each developer" />
        <div className={styles.reposGrid}>
          <div className={styles.reposCol}>
            <div className={`${styles.colHeader} ${styles.colHeaderA}`}>@{a.user.login}</div>
            <ReposGrid repos={a.topRepos.slice(0, 6)} />
          </div>
          <div className={styles.reposCol}>
            <div className={`${styles.colHeader} ${styles.colHeaderB}`}>@{b.user.login}</div>
            <ReposGrid repos={b.topRepos.slice(0, 6)} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
