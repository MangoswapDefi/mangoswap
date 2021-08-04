import styled from "styled-components"

const IfoTagStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.tag};
  color: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  position: absolute;
  top: 0px;
  right: 35px;
  font-size: 14px;
  padding: 7px 12px;
`
export default IfoTagStyle