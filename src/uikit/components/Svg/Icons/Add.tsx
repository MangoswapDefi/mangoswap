import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 36 36" {...props}>
      <circle cx="18.2264" cy="18.7272" r="17.8182" fill="#F2F2F2"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.9531 25.4091C16.9531 25.9363 17.3805 26.3636 17.9077 26.3636C18.4349 26.3636 18.8622 25.9363 18.8622 25.4091V19.3636H24.9077C25.4349 19.3636 25.8622 18.9363 25.8622 18.4091C25.8622 17.8819 25.4349 17.4545 24.9077 17.4545H18.8622V11.4091C18.8622 10.8819 18.4349 10.4545 17.9077 10.4545C17.3805 10.4545 16.9531 10.8819 16.9531 11.4091V17.4545H10.9077C10.3805 17.4545 9.95312 17.8819 9.95312 18.4091C9.95312 18.9363 10.3805 19.3636 10.9077 19.3636H16.9531V25.4091Z" fill="#BDBDBD"/>
    </Svg>
  );
};

export default Icon;
