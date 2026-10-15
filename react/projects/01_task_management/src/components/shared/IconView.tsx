import { icons } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  iconBoxSizes,
  iconGlyphSizes,
  radiusClasses,
  resolveIconSize,
  toneBoxClasses,
  toneTextClasses,
  type IconGlyphSize,
} from "../../theme/tokens";

export type IconName = keyof typeof icons;

const iconBoxVariants = cva(
  "inline-flex shrink-0 items-center justify-center border",
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
      boxSize: {
        xs: iconBoxSizes.xs,
        sm: iconBoxSizes.sm,
        md: iconBoxSizes.md,
        lg: iconBoxSizes.lg,
        xl: iconBoxSizes.xl,
      },
      rounded: {
        sm: radiusClasses.sm,
        md: radiusClasses.md,
        lg: radiusClasses.lg,
        full: radiusClasses.full,
      },
    },
    defaultVariants: {
      tone: "neutral",
      boxSize: "md",
      rounded: "lg",
    },
  },
);

export interface IconViewProps
  extends VariantProps<typeof iconBoxVariants> {
  /** Lucide icon name, e.g. `name="Plus"` / `name="Check"`. */
  name: IconName;
  /** Glyph size token (or raw number override). Defaults per boxSize. */
  iconSize?: IconGlyphSize;
  /** When false, renders a bare icon with no box (for buttons, inline). */
  boxed?: boolean;
  /** Extra classes for the box wrapper. */
  className?: string;
  /** Extra classes forwarded to the `<svg>`. */
  iconClassName?: string;
}

const defaultGlyphForBox: Record<keyof typeof iconBoxSizes, keyof typeof iconGlyphSizes> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

function IconView({
  name,
  tone = "neutral",
  boxSize = "md",
  rounded = "lg",
  iconSize,
  boxed = true,
  className,
  iconClassName,
}: IconViewProps) {
  const Icon = icons[name];
  if (!Icon) return null;

  const resolvedBox = boxSize ?? "md";
  const resolvedGlyph =
    iconSize ?? defaultGlyphForBox[resolvedBox as keyof typeof defaultGlyphForBox] ?? "md";

  const size = resolveIconSize(resolvedGlyph);

  if (!boxed) {
    return (
      <Icon
        size={size}
        aria-hidden="true"
        className={cn(toneTextClasses[tone ?? "neutral"], iconClassName, className)}
      />
    );
  }

  return (
    <span className={cn(iconBoxVariants({ tone, boxSize, rounded }), className)}>
      <Icon size={size} aria-hidden="true" className={cn("shrink-0", iconClassName)} />
    </span>
  );
}

export default IconView;
export { iconBoxVariants };
