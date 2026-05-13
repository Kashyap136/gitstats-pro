import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GlassCard } from "~/components/glass-card/glass-card";
import { SectionTitle } from "~/components/section-title/section-title";
import type { GithubRepo } from "~/types/github";
import styles from "./repos-bar-chart.module.css";

interface ReposBarChartProps {
  repos: GithubRepo[];
}

export function ReposBarChart({ repos }: ReposBarChartProps) {
  const data = repos.map((r) => ({ name: r.name, stars: r.stargazers_count }));

  return (
    <GlassCard className={styles.card}>
      <SectionTitle title="Stars by Repository" subtitle="Top repositories ranked by star count" />
      {data.length === 0 ? (
        <p className={styles.empty}>No repositories to chart.</p>
      ) : (
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
              <defs>
                <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c5cff" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "var(--color-text-muted)", fontSize: 11 }}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: "rgba(124, 92, 255, 0.08)" }}
                contentStyle={{
                  background: "rgba(17, 20, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  color: "#e8ecff",
                }}
              />
              <Bar dataKey="stars" fill="url(#barFill)" radius={[8, 8, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </GlassCard>
  );
}
