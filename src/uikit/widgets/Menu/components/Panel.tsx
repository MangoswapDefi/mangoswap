import React from "react";
import styled from "styled-components";
import PanelBody from "./PanelBody";
import PanelFooter from "./PanelFooter";
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "../config";
import { PanelProps, PushedProps } from "../types";

interface Props extends PanelProps, PushedProps {
  showMenu: boolean;
  isMobile: boolean;
  togglePush: () => void;
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean; isMobile: boolean }>`
  position: fixed;
  padding-top: ${({ showMenu }) => (showMenu ? "80px" : 0)};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.nav.background};
  width: ${({ isPushed, isMobile }) => (isPushed ? `${SIDEBAR_WIDTH_FULL}px` : isMobile ? 0 : `${SIDEBAR_WIDTH_REDUCED}px`)};
  height: 100vh;
  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: ${({ isPushed }) => (isPushed ? "2px solid rgba(133, 133, 133, 0.1)" : 0)};
  z-index: 11;
  overflow: ${({ isPushed }) => (isPushed ? "initial" : "hidden")};
  transform: translate3d(0, 0, 0);
  ${({ isPushed }) => !isPushed && "white-space: nowrap;"};

  ${({ theme }) => theme.mediaQueries.nav} {
    border-right: 2px solid rgba(255, 152, 152, 0.1);
    /* width: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`}; */
    // &::after{
    //   content: "";
    //   position: absolute;
    //   width: 10px;
    //   height: 100%;
    //   background-color: #fff;
    //   right: 0px;
    //   top: 0px;
    // }
  }
`;

const Panel: React.FC<Props> = (props) => {
  const { isPushed, showMenu, isMobile } = props;
  return (
    <StyledPanel isMobile={isMobile} isPushed={isPushed} showMenu={showMenu}>
      <PanelBody {...props} />
      <PanelFooter {...props} />
    </StyledPanel>
  );
};

export default Panel;
