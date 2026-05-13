import { motion } from "framer-motion";
import { IconExternalLink, IconStar, IconUsers, IconBook } from "@tabler/icons-react";
import { GlassCard } from "~/components/glass-card/glass-card";
import { formatNumber, accountAge } from "~/utils/format";
import type { ProfileSummary } from "~/types/github";
import styles from "./compare-profile-card.module.css";

interface CompareProfileCardProps {
  summary: ProfileSummary;
  side: "a" | "b";
}

export function CompareProfileCard({ summary, side }: CompareProfileCardProps) {
  const { user, totalStars } = summary;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard className={styles.card} hover>
        <div className={`${styles.tag} ${side === "a" ? styles.tagA : styles.tagB}`}>
          {side === "a" ? "A" : "B"}
        </div>
        <img src={user.avatar_url} alt="" className={styles.avatar} />
        <div className={styles.name}>{user.name ?? user.login}</div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className={styles.handle}
        >
          @{user.login} <IconExternalLink size={12} />
        </a>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
        <div className={styles.miniStats}>
          <div className={styles.miniStat}>
            <IconBook size={14} />
            <span>{formatNumber(user.public_repos)}</span>
            <small>repos</small>
          </div>
          <div className={styles.miniStat}>
            <IconStar size={14} />
            <span>{formatNumber(totalStars)}</span>
            <small>stars</small>
          </div>
          <div className={styles.miniStat}>
            <IconUsers size={14} />
            <span>{formatNumber(user.followers)}</span>
            <small>followers</small>
          </div>
        </div>
        <div className={styles.foot}>{accountAge(user.created_at)} on GitHub</div>
      </GlassCard>
    </motion.div>
  );
}
