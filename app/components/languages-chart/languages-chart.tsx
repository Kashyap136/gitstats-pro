import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { GlassCard } from "~/components/glass-card/glass-card";
import { SectionTitle } from "~/components/section-title/section-title";
import type { LanguageStat } from "~/types/github";
import styles from "./languages-chart.module.css";

interface LanguagesChartProps {
  languages: LanguageStat[];
}

export function LanguagesChart({ languages }: LanguagesChartProps) {
  return (
    <GlassCard className={styles.card}>
      <SectionTitle title="Top Languages" subtitle="Distribution across public repositories" />
      {languages.length === 0 ? (
        <p className={styles.empty}>No language data available.</p>
      ) : (
        <div className={styles.body}>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={languages}
                  dataKey="count"
                  nameKey="language"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {languages.map((entry) => (
                    <Cell key={entry.language} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(17, 20, 42, 0.95)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    color: "#e8ecff",
                  }}
                  formatter={(value, _name, item) => {
                    const lang = item?.payload as LanguageStat | undefined;
                    const count = typeof value === "number" ? value : Number(value) || 0;
                    return [
                      `${count} repo${count === 1 ? "" : "s"} (${lang?.percentage ?? 0}%)`,
                      lang?.language ?? "",
                    ];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className={styles.list}>
            {languages.map((lang) => (
              <li key={lang.language} className={styles.item}>
                <div className={styles.row}>
                  <span className={styles.swatch} style={{ background: lang.color }} aria-hidden="true" />
                  <span className={styles.lang}>{lang.language}</span>
                  <span className={styles.pct}>{lang.percentage}%</span>
                </div>
                <div className={styles.bar}>
                  <span style={{ width: `${lang.percentage}%`, background: lang.color }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassCard>
  );
}
