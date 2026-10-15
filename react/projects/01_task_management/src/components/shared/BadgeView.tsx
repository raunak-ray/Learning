import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { toneBoxClasses } from "../../theme/tokens";
import IconView, { type IconName } from "./IconView";

/**
 * BadgeView — token-based status / priority pill.
 * Tone comes from `tokens.ts`, never hardcoded in call sites.
 */

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 border font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: toneBoxClasses.neutral,
        primary: toneBoxClasses.primary,
        success: toneBoxClasses.success,
        warning: toneBoxClasses.warning,
        info: toneBoxClasses.info,
        destructive: toneBoxClasses.destructive,
      },
      size: {
        sm: "rounded-full px-2 py-0.5 text-[11px]",
        md: "rounded-full px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "sm",
    },
  },
);

export interface BadgeViewProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: IconName;
  /** Show a solid status dot before the label. */
  dot?: boolean;
}

function BadgeView({ tone = "neutral", size = "sm", icon, dot, children, className, ...props }: BadgeViewProps) {
  return (
    <span className={cn(badgeVariants({ tone, size }), className)} {...props}>
      {dot && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />}
      {icon && <IconView name={icon} boxed={false} iconSize="xs" tone={tone ?? "neutral"} />}
      {children}
    </span>
  );
}

export default BadgeView;
export { badgeVariants };
