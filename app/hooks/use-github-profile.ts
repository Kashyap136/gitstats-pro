import { useCallback, useState } from "react";
import { fetchUser, fetchUserRepos, isGithubApiError } from "~/services/github-api";
import { buildProfileSummary } from "~/services/profile-builder";
import type { FetchState, GithubApiError, ProfileSummary } from "~/types/github";

export function useGithubProfile() {
  const [state, setState] = useState<FetchState<ProfileSummary>>({ status: "idle" });

  const search = useCallback(async (username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;
    setState({ status: "loading" });
    try {
      const [user, repos] = await Promise.all([fetchUser(trimmed), fetchUserRepos(trimmed)]);
      const summary = buildProfileSummary(user, repos);
      setState({ status: "success", data: summary });
    } catch (e) {
      const error: GithubApiError = isGithubApiError(e)
        ? e
        : { kind: "unknown", message: "Something went wrong while loading the profile." };
      setState({ status: "error", error });
    }
  }, []);

  const reset = useCallback(() => setState({ status: "idle" }), []);

  return { state, search, reset };
}
