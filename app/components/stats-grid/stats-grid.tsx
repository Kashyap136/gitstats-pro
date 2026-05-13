import { motion } from "framer-motion";
import {
  IconBook,
  IconGitFork,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { GlassCard } from "~/components/glass-card/glass-card";
import { formatNumber } from "~/utils/format";
import type { ProfileSummary } from "~/types/github";
import styles from "./stats-grid.module.css";

interface StatsGridProps {
  summary: ProfileSummary;
}

interface StatItem {
  icon: Icon;
  label: string;
  value: number;
  hint?: string;
  accent: "primary" | "secondary" | "accent" | "warning";
}

export function StatsGrid({ summary }: StatsGridProps) {
  const { user, totalStars, totalForks } = summary;

  const items: StatItem[] = [
    { icon: IconBook, label: "Public Repos", value: user.public_repos, accent: "primary" },
    { icon: IconStar, label: "Total Stars", value: totalStars, accent: "warning" },
    {
      icon: IconUsers,
      label: "Followers",
      value: user.followers,
      hint: `${formatNumber(user.following)} following`,
      accent: "secondary",
    },
    { icon: IconGitFork, label: "Total Forks", value: totalForks, accent: "accent" },
  ];

  return (
    <div className={styles.grid}>
      {items.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 * idx }}
        >
          <GlassCard hover className={styles.card}>
            <div className={`${styles.iconWrap} ${styles[item.accent]}`}>
              <item.icon size={20} />
            </div>
            <div className={styles.body}>
              <div className={styles.value}>{formatNumber(item.value)}</div>
              <div className={styles.label}>{item.label}</div>
              {item.hint && <div className={styles.hint}>{item.hint}</div>}
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
