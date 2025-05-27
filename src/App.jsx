import React from "react";
import ToDo from "./components/ToDo.jsx";
import GlobalStyle from "./styling/GlobalStyle.jsx";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToDo />
    </>
  );
};

export default App;
