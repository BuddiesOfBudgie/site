// This file contains our generic filled Button component

// Material UI Bits
import { Button as MUIButton, SxProps, Theme } from "@mui/material";

type ButtonProps = {
  color?: "success" | "inherit" | "primary" | "secondary" | "error" | "info" | "warning";
  href?: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
  text: string;
  variant?: "text" | "contained" | "outlined";
};

const Button = ({ color = "primary", href, onClick, size = "large", sx, text, variant = "contained" }: ButtonProps) => {
  const buttonSx = { ...sx, "&.MuiButtonBase-root:hover": { backgroundColor: color } };
  return (
    <MUIButton color={color} href={href} onClick={onClick} size={size} sx={buttonSx} variant={variant}>
      {text}
    </MUIButton>
  );
};

export default Button;
