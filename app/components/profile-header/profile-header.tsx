import { motion } from "framer-motion";
import {
  IconBuilding,
  IconCheck,
  IconCopy,
  IconDownload,
  IconExternalLink,
  IconLink,
  IconMapPin,
} from "@tabler/icons-react";
import { GlassCard } from "~/components/glass-card/glass-card";
import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard";
import { downloadSummaryHtml } from "~/utils/download-summary";
import { accountAge, formatDate } from "~/utils/format";
import type { ProfileSummary } from "~/types/github";
import styles from "./profile-header.module.css";

interface ProfileHeaderProps {
  summary: ProfileSummary;
}

export function ProfileHeader({ summary }: ProfileHeaderProps) {
  const { user } = summary;
  const { copied, copy } = useCopyToClipboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <GlassCard className={styles.card}>
        <div className={styles.top}>
          <img src={user.avatar_url} alt="" className={styles.avatar} />
          <div className={styles.info}>
            <h1 className={styles.name}>{user.name ?? user.login}</h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className={styles.handle}
            >
              @{user.login} <IconExternalLink size={14} />
            </a>
            {user.bio && <p className={styles.bio}>{user.bio}</p>}
            <div className={styles.meta}>
              {user.company && (
                <span className={styles.metaItem}>
                  <IconBuilding size={14} /> {user.company}
                </span>
              )}
              {user.location && (
                <span className={styles.metaItem}>
                  <IconMapPin size={14} /> {user.location}
                </span>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.metaItem}
                >
                  <IconLink size={14} /> {user.blog.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
            <div className={styles.joined}>Joined {formatDate(user.created_at)} · {accountAge(user.created_at)} on GitHub</div>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => copy(user.html_url)}
              title="Copy GitHub profile URL"
            >
              {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              <span>{copied ? "Copied" : "Copy link"}</span>
            </button>
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.actionPrimary}`}
              onClick={() => downloadSummaryHtml(summary)}
              title="Download developer summary"
            >
              <IconDownload size={16} />
              <span>Download summary</span>
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
