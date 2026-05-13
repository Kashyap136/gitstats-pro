export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  pushed_at: string;
  created_at: string;
  updated_at: string;
  size: number;
  archived: boolean;
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ActivityBucket {
  /** ISO date for the start of the week */
  weekStart: string;
  label: string;
  count: number;
}

export interface ProfileSummary {
  user: GithubUser;
  repos: GithubRepo[];
  totalStars: number;
  totalForks: number;
  topRepos: GithubRepo[];
  languages: LanguageStat[];
  activity: ActivityBucket[];
}

export type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: GithubApiError };

export interface GithubApiError {
  kind: "not_found" | "rate_limit" | "network" | "unknown";
  message: string;
}
