import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Route } from "./+types/compare";
import { SiteHeader } from "~/components/site-header/site-header";
import { CompareSearch } from "~/components/compare-search/compare-search";
import { CompareView } from "~/components/compare-view/compare-view";
import { ProfileSkeleton } from "~/components/profile-skeleton/profile-skeleton";
import { ErrorState } from "~/components/error-state/error-state";
import { useGithubProfile } from "~/hooks/use-github-profile";
import styles from "./compare.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Compare developers · DevScope" },
    {
      name: "description",
      content:
        "Compare two GitHub developers side-by-side. View their stars, languages, repositories and account stats head-to-head.",
    },
    { name: "theme-color", content: "#0b0d17" },
    { property: "og:title", content: "Compare GitHub developers · DevScope" },
  ];
}

const DEFAULT_A = "vercel";
const DEFAULT_B = "facebook";

export default function ComparePage() {
  const profileA = useGithubProfile();
  const profileB = useGithubProfile();

  const [inputA, setInputA] = useState(DEFAULT_A);
  const [inputB, setInputB] = useState(DEFAULT_B);

  const handleSearchA = useCallback(
    (username: string) => {
      setInputA(username);
      void profileA.search(username);
    },
    [profileA],
  );

  const handleSearchB = useCallback(
    (username: string) => {
      setInputB(username);
      void profileB.search(username);
    },
    [profileB],
  );

  const handleCompare = useCallback(() => {
    if (inputA.trim()) void profileA.search(inputA.trim());
    if (inputB.trim()) void profileB.search(inputB.trim());
  }, [inputA, inputB, profileA, profileB]);

  const handleSwap = useCallback(() => {
    const a = inputA;
    const b = inputB;
    setInputA(b);
    setInputB(a);
    if (b.trim()) void profileA.search(b.trim());
    if (a.trim()) void profileB.search(a.trim());
  }, [inputA, inputB, profileA, profileB]);

  // Initial load
  useEffect(() => {
    void profileA.search(DEFAULT_A);
    void profileB.search(DEFAULT_B);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadingA = profileA.state.status === "loading";
  const loadingB = profileB.state.status === "loading";
  const errorA = profileA.state.status === "error" ? profileA.state.error : null;
  const errorB = profileB.state.status === "error" ? profileB.state.error : null;
  const dataA = profileA.state.status === "success" ? profileA.state.data : null;
  const dataB = profileB.state.status === "success" ? profileB.state.data : null;

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.heading}>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={styles.title}
            >
              Compare two <span className={styles.gradient}>GitHub developers</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={styles.subtitle}
            >
              Put two profiles head-to-head. Stars, languages, top repos — see who comes out on top.
            </motion.p>
          </header>

          <CompareSearch
            valueA={inputA}
            valueB={inputB}
            loadingA={loadingA}
            loadingB={loadingB}
            onSearchA={handleSearchA}
            onSearchB={handleSearchB}
            onSwap={handleSwap}
            onCompare={handleCompare}
            canCompare={!!inputA.trim() && !!inputB.trim()}
          />

          <section className={styles.results}>
            <AnimatePresence mode="wait">
              {(loadingA || loadingB) && !dataA && !dataB && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProfileSkeleton />
                </motion.div>
              )}

              {(errorA || errorB) && !loadingA && !loadingB && !(dataA && dataB) && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={styles.errorRow}
                >
                  {errorA && (
                    <div>
                      <div className={styles.errorLabel}>Profile A — "{inputA}"</div>
                      <ErrorState error={errorA} onRetry={() => handleSearchA(inputA)} />
                    </div>
                  )}
                  {errorB && (
                    <div>
                      <div className={styles.errorLabel}>Profile B — "{inputB}"</div>
                      <ErrorState error={errorB} onRetry={() => handleSearchB(inputB)} />
                    </div>
                  )}
                </motion.div>
              )}

              {dataA && dataB && !loadingA && !loadingB && (
                <motion.div
                  key={`compare-${dataA.user.login}-${dataB.user.login}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CompareView a={dataA} b={dataB} />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </>
  );
}
