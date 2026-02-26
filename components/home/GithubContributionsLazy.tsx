"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

const GithubContributions = dynamic(
  () => import("@/components/github/GithubContributions"),
  {
    ssr: false,
    loading: () => <div className="h-[120px]" />,
  }
);

export default function GithubContributionsLazy() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div ref={ref}>
      {isVisible ? <GithubContributions /> : <div className="h-[120px]" />}
    </div>
  );
}
