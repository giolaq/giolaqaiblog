import type { ReactNode } from "react";

// Keep the shared wrapper API; reading content should never wait for JavaScript or scrolling.
export default function FadeIn({ children, className = "" }: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
