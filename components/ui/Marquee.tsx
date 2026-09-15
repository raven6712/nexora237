import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        // masque en fondu sur les bords, comme sur la référence
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
        {children}
      </div>
      {/* Copie identique, collée juste après, pour boucler sans coupure */}
      <div
        aria-hidden
        className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
      >
        {children}
      </div>
    </div>
  );
}
