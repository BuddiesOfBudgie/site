// This file contains our generic filled Button component

// Material UI Bits
import { Button as MUIButton, SxProps, Theme } from "@mui/material";

export type ButtonProps = {
  color?: "success" | "inherit" | "primary" | "secondary" | "error" | "info" | "warning";
  externalURL?: boolean;
  href?: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large" | "xl";
  sx?: SxProps<Theme>;
  text: string;
  variant?: "text" | "contained" | "outlined";
};

export const Button = ({
  color = "primary",
  externalURL = false,
  href,
  onClick,
  size = "large",
  sx,
  text,
  variant = "contained",
}: ButtonProps) => {
  const buttonSx = { ...sx, "&.MuiButtonBase-root:hover": { backgroundColor: color } };
  return (
    <MUIButton
      color={color}
      href={href}
      onClick={onClick}
      size={size !== "xl" ? size : undefined}
      sx={{
        ...buttonSx,
        ...(size === "xl" ? { borderRadius: "60px", height: "60px" } : {}),
        // I know, I hate !important too. Used so hover change doesn't change border thickness
        ...(variant === "outlined" ? { border: "2px solid !important" } : {}),
      }}
      variant={variant}
      target={externalURL ? "_target" : "_selfh"}
    >
      {text}
    </MUIButton>
  );
};

export default Button;
