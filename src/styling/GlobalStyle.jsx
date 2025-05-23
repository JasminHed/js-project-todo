import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
 box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100vh;  
  overflow-x: hidden;
 
}

body {
  height: 100vh;
  line-height: 1.6;
  font-size: 16px;
  background-image: 
  linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url("/assets/Background5.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
  background-position: center;
  color: var(--text-color);
  overflow: hidden;
 
}

@media (min-width: 668px) {
body {
  background-position: bottom center;
}


}

:root {
  --background-color: #fdf6f0; 
  --text-color: #ffffff;
  --outline: #a1887f;
  --card-bg: #ffffffcc; 
  --accent: #d7ccc8; 
  --text-dark: #333333;

}


h1 {
  text-align: center;
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 30px;
}

h2 {
  font-size: 20px;
}

h3 {

  font-size: 18px;
  text-align: center;
  color: var(--text-dark);
}

`;
export default GlobalStyle;
