import styled from "styled-components";
import { HEAD_NAV_HEIGHT } from "utils/config";

export const PageContainerStyle = styled.div`
  width: 930px;
  max-width: 100%;
  height: calc(100vh - ${HEAD_NAV_HEIGHT}px);
  margin: auto;
  height: 100%;
  overflow: hidden;
`