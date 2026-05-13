import { useColorScheme } from "@dazl/color-scheme/react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
  const { resolvedScheme, setColorScheme } = useColorScheme();
  const isDark = resolvedScheme === "dark";
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
      </span>
    </button>
  );
}
