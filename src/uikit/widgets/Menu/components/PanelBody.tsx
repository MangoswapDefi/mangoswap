import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import useIntl from 'hooks/useIntl'
import { SvgProps } from "../../../components/Svg";
import * as IconModule from "../icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel, LinkStatus } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "../types";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

export const MenuTag = styled.div`
  background: #ffecce;
  font-size: 12px;
  padding: 4px;
  border-radius: 5px;
  color: #ffa307;
`

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();
  const intl = useIntl()
  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container>
      {links.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="32px" mr="8px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname);
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;
          return (
            <Accordion
              key={entry.label}
              comming={entry.comming}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              status={entry.status}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.items.some((item) => item.href === location?.pathname)}
              togglePush={() => { let i; i++}}
            >
              {isPushed &&
                entry.items.map((item,key) => (
                  <MenuEntry key={key.toString()} secondary isActive={item.href === location?.pathname} onClick={handleClick}>
                    <MenuLink target={item.target} href={item?.href}>
                      <LinkLabel isPushed={isPushed} style={{paddingLeft: '19px'}}>{intl(`menu.${item.label}`)}</LinkLabel>
                      {item.status && (
                        <LinkStatus color={item.status.color} fontSize="14px">
                          {item.status.text}
                        </LinkStatus>
                      )}
                    </MenuLink>
                  </MenuEntry>
                ))}
            </Accordion>
          );
        }
        return (
          <MenuEntry key={entry.label} isActive={entry.href === location?.pathname || location?.pathname?.includes(entry.href)} className={calloutClass}>
            <MenuLink href={entry.href} onClick={handleClick}>
              {iconElement}
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
              {
                entry.comming && <MenuTag>
                  comming soon
                </MenuTag>
              }
              {entry.status && (
                <LinkStatus color={entry.status.color} fontSize="14px">
                  {entry.status.text}
                </LinkStatus>
              )}
            </MenuLink>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;
