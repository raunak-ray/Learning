import type { ComponentProps } from "react";
import type { icons } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";
import IconView, { type IconName } from "./IconView";
import { type IconGlyphSize, type Tone } from "../../theme/tokens";

/**
 * ButtonView — token-based button used throughout the app.
 * Wraps `ui/button` so variant/size classes stay in one place.
 */

type ButtonVariantProp =
  "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
type ButtonSizeProp =
  "xs" | "sm" | "md" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

const variantMap: Record<
  ButtonVariantProp,
  "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  destructive: "destructive",
  link: "link",
};

const sizeMap: Record<
  ButtonSizeProp,
  "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
> = {
  xs: "xs",
  sm: "sm",
  md: "default",
  lg: "lg",
  icon: "icon",
  "icon-xs": "icon-xs",
  "icon-sm": "icon-sm",
  "icon-lg": "icon-lg",
};

const iconSizeForButton: Record<ButtonSizeProp, IconGlyphSize> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "sm",
  icon: "sm",
  "icon-xs": "xs",
  "icon-sm": "xs",
  "icon-lg": "sm",
};

export interface ButtonViewProps extends Omit<
  ComponentProps<typeof Button>,
  "variant" | "size"
> {
  variant?: ButtonVariantProp;
  size?: ButtonSizeProp;
  /** Leading icon (bare, inherits button color). */
  leftIcon?: IconName;
  /** Trailing icon. */
  rightIcon?: IconName;
  /** Icon-only button glyph. Use with size="icon*". */
  icon?: keyof typeof icons;
  iconTone?: Tone;
}

function ButtonView({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  icon,
  iconTone,
  children,
  className,
  ...props
}: ButtonViewProps) {
  const isIconOnly = size.startsWith("icon");
  const glyph = iconSizeForButton[size];

  return (
    <Button
      {...props}
      className={cn(
        buttonVariants({ variant: variantMap[variant], size: sizeMap[size] }),
        className,
      )}
    >
      {isIconOnly && icon ? (
        <IconView
          name={icon}
          boxed={false}
          iconSize={glyph}
          tone={iconTone}
          iconClassName="text-white"
        />
      ) : (
        <>
          {leftIcon && (
            <IconView
              name={leftIcon}
              boxed={false}
              iconSize={glyph}
              tone={iconTone}
              iconClassName="text-white"
            />
          )}
          {children}
          {rightIcon && (
            <IconView
              name={rightIcon}
              boxed={false}
              iconSize={glyph}
              tone={iconTone}
              iconClassName="text-white"
            />
          )}
        </>
      )}
    </Button>
  );
}

export default ButtonView;
