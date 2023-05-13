// This file contains our generic filled Button component

// Material UI Bits
import type { ButtonProps as MUIButtonProps } from "@mui/material";
import { Button as MUIButton, css, styled } from "@mui/material";

export type ButtonProps = MUIButtonProps;

export const Button = ({
  children,
  color = "primary",
  size = "large",
  variant = "contained",
  ...rest
}: ButtonProps) => {
  return (
    <StylingButton color={color} size={size} variant={variant} {...rest}>
      {children}
    </StylingButton>
  );
};

const StylingButton = styled(MUIButton)<ButtonProps>(
  ({ color, variant }: ButtonProps) => css`
    &.MuiButtonBase-root:hover {
      backgroundcolor: ${color};
    }

    ${variant === "outlined" ? `border: "2px solid;"` : undefined}
  `
);

export default Button;
