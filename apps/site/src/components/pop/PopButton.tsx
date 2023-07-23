import React from "react";
import { Button, type ButtonProps } from "@mui/material";
import { poppins } from "../../fonts";
import { BWButton } from "@buddiesofbudgie/ui";

type PopButtonProps = {
  bw?: boolean;
} & ButtonProps;

export const PopButton = ({ bw = false, ...rest }: PopButtonProps) => {
  const Btn = bw ? BWButton : Button;
  return <Btn className={poppins.className} {...rest}></Btn>;
};
