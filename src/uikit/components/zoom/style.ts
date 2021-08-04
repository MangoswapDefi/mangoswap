import styled from "styled-components"


const Zoom = styled.div<{ zoom: number }>`
zoom: ${({ zoom }) => zoom};
`

export default Zoom