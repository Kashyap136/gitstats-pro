import { IconAlertTriangle, IconRefresh, IconUserOff } from "@tabler/icons-react";
import { GlassCard } from "~/components/glass-card/glass-card";
import type { GithubApiError } from "~/types/github";
import styles from "./error-state.module.css";

interface ErrorStateProps {
  error: GithubApiError;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const Icon = error.kind === "not_found" ? IconUserOff : IconAlertTriangle;
  const title =
    error.kind === "not_found"
      ? "User not found"
      : error.kind === "rate_limit"
        ? "Rate limit reached"
        : error.kind === "network"
          ? "Network problem"
          : "Something went wrong";
  const hint =
    error.kind === "rate_limit"
      ? "GitHub limits unauthenticated requests to 60 per hour. Please wait a few minutes."
      : error.kind === "not_found"
        ? "Double-check the username and try again."
        : "Please try again in a moment.";

  return (
    <GlassCard className={styles.card}>
      <div className={styles.iconWrap}>
        <Icon size={28} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{error.message}</p>
      <p className={styles.hint}>{hint}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className={styles.retry}>
          <IconRefresh size={16} /> Try again
        </button>
      )}
    </GlassCard>
  );
}
