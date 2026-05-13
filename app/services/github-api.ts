import type { GithubApiError, GithubRepo, GithubUser } from "~/types/github";

const GITHUB_API = "https://api.github.com";

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Token is server-side only; in browser we just call the public API anonymously.
  return headers;
}

async function githubFetch<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${GITHUB_API}${path}`, { headers: buildHeaders() });
  } catch (e) {
    throw toApiError({ kind: "network", message: "Network error. Check your connection." });
  }

  if (response.status === 404) {
    throw toApiError({ kind: "not_found", message: "GitHub user not found." });
  }
  if (response.status === 403 || response.status === 429) {
    throw toApiError({
      kind: "rate_limit",
      message: "GitHub API rate limit exceeded. Please try again later.",
    });
  }
  if (!response.ok) {
    throw toApiError({
      kind: "unknown",
      message: `GitHub API error (${response.status}).`,
    });
  }
  return (await response.json()) as T;
}

function toApiError(err: GithubApiError): GithubApiError {
  return err;
}

export function isGithubApiError(err: unknown): err is GithubApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "kind" in err &&
    "message" in err
  );
}

export async function fetchUser(username: string): Promise<GithubUser> {
  return githubFetch<GithubUser>(`/users/${encodeURIComponent(username)}`);
}

export async function fetchUserRepos(username: string): Promise<GithubRepo[]> {
  // Fetch up to 100 most recently updated repos
  return githubFetch<GithubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
  );
}
