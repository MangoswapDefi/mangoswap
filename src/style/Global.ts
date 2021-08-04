import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }: any) => theme?.colors?.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  ul {
    list-style: none; 
  }

  li {
    display: flex;
    align-items: center;
  }

  /* li::before {
    content: "•";
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 8px;
  } */

  .flex{
      display: -webkit-box; /*  Safari, iOS, Android browser, older WebKit browsers. */
      display: -moz-box; /*Firefox (buggy) */
      display: -ms-flexbox; /*  IE 10 */
      display: -webkit-flex; /* Chrome 21+ */
      display: flex; /*  Opera 12.1, Firefox 22+ */
  }
  .alignItems{
      -webkit-box-align: center;
      -moz-align-items: center;
      -webkit-align-items: center;
      align-items: center;
  }

  .flex-wrap {
      flex-wrap: wrap;
  }

  .flex-row {
      flex-direction: row;
  }
  .flex-column{
      flex-direction: column;
  }

  .flex-col {
      flex-direction: column;
  }

  .flex-center-x {
      justify-content: center;
  }
  .flex-center-y {
      align-items: center;
  }

  .flex-space-x {
      justify-content: space-between;
  }

  .flex-space-a {
      justify-content: space-around;
  }
`

export default GlobalStyle
