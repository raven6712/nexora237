"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll } from "@/animations/reveal";

// Wraps static, server-rendered content and reveals it on scroll.
// Kept separate from SectionTitle so most of the page stays server-rendered.
export function RevealOnScroll({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) revealOnScroll(ref.current);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
