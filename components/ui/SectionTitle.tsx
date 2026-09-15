import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium uppercase tracking-wide text-primary shadow-[0_0_16px_-2px_rgba(37,99,235,0.6)]">
          {eyebrow}
        </span>
      )}
      <h2 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-3xl font-display font-semibold text-transparent">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl italic text-base text-muted">{description}</p>
      )}
    </div>
  );
}