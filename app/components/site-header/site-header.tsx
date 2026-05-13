import { IconBrandGithub } from "@tabler/icons-react";
import { NavLink } from "react-router";
import { ThemeToggle } from "~/components/theme-toggle/theme-toggle";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand} end>
        <span className={styles.brandIcon} aria-hidden="true">
          <IconBrandGithub size={22} />
        </span>
        <span className={styles.brandText}>
          <span className={styles.brandTitle}>DevScope</span>
          <span className={styles.brandSub}>GitHub Portfolio Analyzer</span>
        </span>
      </NavLink>
      <nav className={styles.nav} aria-label="Primary">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
        >
          Analyze
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
        >
          Compare
        </NavLink>
      </nav>
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
