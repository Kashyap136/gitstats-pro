import { motion } from "framer-motion";
import { IconChartBar, IconCode, IconSparkles } from "@tabler/icons-react";
import styles from "./landing-hero.module.css";

const FEATURES = [
  { icon: IconChartBar, label: "Beautiful charts & stats" },
  { icon: IconCode, label: "Top languages & repos" },
  { icon: IconSparkles, label: "Glassmorphic, modern UI" },
];

export function LandingHero() {
  return (
    <section className={styles.hero}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={styles.eyebrow}
      >
        <span className={styles.dot} /> GitHub REST API · Live data
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
        className={styles.title}
      >
        Analyze any developer's <span className={styles.gradient}>GitHub portfolio</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className={styles.subtitle}
      >
        Get instant, beautiful insights into stars, languages, top repositories and activity —
        all from a single GitHub username.
      </motion.p>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={styles.features}
      >
        {FEATURES.map(({ icon: Icon, label }) => (
          <li key={label} className={styles.feature}>
            <Icon size={16} /> {label}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
