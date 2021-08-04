export type Position = "top" | "top-right" | "bottom" | "bottom-left";

export interface PositionProps {
  position?: Position;
}

export interface DropdownProps extends PositionProps {
  target: React.ReactElement;
}
