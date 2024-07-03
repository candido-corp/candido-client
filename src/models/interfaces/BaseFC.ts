import React from 'react';

export interface BaseFC {
  className?: string;
  children?: React.ReactNode;
}

export interface IconProps extends BaseFC {
  width?: number | string;
  height?: number | string;
  color?: string;
  strokeWidth?: number;
}

export interface SvgWrapperProps extends IconProps {
  children: React.ReactNode;
}
