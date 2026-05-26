import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg";
};

export function Button({ className = "", variant = "default", size = "default", ...props }: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "lg" ? "btn-lg" : "",
    className
  ].filter(Boolean).join(" ");

  return <button className={classes} {...props} />;
}
