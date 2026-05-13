import { motion } from "framer-motion";
import { IconExternalLink, IconGitFork, IconStar } from "@tabler/icons-react";
import { GlassCard } from "~/components/glass-card/glass-card";
import { SectionTitle } from "~/components/section-title/section-title";
import { LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from "~/utils/language-colors";
import { formatNumber, relativeTime } from "~/utils/format";
import type { GithubRepo } from "~/types/github";
import styles from "./repos-grid.module.css";

interface ReposGridProps {
  repos: GithubRepo[];
}

export function ReposGrid({ repos }: ReposGridProps) {
  return (
    <section>
      <SectionTitle title="Top Repositories" subtitle="Sorted by star count" />
      {repos.length === 0 ? (
        <GlassCard>
          <p className={styles.empty}>This user has no public repositories yet.</p>
        </GlassCard>
      ) : (
        <div className={styles.grid}>
          {repos.map((repo, idx) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.04 * idx }}
              className={styles.cardLink}
            >
              <GlassCard hover className={styles.repoCard}>
                <div className={styles.headRow}>
                  <h3 className={styles.name}>{repo.name}</h3>
                  <IconExternalLink size={16} className={styles.extIcon} />
                </div>
                <p className={styles.desc}>{repo.description ?? "No description provided."}</p>
                <div className={styles.meta}>
                  {repo.language && (
                    <span className={styles.metaItem}>
                      <span
                        className={styles.langDot}
                        style={{ background: LANGUAGE_COLORS[repo.language] ?? DEFAULT_LANGUAGE_COLOR }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className={styles.metaItem}>
                    <IconStar size={14} /> {formatNumber(repo.stargazers_count)}
                  </span>
                  <span className={styles.metaItem}>
                    <IconGitFork size={14} /> {formatNumber(repo.forks_count)}
                  </span>
                  <span className={styles.metaSpacer} />
                  <span className={styles.metaTime}>Updated {relativeTime(repo.updated_at)}</span>
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
