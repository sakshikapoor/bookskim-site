import { Suspense } from "react";
import QuoteCardApp from "./QuoteCardApp";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--ink)]" />}>
      <QuoteCardApp />
    </Suspense>
  );
}
