import classNames from "classnames";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./glass-card.module.css";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
  hover?: boolean;
}

export function GlassCard({ children, className, padded = true, hover = false, ...rest }: GlassCardProps) {
  return (
    <div
      className={classNames(styles.card, padded && styles.padded, hover && styles.hover, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
