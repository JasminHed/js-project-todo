import React, { useState } from "react"
import useStore from "../store.jsx"
import styled from "styled-components"


const TaskCount = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 16px;
`

const Form = styled.form `
display: flex;
flex-direction: column;
border-radius: 10px;
padding: 16px;
background-color: #ffffffcc;
max-width: 90%;
margin: 0 auto;
margin-top: 8px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

`
const TaskList = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 16px;
`

const Input = styled.input `
padding: 10px 16px;
border: none;


&:focus {
    outline: 2px solid var(--outline);
`

const Button = styled.button `
border: none;
border-radius: 8px;
max-width: 50%;
margin: 0 auto;
padding: 10px 10px;
margin-top: 10px;
cursor: pointer;

`



const ToDo = () => {
  const todos = useStore(state => state.todos)
  const addTodo = useStore(state => state.addTodo)
  const toggleTodo = useStore(state => state.toggleToDo)
  const removeTodo = useStore (state => state.removeTodo)
  const [newTask, setNewTask] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      addTodo(newTask)
      setNewTask("")
    }
  }

  return (
   <div>
    
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <Button type="submit">Add Task</Button>
      </Form>

      {todos.length === 0 && (
  <TaskList>You have no tasks at the moment. Enjoy your day!</TaskList>
)}


      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Remove Task</button>
          </li>
        ))}
      </ul>
      <TaskCount>{todos.length} Tasks total</TaskCount>
      </div>
  )
}

export default ToDo

