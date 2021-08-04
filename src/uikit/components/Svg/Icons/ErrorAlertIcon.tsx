import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 128 128" width="64" height="64" style={{fill: '#FFFFFF'}} {...props} >
        <circle cx="64" cy="64" r="60" stroke="#FF3C88" strokeWidth="8"/>
        <path d="M59.795 94.93V89.8C59.795 88.3 60.515 87.55 61.955 87.55H66.905C68.285 87.55 68.975 88.3 68.975 89.8V94.93C68.975 96.31 68.285 97 66.905 97H61.955C60.515 97 59.795 96.31 59.795 94.93ZM60.335 31.21H68.345L67.715 79.36H60.965L60.335 31.21Z" fill="#FF3C88"/>
    </Svg>
  );
};

export default Icon;
