import { motion } from "framer-motion";
import { IconMinus, IconTrophy } from "@tabler/icons-react";
import { GlassCard } from "~/components/glass-card/glass-card";
import { SectionTitle } from "~/components/section-title/section-title";
import { formatNumber } from "~/utils/format";
import type { CompareMetric } from "~/utils/compare";
import styles from "./compare-stats.module.css";

interface CompareStatsProps {
  metrics: CompareMetric[];
  loginA: string;
  loginB: string;
}

type Winner = "a" | "b" | "tie";

function winnerOf(metric: CompareMetric): Winner {
  const [a, b] = metric.values;
  if (a === b) return "tie";
  const aWins = metric.higherIsBetter ? a > b : a < b;
  return aWins ? "a" : "b";
}

export function CompareStats({ metrics, loginA, loginB }: CompareStatsProps) {
  const score = metrics.reduce(
    (acc, m) => {
      const w = winnerOf(m);
      if (w === "a") acc.a++;
      else if (w === "b") acc.b++;
      else acc.tie++;
      return acc;
    },
    { a: 0, b: 0, tie: 0 },
  );

  const overall: Winner = score.a === score.b ? "tie" : score.a > score.b ? "a" : "b";

  return (
    <div className={styles.wrapper}>
      <SectionTitle title="Head-to-head stats" subtitle="Highlighted side wins each metric" />
      <GlassCard className={styles.card}>
        <div className={styles.scoreRow}>
          <ScorePill side="a" login={loginA} wins={score.a} active={overall === "a"} />
          <span className={styles.scoreSep}>vs</span>
          <ScorePill side="b" login={loginB} wins={score.b} active={overall === "b"} />
        </div>
        <div className={styles.list}>
          {metrics.map((metric, idx) => {
            const winner = winnerOf(metric);
            return (
              <motion.div
                key={metric.key}
                className={styles.row}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.04 * idx }}
              >
                <div className={`${styles.value} ${styles.valueA} ${winner === "a" ? styles.winner : winner === "b" ? styles.loser : ""}`}>
                  {winner === "a" && <IconTrophy size={14} className={styles.trophy} />}
                  {formatNumber(metric.values[0])}
                </div>
                <div className={styles.label}>{metric.label}</div>
                <div className={`${styles.value} ${styles.valueB} ${winner === "b" ? styles.winner : winner === "a" ? styles.loser : ""}`}>
                  {formatNumber(metric.values[1])}
                  {winner === "b" && <IconTrophy size={14} className={styles.trophy} />}
                  {winner === "tie" && <IconMinus size={14} className={styles.tieIcon} />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}

interface ScorePillProps {
  side: "a" | "b";
  login: string;
  wins: number;
  active: boolean;
}

function ScorePill({ side, login, wins, active }: ScorePillProps) {
  return (
    <div className={`${styles.pill} ${side === "a" ? styles.pillA : styles.pillB} ${active ? styles.pillActive : ""}`}>
      <span className={styles.pillLogin}>@{login}</span>
      <span className={styles.pillScore}>{wins} wins</span>
    </div>
  );
}
