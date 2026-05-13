import type {
  ActivityBucket,
  GithubRepo,
  GithubUser,
  LanguageStat,
  ProfileSummary,
} from "~/types/github";
import { LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from "~/utils/language-colors";

const TOP_REPOS_COUNT = 6;
const TOP_LANGUAGES_COUNT = 6;
const ACTIVITY_WEEKS = 26;

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = (day + 6) % 7; // make Monday the start of week
  d.setUTCDate(d.getUTCDate() - diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function buildLanguages(repos: GithubRepo[]): LanguageStat[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.fork) continue;
    const lang = repo.language;
    if (!lang) continue;
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  if (total === 0) return [];
  const sorted = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_LANGUAGES_COUNT);
  return sorted.map(([language, count]) => ({
    language,
    count,
    percentage: Math.round((count / total) * 1000) / 10,
    color: LANGUAGE_COLORS[language] ?? DEFAULT_LANGUAGE_COLOR,
  }));
}

function buildActivity(repos: GithubRepo[]): ActivityBucket[] {
  const now = startOfWeek(new Date());
  const buckets: ActivityBucket[] = [];
  const map = new Map<string, number>();

  for (let i = ACTIVITY_WEEKS - 1; i >= 0; i--) {
    const weekDate = new Date(now);
    weekDate.setUTCDate(now.getUTCDate() - i * 7);
    const key = weekDate.toISOString();
    map.set(key, 0);
    buckets.push({
      weekStart: key,
      label: weekDate.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      count: 0,
    });
  }

  for (const repo of repos) {
    const pushed = startOfWeek(new Date(repo.pushed_at));
    const key = pushed.toISOString();
    if (map.has(key)) {
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }

  return buckets.map((b) => ({ ...b, count: map.get(b.weekStart) ?? 0 }));
}

export function buildProfileSummary(user: GithubUser, repos: GithubRepo[]): ProfileSummary {
  const ownRepos = repos.filter((r) => !r.fork);
  const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = ownRepos.reduce((sum, r) => sum + r.forks_count, 0);
  const topRepos = [...ownRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, TOP_REPOS_COUNT);
  return {
    user,
    repos,
    totalStars,
    totalForks,
    topRepos,
    languages: buildLanguages(repos),
    activity: buildActivity(repos),
  };
}
