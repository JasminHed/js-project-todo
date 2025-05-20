import React from "react"
import useStore from "../store.jsx"

//fetching todos from zustand + 3 buttons that shows tasks
const ToDo = () => {
  const todos = useStore(state => state.todos)
  const addTodo = useStore(state => state.addTodo)



  return (
    <div>
      <p>Tasks: {todos.length}</p>
      <button onClick={() => addTodo("Study material")}>Add Study Task</button>
      <button onClick={() => addTodo("Implement Code")}>Add Study Task</button>
      <button onClick={() => addTodo("Seek Internship")}>Add Study Task</button>

    </div>
  )
}

export default ToDo
