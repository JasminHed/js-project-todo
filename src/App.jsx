import React from 'react'
import ToDo from "./components/ToDo.jsx"
import GlobalStyle from "./styling/GlobalStyle.jsx"

function App() {
  return (
    <>
    <GlobalStyle />
      <h1>Todays Focus</h1>
      <ToDo />
      </>
  )
 
}

export default App
