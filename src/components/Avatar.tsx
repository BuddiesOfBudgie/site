import React from 'react';
import type { AvatarProps as MUIAvatarProps } from '@mui/material';
import { Avatar as MUIAvatar, Tooltip } from '@mui/material';

export interface AvatarProps extends MUIAvatarProps {
  showTooltip?: boolean;
  size: number;
}

export const Avatar = ({ alt, key, showTooltip = false, size = 60, src, sx, ...props }: AvatarProps) => {
  const pxSize = `${size}px`;
  const styling = {
    ...sx,
    borderRadius: pxSize,
    height: pxSize,
    width: pxSize,
  };

  const avatar = <MUIAvatar alt={alt} key={`${key}-Avatar`} src={src} sx={styling} {...props} />;
  return showTooltip ? (
    <Tooltip arrow key={key} title={alt}>
      {avatar}
    </Tooltip>
  ) : (
    avatar
  );
};
