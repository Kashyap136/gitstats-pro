import { GlassCard } from "~/components/glass-card/glass-card";
import styles from "./profile-skeleton.module.css";

export function ProfileSkeleton() {
  return (
    <div className={styles.wrapper}>
      <GlassCard>
        <div className={styles.headerRow}>
          <div className={`${styles.shimmer} ${styles.avatar}`} />
          <div className={styles.headerCol}>
            <div className={`${styles.shimmer} ${styles.lineLg}`} style={{ width: "40%" }} />
            <div className={`${styles.shimmer} ${styles.line}`} style={{ width: "25%" }} />
            <div className={`${styles.shimmer} ${styles.line}`} style={{ width: "70%" }} />
            <div className={`${styles.shimmer} ${styles.line}`} style={{ width: "55%" }} />
          </div>
        </div>
      </GlassCard>
      <div className={styles.statsRow}>
        {Array.from({ length: 4 }).map((_, i) => (
          <GlassCard key={i}>
            <div className={`${styles.shimmer} ${styles.lineLg}`} style={{ width: "50%" }} />
            <div className={`${styles.shimmer} ${styles.line}`} style={{ width: "70%", marginTop: 8 }} />
          </GlassCard>
        ))}
      </div>
      <div className={styles.chartsRow}>
        <GlassCard>
          <div className={`${styles.shimmer} ${styles.line}`} style={{ width: "30%" }} />
          <div className={`${styles.shimmer} ${styles.block}`} style={{ marginTop: 16 }} />
        </GlassCard>
        <GlassCard>
          <div className={`${styles.shimmer} ${styles.line}`} style={{ width: "30%" }} />
          <div className={`${styles.shimmer} ${styles.block}`} style={{ marginTop: 16 }} />
        </GlassCard>
      </div>
    </div>
  );
}
