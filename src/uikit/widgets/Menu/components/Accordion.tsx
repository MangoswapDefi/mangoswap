import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { MENU_ICONSIZE, MENU_ENTRY_HEIGHT } from "../config";
import { LinkLabel, LinkStatus as LinkStatusComponent, MenuEntry } from "./MenuEntry";
import { LinkStatus, PushedProps } from "../types";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "../../../components/Svg";
import { MenuTag } from "./PanelBody";

interface Props extends PushedProps {
  label: string;
  status?: LinkStatus;
  icon: React.ReactElement;
  initialOpenState?: boolean;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
  comming?: boolean;
}

const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
  svg{
    fill: ${({ isActive, theme }) => isActive ? `${theme.colors.primary}!important` : 'inherit!important'};
    width: ${MENU_ICONSIZE}px;
  }
  user-select: none;
`;

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  border-color: ${({ isOpen, isPushed }) => (isOpen && isPushed ? "rgba(133, 133, 133, 0.1)" : "transparent")};
  border-style: solid;
  border-width: 1px 0;
`;

const Accordion: React.FC<Props> = ({
  label,
  status,
  icon,
  isPushed,
  pushNav,
  initialOpenState = false,
  children,
  className,
  isActive,
  comming
}) => {
  const [isOpen, setIsOpen] = useState(initialOpenState);
  const handleClick = () => {
    if (isPushed) {
      setIsOpen((prevState) => !prevState);
    } else {
      pushNav(true);
      setIsOpen(true);
    }
  };

  return (
    <Container isActive={isActive}>
      <MenuEntry onClick={handleClick} className={className} isActive={isActive}>
        {icon}
        <LinkLabel isPushed={isPushed}>{label}</LinkLabel>
        {
          comming && <MenuTag>
            comming soon
          </MenuTag>
        }
        {status && (
          <LinkStatusComponent color={status.color} fontSize="14px">
            {status.text}
          </LinkStatusComponent>
        )}
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </MenuEntry>
      <AccordionContent
        isOpen={isOpen}
        isPushed={isPushed}
        maxHeight={React.Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        {children}
      </AccordionContent>
    </Container>
  );
};

export default Accordion;
