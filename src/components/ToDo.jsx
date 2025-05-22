import React, { useState } from "react"
import useStore from "../store.jsx"
import styled from "styled-components"
import moment from "moment"
import Lottie from "lottie-react"
import Animation from "../animations/star.json"


const MainContainer = styled.div `
display: flex;
flex-direction: column;
align-items: center;


@media (min-width: 668px){
flex-direction: row;
justify-content: center;
gap: 24px;
align-items: flex-start;
}
`

const BoxWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 16px;
  gap: 25px;

  @media (min-width: 668px) {
    margin-bottom: 0;
  }
`

const TodoList = styled.ul `
list-style: none;
padding: 0;
width: 100%;
max-width: 300px;
margin-top: 25px;

`
const TodoItem = styled.li `
display: flex;
align-items: center;


input[type="checkbox"] {
    margin-right: 12px;
    transform: scale(1.2);
  }

`

const Time = styled.div`
text-align: center;


`
const Reminder = styled.div `
background-color: var(--card-bg);
text-align: center;
border-radius: 10px;
padding: 16px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
margin: 0 auto;
margin-top: 8px;
margin-bottom: 10px;

`

const Form = styled.form `
display: flex;
flex-direction: column;
border-radius: 10px;
padding: 16px;
background-color: var(--card-bg);
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

const AddButton = styled.button `
border: none;
border-radius: 8px;
max-width: 50%;
margin: 0 auto;
padding: 10px 10px;
margin-top: 10px;
cursor: pointer;

`

const TaskCount = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 16px;
`

const TaskText = styled.span`
  flex: 1;
  font-size: 16px;
  margin-right: 12px;
  word-break: break-word;
  text-decoration: ${props => props.completed ? "line-through" : "none"};
`

const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 12px;
  transform: scale(1.3);


  &:focus {
    outline: 2px solid var(--outline);    
    outline-offset: 2px;
  }
`

const RemoveButton = styled.button `
border: none;
border-radius: 8px;
max-width: 100px;
margin: 0 auto;
padding: 5px 5px;
cursor: pointer;
margin-top: 5px;
margin-bottom: 5px;
`

const AnimationWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  background: transparent ;
`



const ToDo = () => {
  const todos = useStore(state => state.todos)
  const addTodo = useStore(state => state.addTodo)
  const toggleTodo = useStore(state => state.toggleToDo)
  const removeTodo = useStore (state => state.removeTodo)
  const [newTask, setNewTask] = useState("")

  const now = moment().format("HH:mm")
  const today = moment().format("dddd D MMMM")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      addTodo(newTask)
      setNewTask("")
    }
  }

  return (
    <MainContainer>
      <BoxWrapper>
        <Time>
          <h2>{now}</h2>
          <p>{today}</p>
        </Time>
        <Reminder>
          <h3>Reminder</h3>
          <p>Small steps everyday lead to big changes</p>
        </Reminder>
      </BoxWrapper>
  
      <BoxWrapper>
        <Form onSubmit={handleSubmit}>
          <Input 
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <AddButton type="submit">Add Task</AddButton>
        </Form>
  
        {todos.length === 0 && (
          <TaskList>You have no tasks at the moment. Enjoy your day!</TaskList>
        )}
  
        <TodoList>
          {todos.map(todo => (
            <TodoItem key={todo.id}>
              <StyledCheckBox
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <TaskText completed={todo.completed}>
                {todo.text}
              </TaskText>
  
              {todo.completed && (
                <AnimationWrapper>
                  <Lottie animationData={Animation} loop={false} />
                </AnimationWrapper>
              )}
  
              <RemoveButton onClick={() => removeTodo(todo.id)}>Remove Task</RemoveButton>
            </TodoItem>
          ))}
        </TodoList>
  
        <TaskCount>{todos.length} Tasks total</TaskCount>
      </BoxWrapper>
    </MainContainer>
  )
}  

export default ToDo

