import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`

* {
 box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html, body {
  height: 100%;
}

body {
min-height: 100vh;
line-height: 1.6;
font-size: 16px;
background-image: 
linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url("/assets/Background2.jpg");
background-repeat: no-repeat;
background-size: cover;
font-family: "Roboto", sans-serif;
background-position: center;
color: var(--text-color);
}

:root {
--background-color: #fdf6f0;
--text-color: #FFFFFF;
--outline: #a1887f;
  
}

h1 {
text-align: center;
font-size: 24px;
margin-top: 10px;
}




`
export default GlobalStyle