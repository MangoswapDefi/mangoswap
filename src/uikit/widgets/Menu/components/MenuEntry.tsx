import React from "react";
import styled, { keyframes, DefaultTheme } from "styled-components";
import { Text } from "../../../components/Text";
import { Colors } from "../../../theme/types";
import { MENUOPACITY, MENU_ENTRY_HEIGHT, MENU_ICONSIZE } from "../config";

export interface Props {
  secondary?: boolean;
  isActive?: boolean;
  theme: DefaultTheme;
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

const LinkLabel = styled.div<{ isPushed: boolean }>`
  color: ${({ isPushed, theme }) => (isPushed ? 'inherit' : "transparent")};
  // transition: color 0.4s;
  flex-grow: 1;
  user-select: none;
`;

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: ${({ secondary, isActive }) => (secondary ? "0 32px" : (isActive ? "0 12px" : "0 16px"))};
  font-size: ${({ secondary }) => (secondary ? "14px" : "16px")};
  background-color: ${({ secondary, theme, isActive }) => (isActive ? theme.colors.orangeColor : secondary ? theme.colors.background : "transparent")};
  color: ${({ isActive, theme }) => isActive ? theme.colors.primary : "#444444"};
  /* box-shadow: ${({ isActive, theme }) => (isActive ? `inset 4px 0px 0px ${theme.colors.primary}` : "none")}; */
  opacity: ${({ isActive }) => isActive ? 1 : MENUOPACITY};
  border-left: ${({ isActive, theme, secondary }) => isActive ? (secondary ? '' : `4px solid ${theme.colors.primary}`) : ''};
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  a:hover {
    color: ${({ theme }) => `${theme.colors.primary}`};
  }
  &:hover {
    color: ${({ theme }) => `${theme.colors.primary}`};
  }

  svg {
    /* fill: ${({ theme }) => theme.colors.textSubtle}; */
    fill: ${({ isActive, theme }) => isActive ? `${theme.colors.primary}!important` : 'inherit!important'};
    width: ${MENU_ICONSIZE}px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.tertiary};
    svg {
    fill: ${({ theme }) => `${theme.colors.primary}!important`};
  }
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 400% 100%;
  }
`;
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: "button",
};

const LinkStatus = styled(Text) <{ color: keyof Colors }>`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 8px;
  border: 2px solid;
  border-color: ${({ theme, color }) => theme.colors[color]};
  box-shadow: none;
  color: ${({ theme, color }) => theme.colors[color]};
  margin-left: 8px;
`;

const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isPushed === next.isPushed);

export { MenuEntry, LinkStatus, LinkLabelMemo as LinkLabel };
