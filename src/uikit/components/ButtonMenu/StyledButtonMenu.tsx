import styled from 'styled-components'

const StyledButtonMenu = styled.div`
  background-color: #fff;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  padding: 2px 4px;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
  & > button + button,
  & > a + a {
    margin-left: 2px; // To avoid focus shadow overlap
  }
`

export default StyledButtonMenu
