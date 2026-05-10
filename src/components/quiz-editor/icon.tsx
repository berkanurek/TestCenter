import type { CSSProperties } from "react";

type IconProps = {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number;
  ariaHidden?: boolean;
};

export function Icon({
  name,
  filled = false,
  className,
  size,
  ariaHidden = true,
}: IconProps) {
  const style: CSSProperties = {
    fontSize: size ? `${size}px` : undefined,
    fontVariationSettings: filled
      ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
      : undefined,
  };

  return (
    <span
      aria-hidden={ariaHidden}
      className={`material-symbols-outlined ${className ?? ""}`.trim()}
      style={style}
    >
      {name}
    </span>
  );
}
