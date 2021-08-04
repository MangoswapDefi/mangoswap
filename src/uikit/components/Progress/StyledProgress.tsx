import styled from "styled-components";
import { space, variant as StyledSystemVariant } from "styled-system";
import { styleVariants, styleScales } from "./themes";
import { ProgressProps, variants } from "./types";

interface BarProps {
  primary?: boolean;
  percent?: number;
}

export const Bar = styled.div<BarProps>`
  /* position: absolute; */
  position: relative;
  top: 0;
  left: 0;
  /* background-color: ${(props) => (props.primary ? props.theme.colors.secondary : `${props.theme.colors.secondary}80`)}; */
  background: linear-gradient(270deg, #FF3C88 0%, #5DAFFD 100%);
  border-radius: 28px;
  height: 100%;
  transition: width .2s ease;
  display: flex;
    align-items: center;
  &::after {
    position: absolute;
    font-size: 12px;
    content: '${(props) => (props.percent >= 0 ? `${props.percent.toFixed(0)}%` : ' ')}';
    left: ${(props) => (props.percent < 90 ? 'calc(100% + 4px)' : '')};
    right: ${(props) => (props.percent >= 90 ? '0' : '')};
    color: ${(props) => (props.percent >= 90 ? '#ffffff' : '' ) };
    margin-right: ${(props) => props.percent >= 90 ? '5px' : ''};
  }
`;

Bar.defaultProps = {
  primary: false,
};

interface StyledProgressProps {
  variant: ProgressProps["variant"];
  scale: ProgressProps["scale"];
}

const StyledProgress = styled.div<StyledProgressProps>`
  position: relative;
  /* background-color: ${({ theme }) => theme.colors.input}; */
  background-color: rgba(242, 242, 242, 1);
  box-shadow: ${({ theme }) => theme.shadows.inset};
  overflow: hidden;

  ${Bar} {
    border-top-left-radius: ${({ variant }) => (variant === variants.FLAT ? "0" : "32px")};
    border-bottom-left-radius: ${({ variant }) => (variant === variants.FLAT ? "0" : "32px")};
  }

  ${StyledSystemVariant({
  variants: styleVariants,
})}
  ${StyledSystemVariant({
  prop: "scale",
  variants: styleScales,
})}
  ${space}
`;

export default StyledProgress;
