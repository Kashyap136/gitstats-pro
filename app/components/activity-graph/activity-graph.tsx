import { GlassCard } from "~/components/glass-card/glass-card";
import { SectionTitle } from "~/components/section-title/section-title";
import type { ActivityBucket } from "~/types/github";
import styles from "./activity-graph.module.css";

interface ActivityGraphProps {
  activity: ActivityBucket[];
}

function intensity(count: number, max: number): number {
  if (count === 0 || max === 0) return 0;
  const ratio = count / max;
  if (ratio < 0.25) return 1;
  if (ratio < 0.5) return 2;
  if (ratio < 0.75) return 3;
  return 4;
}

export function ActivityGraph({ activity }: ActivityGraphProps) {
  const max = Math.max(0, ...activity.map((a) => a.count));
  const totalPushes = activity.reduce((sum, a) => sum + a.count, 0);

  return (
    <GlassCard className={styles.card}>
      <SectionTitle
        title="Recent Activity"
        subtitle={`Repository pushes across the last ${activity.length} weeks`}
      />
      <div className={styles.row}>
        <div className={styles.cells}>
          {activity.map((bucket) => (
            <div
              key={bucket.weekStart}
              className={`${styles.cell} ${styles[`level${intensity(bucket.count, max)}`]}`}
              title={`${bucket.label}: ${bucket.count} push${bucket.count === 1 ? "" : "es"}`}
            />
          ))}
        </div>
        <div className={styles.legend}>
          <span className={styles.legendLabel}>Less</span>
          <span className={`${styles.cell} ${styles.level0}`} />
          <span className={`${styles.cell} ${styles.level1}`} />
          <span className={`${styles.cell} ${styles.level2}`} />
          <span className={`${styles.cell} ${styles.level3}`} />
          <span className={`${styles.cell} ${styles.level4}`} />
          <span className={styles.legendLabel}>More</span>
        </div>
      </div>
      <p className={styles.summary}>
        <strong>{totalPushes}</strong> repository push{totalPushes === 1 ? "" : "es"} tracked.
      </p>
    </GlassCard>
  );
}
