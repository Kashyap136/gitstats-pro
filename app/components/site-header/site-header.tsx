import { IconBrandGithub } from "@tabler/icons-react";
import { ThemeToggle } from "~/components/theme-toggle/theme-toggle";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand}>
        <span className={styles.brandIcon} aria-hidden="true">
          <IconBrandGithub size={22} />
        </span>
        <span className={styles.brandText}>
          <span className={styles.brandTitle}>DevScope</span>
          <span className={styles.brandSub}>GitHub Portfolio Analyzer</span>
        </span>
      </a>
      <div className={styles.actions}>
        <a
          href="https://docs.github.com/rest"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          API Docs
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
