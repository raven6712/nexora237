"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

// Rotation de texte façon "hero" (cf. citscm.com). Contrairement à une
// animation permanente interdite en section 4, ceci ne bouge que par
// à-coups espacés (par défaut toutes les 2.8s) : entre deux changements,
// le texte est parfaitement statique. On coupe aussi l'intervalle quand
// l'onglet n'est pas visible, pour ne pas consommer de CPU en arrière-plan.
export function AnimatedText({
  words,
  intervalMs = 2800,
  className,
}: AnimatedTextProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced motion: on affiche le premier mot, sans rotation.
    if (reducedRef.current || words.length <= 1) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      // Étape 1 : fondu de sortie (opacity/transform uniquement).
      setVisible(false);
      timeoutId = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 250); // durée du fondu de sortie
    };

    const intervalId = setInterval(tick, intervalMs);

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [words, intervalMs]);

  return (
    <span
      className={cn(
        "inline-block transition-[opacity,transform] duration-300 ease-nexora",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        className
      )}
    >
      {words[index]}
    </span>
  );
}
