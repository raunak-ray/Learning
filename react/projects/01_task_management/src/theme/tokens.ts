/**
 * Token-based style system — single source of truth for reusable styling.
 *
 * Rules:
 * - Components must consume these tokens instead of hardcoding
 *   colors like `bg-slate-100` / `bg-orange-100` or raw pixel sizes.
 * - Raw CSS variables live in `src/index.css` (shadcn theme).
 *   This file maps them to semantic Tailwind classes.
 * - To add a new tone/size, extend the token here — every View updates.
 */

export const tones = [
  "neutral",
  "primary",
  "success",
  "warning",
  "info",
  "destructive",
] as const;

export type Tone = (typeof tones)[number];

/** Box (filled / soft) background for icons, badges, stat tiles. */
export const toneBoxClasses: Record<Tone, string> = {
  neutral: "border-border bg-muted text-muted-foreground",
  primary: "border-primary/20 bg-primary/10 text-primary",
  success:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warning:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  info: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  destructive: "border-destructive/20 bg-destructive/10 text-destructive",
};

/** Bare-icon / text color for a tone (icon inherits currentColor). */
export const toneTextClasses: Record<Tone, string> = {
  neutral: "text-muted-foreground",
  primary: "text-primary",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-sky-600 dark:text-sky-400",
  destructive: "text-destructive",
};

/** Box container sizes for IconView. */
export const iconBoxSizes = {
  xs: "size-7",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-14",
} as const;

export type IconBoxSize = keyof typeof iconBoxSizes;

/** Icon glyph pixel sizes. Accepts a token or a raw number override. */
export const iconGlyphSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const;

export type IconGlyphSize = keyof typeof iconGlyphSizes | number;

export function resolveIconSize(size: IconGlyphSize): number {
  return typeof size === "number" ? size : iconGlyphSizes[size];
}

/** Corner radius tokens. */
export const radiusClasses = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
} as const;

export type RadiusToken = keyof typeof radiusClasses;

/** Typography structure (size / weight / spacing only — no color). */
export const textStructureClasses = {
  h1: "font-sans text-lg font-bold tracking-wide md:text-2xl",
  h2: "font-sans text-base font-semibold tracking-tight",
  title: "text-sm leading-snug font-medium",
  body: "text-sm leading-relaxed",
  label: "text-sm font-medium",
  value: "text-3xl font-semibold tracking-tight tabular-nums",
  caption: "text-xs leading-relaxed",
  overline: "text-[11px] font-semibold tracking-widest uppercase",
} as const;

export type TextStructure = keyof typeof textStructureClasses;

/** Typography color tones. */
export const textToneClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  success: "text-emerald-700 dark:text-emerald-400",
  warning: "text-amber-700 dark:text-amber-400",
  info: "text-sky-700 dark:text-sky-400",
  destructive: "text-destructive",
  inherit: "text-inherit",
} as const;

export type TextTone = keyof typeof textToneClasses;

/* ------------------------------------------------------------------ */
/* Domain mappings — task-management semantics → generic tones.        */
/* Add new statuses/priorities here instead of scattering classes.    */
/* ------------------------------------------------------------------ */

export const taskStatusTones = {
  total: "neutral",
  pending: "warning",
  "in-progress": "info",
  completed: "success",
} as const satisfies Record<string, Tone>;

export const taskPriorityTones = {
  low: "info",
  medium: "warning",
  high: "destructive",
} as const satisfies Record<string, Tone>;

/** Aggregate export for direct `tokens.xxx` access. */
export const tokens = {
  tones,
  toneBoxClasses,
  toneTextClasses,
  iconBoxSizes,
  iconGlyphSizes,
  radiusClasses,
  textStructureClasses,
  textToneClasses,
  taskStatusTones,
  taskPriorityTones,
} as const;
