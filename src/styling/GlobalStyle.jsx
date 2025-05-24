import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
 box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  overflow-x: hidden;
}


body {
  min-height: 100vh;
  line-height: 1.6;
  font-size: 16px;
  background-color: var(--background-color);
  background-image: 
  linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url("/assets/Background5.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
  background-position: center;
  color: var(--text-dark);
  background-color: var(--card-bg);

}


@media (max-width: 1023px) {
  body {
    height: auto;
    overflow-y: auto;
  }
}

@media (min-width: 1024px) {
  body {
    height: auto;        
    overflow-y: auto; 
  }
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
  --card-bg: #ffffff99;; 
  --accent: #d7ccc8; 
  --text-dark: #333333;

}


h1 {
  text-align: center;
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: var(--text-color);
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
