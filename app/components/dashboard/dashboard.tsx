import { motion } from "framer-motion";
import { ProfileHeader } from "~/components/profile-header/profile-header";
import { StatsGrid } from "~/components/stats-grid/stats-grid";
import { LanguagesChart } from "~/components/languages-chart/languages-chart";
import { ReposBarChart } from "~/components/repos-bar-chart/repos-bar-chart";
import { ActivityGraph } from "~/components/activity-graph/activity-graph";
import { ReposGrid } from "~/components/repos-grid/repos-grid";
import type { ProfileSummary } from "~/types/github";
import styles from "./dashboard.module.css";

interface DashboardProps {
  summary: ProfileSummary;
}

export function Dashboard({ summary }: DashboardProps) {
  return (
    <motion.div
      key={summary.user.login}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={styles.dashboard}
    >
      <ProfileHeader summary={summary} />
      <StatsGrid summary={summary} />
      <div className={styles.chartsRow}>
        <LanguagesChart languages={summary.languages} />
        <ReposBarChart repos={summary.topRepos} />
      </div>
      <ActivityGraph activity={summary.activity} />
      <ReposGrid repos={summary.topRepos} />
    </motion.div>
  );
}
