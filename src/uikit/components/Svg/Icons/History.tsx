import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="-5 -5 24 24" {...props} style={{fill: 'none'}}>
      <path d="M0.818359 2.49288C0.818359 1.568 1.56812 0.818237 2.493 0.818237H8.49791C8.94205 0.818237 9.368 0.994672 9.68206 1.30873L13.725 5.35167C14.0391 5.66573 14.2155 6.09168 14.2155 6.53582V15.0527C14.2155 15.9776 13.4657 16.7273 12.5408 16.7273H2.493C1.56812 16.7273 0.818359 15.9776 0.818359 15.0527V2.49288Z" stroke="#828282" strokeWidth="1.25598"/>
      <path d="M9.19141 5.84216V1.22253C9.19141 1.07334 9.37179 0.99862 9.47729 1.10412L13.9295 5.55628C14.0349 5.66178 13.9602 5.84216 13.811 5.84216H9.19141Z" stroke="#828282" strokeWidth="1.17225" strokeLinejoin="round"/>
      <line x1="3.33008" y1="10.2381" x2="11.7033" y2="10.2381" stroke="#828282" strokeWidth="1.25598"/>
      <path d="M3.33008 13.0431H10.0286" stroke="#828282" strokeWidth="1.25598"/>
    </Svg>
  );
};

export default Icon;
