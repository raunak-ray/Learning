import type { ElementType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { textStructureClasses, textToneClasses } from "../../theme/tokens";

/**
 * TextView — token-based typography used throughout the app.
 * Pick a semantic `variant`, optional color `tone`.
 */

const textVariants = cva("", {
  variants: {
    variant: {
      h1: textStructureClasses.h1,
      h2: textStructureClasses.h2,
      title: textStructureClasses.title,
      body: textStructureClasses.body,
      label: textStructureClasses.label,
      value: textStructureClasses.value,
      caption: textStructureClasses.caption,
      overline: textStructureClasses.overline,
    },
    tone: {
      default: textToneClasses.default,
      muted: textToneClasses.muted,
      primary: textToneClasses.primary,
      success: textToneClasses.success,
      warning: textToneClasses.warning,
      info: textToneClasses.info,
      destructive: textToneClasses.destructive,
      inherit: textToneClasses.inherit,
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
});

const defaultTag: Record<keyof typeof textStructureClasses, ElementType> = {
  h1: "h1",
  h2: "h2",
  title: "h3",
  body: "p",
  label: "p",
  value: "p",
  caption: "p",
  overline: "p",
};

export interface TextViewProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: ElementType;
}

function TextView({
  variant = "body",
  tone = "default",
  align,
  as,
  className,
  ...props
}: TextViewProps) {
  const Tag = (as ?? defaultTag[variant ?? "body"]) as ElementType;
  return (
    <Tag
      className={cn(textVariants({ variant, tone, align }), className)}
      {...props}
    />
  );
}

export default TextView;
export { textVariants };
