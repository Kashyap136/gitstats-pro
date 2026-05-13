import type { LanguageStat, ProfileSummary } from "~/types/github";

export interface CompareMetric {
  key: string;
  label: string;
  /** Higher value wins (true) or lower wins (false). */
  higherIsBetter: boolean;
  values: [number, number];
}

export function buildCompareMetrics(a: ProfileSummary, b: ProfileSummary): CompareMetric[] {
  return [
    { key: "public_repos", label: "Public Repos", higherIsBetter: true, values: [a.user.public_repos, b.user.public_repos] },
    { key: "total_stars", label: "Total Stars", higherIsBetter: true, values: [a.totalStars, b.totalStars] },
    { key: "total_forks", label: "Total Forks", higherIsBetter: true, values: [a.totalForks, b.totalForks] },
    { key: "followers", label: "Followers", higherIsBetter: true, values: [a.user.followers, b.user.followers] },
    { key: "following", label: "Following", higherIsBetter: true, values: [a.user.following, b.user.following] },
    { key: "top_repo_stars", label: "Top Repo Stars", higherIsBetter: true, values: [a.topRepos[0]?.stargazers_count ?? 0, b.topRepos[0]?.stargazers_count ?? 0] },
    { key: "languages", label: "Distinct Languages", higherIsBetter: true, values: [a.languages.length, b.languages.length] },
    { key: "account_age_days", label: "Account Age (days)", higherIsBetter: true, values: [accountAgeDays(a.user.created_at), accountAgeDays(b.user.created_at)] },
  ];
}

function accountAgeDays(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

export interface MergedLanguage {
  language: string;
  color: string;
  /** Percentage in profile A (0-100), 0 if not present. */
  a: number;
  /** Percentage in profile B (0-100), 0 if not present. */
  b: number;
}

export function mergeLanguages(
  langsA: LanguageStat[],
  langsB: LanguageStat[],
  limit = 8,
): MergedLanguage[] {
  const map = new Map<string, MergedLanguage>();
  for (const l of langsA) {
    map.set(l.language, { language: l.language, color: l.color, a: l.percentage, b: 0 });
  }
  for (const l of langsB) {
    const existing = map.get(l.language);
    if (existing) {
      existing.b = l.percentage;
    } else {
      map.set(l.language, { language: l.language, color: l.color, a: 0, b: l.percentage });
    }
  }
  return Array.from(map.values())
    .sort((x, y) => Math.max(y.a, y.b) - Math.max(x.a, x.b))
    .slice(0, limit);
}
