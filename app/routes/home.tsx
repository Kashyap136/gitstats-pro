import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Route } from "./+types/home";
import { SiteHeader } from "~/components/site-header/site-header";
import { LandingHero } from "~/components/landing-hero/landing-hero";
import { SearchBar } from "~/components/search-bar/search-bar";
import { SearchHistory } from "~/components/search-history/search-history";
import { ProfileSkeleton } from "~/components/profile-skeleton/profile-skeleton";
import { ErrorState } from "~/components/error-state/error-state";
import { Dashboard } from "~/components/dashboard/dashboard";
import { useGithubProfile } from "~/hooks/use-github-profile";
import { useSearchHistory } from "~/hooks/use-search-history";
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DevScope — GitHub Developer Portfolio Analyzer" },
    {
      name: "description",
      content:
        "Analyze any GitHub developer's portfolio. View profile stats, top languages, starred repositories, and recent activity in a beautiful, modern dashboard.",
    },
    { name: "theme-color", content: "#0b0d17" },
    { property: "og:title", content: "DevScope — GitHub Developer Portfolio Analyzer" },
    {
      property: "og:description",
      content:
        "Instant beautiful insights into any GitHub developer's stars, languages, repositories and activity.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

const DEFAULT_USERNAME = "vercel";

export default function Home() {
  const { state, search, reset } = useGithubProfile();
  const { history, add, remove, clear } = useSearchHistory();

  const handleSearch = useCallback(
    (username: string) => {
      add(username);
      void search(username);
    },
    [add, search],
  );

  // Initial demo load — lets visitors see the dashboard right away.
  useEffect(() => {
    if (state.status === "idle") {
      void search(DEFAULT_USERNAME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastQuery = state.status === "success" ? state.data.user.login : history[0] ?? "";

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <LandingHero />
          <div className={styles.searchBlock}>
            <SearchBar
              initialValue={state.status === "success" ? state.data.user.login : ""}
              onSearch={handleSearch}
              loading={state.status === "loading"}
            />
            <SearchHistory
              history={history}
              onSelect={handleSearch}
              onRemove={remove}
              onClear={clear}
            />
          </div>

          <section className={styles.results}>
            <AnimatePresence mode="wait">
              {state.status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProfileSkeleton />
                </motion.div>
              )}
              {state.status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ErrorState
                    error={state.error}
                    onRetry={lastQuery ? () => handleSearch(lastQuery) : reset}
                  />
                </motion.div>
              )}
              {state.status === "success" && (
                <motion.div
                  key={`success-${state.data.user.login}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Dashboard summary={state.data} />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <footer className={styles.footer}>
            Built with the GitHub REST API · Data is fetched live from
            <a href="https://docs.github.com/rest" target="_blank" rel="noreferrer"> api.github.com</a>
          </footer>
        </div>
      </main>
    </>
  );
}
