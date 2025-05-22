import React, { useState } from "react"
import useStore from "../store.jsx"
import styled from "styled-components"
import moment from "moment"
import Lottie from "lottie-react"
import Animation from "../animations/star.json"




const Header = styled.div`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 48px;

  @media (min-width: 668px) {
    margin-top: 48px;
    margin-bottom: 64px;
  }
`

const MainContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 200px);


@media (min-width: 668px){
  display: flex;
  align-items: flex-start;      
  justify-content: center;
  flex-direction: row;
  gap: 32px;
  height: calc(100vh - 250px);
         
}

`

const BoxWrapper = styled.div`
  width: 90%;
  max-width: 300px;
  margin-bottom: 16px;

  @media (min-width: 668px) {
    width: auto;
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
  margin-bottom: 40px;


`
const Reminder = styled.div `
  background-color: var(--card-bg);
  color: var(--text-dark);
  text-align: center;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 10px;


  @media (min-width: 668px) {
    width: 280px;
    height: 220px;
    margin: 0;
    position: sticky;
    top: 0;
  }
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
  width: 100%;
  max-width: 340px;

  @media (max-width: 667px) {
    max-height: calc(100vh - 400px);
    overflow-y: auto;
  }

  @media (min-width: 668px) {
    width: 340px;
    max-height: calc(100vh - 350px);
    overflow-y: auto;
   
  }

  @media (min-width: 1024px) {
  max-height: calc(100vh - 250px); 
  overflow-y: auto;
}
`

const TaskList = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 16px;
  color: var(--text-dark);
`

const Input = styled.input `
  padding: 10px 16px;
  border: none;

&:focus {
  outline: 2px solid var(--outline);
}

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
  margin-left: 15px;
  margin-top: 8px;
  font-size: 14px;
  color: var(--text-dark);
  
`

const TaskText = styled.span`
  flex: 1;
  word-break: break-word;
  max-width: 100%;
  text-decoration: ${props => props.completed ? "line-through" : "none"};
  color: var(--text-dark);
`

const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 20px;
  transform: scale(1.3);
  margin-left: 15px;


  &:focus {
    outline: 2px solid var(--outline);    
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
  max-width: 40px;
  max-height: 40px;
  display: flex;
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
    <>
    <Header>
     <h1>Todays Focus</h1>
        <Time>
          <h2>{now}</h2>
          <p>{today}</p>
        </Time>
        </Header>

        <MainContainer>
        <BoxWrapper>
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
        {todos.length > 0 && (
        <TaskCount>{todos.length} Task total</TaskCount>)}
        {todos.length === 0 && (
          <TaskList>You have no tasks at the moment. Enjoy your day!</TaskList>
        )}
        </Form>
        </BoxWrapper> 
    </MainContainer>
    </>
  )
}  

export default ToDo

