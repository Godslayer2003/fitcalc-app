"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Content stays fully opaque/readable at all times (never opacity-0) —
 * only a small transform animates on scroll-into-view. This is deliberate:
 * an opacity-hidden-until-JS-fires pattern risks real content (like the
 * calculator grid) never rendering for crawlers or full-page screenshots
 * that don't simulate scrolling, which would be a real SEO problem here.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-700 ease-out ${
        visible ? "translate-y-0" : "translate-y-4"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
