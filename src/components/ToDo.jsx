import React, { useState } from "react";
import useStore from "../store.jsx";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import Lottie from "lottie-react";
import Animation from "../animations/star.json";

//control + styling of postit animation slide in + hanging
const slideIn = keyframes`
  from {
    transform: translateY(-30px) rotate(-10deg) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translateY(0) rotate(-5deg) scale(1.05);
    opacity: 1;
  }
`;

const CornerImage = styled.img`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 200px;
  height: auto;
  z-index: 10;
  animation: ${slideIn} 1.5s ease-out;
  transform: rotate(-5deg) scale(1.05);

  @media (max-width: 667px) {
    display: none;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 24px;

  @media (min-width: 668px) {
    margin-top: 48px;
    margin-bottom: 32px;
  }
`;

const Time = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 200px);

  @media (min-width: 668px) {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: start;
    margin-top: 80px;
    flex-direction: row;
    height: calc(100vh - 150px);
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    margin: 0 auto;
    justify-items: center;
    align-items: start;
    max-width: 900px;
    gap: 40px;
    margin-top: 80px;
  }
`;

const Reminder = styled.div`
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
    position: sticky;
    top: 0;
    padding-top: 40px;
  }

  @media (min-width: 1024px) {
    width: 300px;
    height: 260px;
    padding-top: 60px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 16px;
  background-color: var(--card-bg);
  margin: 0 auto;
  margin-top: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;

  @media (max-width: 667px) {
    max-height: calc(100vh - 400px);
    overflow-y: auto;
  }

  @media (min-width: 668px) {
    width: 300px;
    height: 700px;
    max-height: calc(100vh - 350px);
    overflow-y: auto;
  }

  @media (min-width: 1024px) {
    width: 400px;
    height: 700px;
    overflow-y: auto;
  }
`;

const BoxWrapper = styled.div`
  width: 90%;
  max-width: 300px;
  margin-bottom: 16px;

  @media (min-width: 668px) {
    width: auto;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`;

const Input = styled.input`
  padding: 10px 16px;
  border: none;
  max-width: 130px;
  margin-top: 20px;

  @media (min-width: 1024px) {
    align-items: center;
  }

  &:focus {
    outline: 2px solid var(--outline);
  }
`;

const AddButton = styled.button`
  border: none;
  border-radius: 8px;
  max-width: 50%;
  margin: 0 auto;
  padding: 10px 10px;
  margin-top: 10px;
  cursor: pointer;
  margin-top: 20px;

  &:checked {
    border: 1px solid var(--outline);
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 300px;
  margin-top: 25px;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  gap: 4px;

  input[type="checkbox"] {
    margin-right: 12px;
    transform: scale(1.2);
  }
`;

const StyledCheckBox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  margin-right: 4px;
  transform: scale(1.3);
  margin-left: 4px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  cursor: pointer;
  background-color: var(--outline);

  &:checked {
    background-color: var(--text-dark);
    border: 2px solid var(--text-color);
  }
`;

const TaskText = styled.span`
  flex: 1;
  margin: 0 4px;
  word-break: break-word;
  max-width: 100%;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: var(--text-dark);
`;

const RemoveButton = styled.button`
  border: none;
  border-radius: 8px;
  max-width: 100px;
  padding: 5px 5px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TaskList = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 16px;
  color: var(--text-dark);

  @media (min-width: 668px) {
    margin-top: 40px;
  }

  @media (min-width: 1024px) {
    margin-top: 80px;
  }
`;

const TaskCount = styled.p`
  margin-left: 15px;
  margin-top: 8px;
  font-size: 14px;
  color: var(--text-dark);
`;

const AnimationWrapper = styled.div`
  max-width: 50px;
  max-height: 50px;
  display: flex;
  position: absolute;
  right: 80px;

  @media (min-width: 668px) {
    max-width: 90px;
    max-height: 90px;
  }
`;

//retrieves todo actions and data from the Zustand store
const ToDo = () => {
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const toggleTodo = useStore((state) => state.toggleToDo);
  const removeTodo = useStore((state) => state.removeTodo);
  const [newTask, setNewTask] = useState("");
  const now = moment().format("HH:mm");
  const today = moment().format("dddd D MMMM");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTodo(newTask, notes);
      setNewTask("");
      setNotes("");
    }
  };

  return (
    <>
      <CornerImage src="/assets/post.png" alt="Positive decoration" />
      <header>
        <Header>
          <h1>Todays Focus</h1>
          <Time>
            <h2>{now}</h2>
            <p>{today}</p>
          </Time>
        </Header>
      </header>
      <main>
        <MainContainer>
          <BoxWrapper>
            <Reminder>
              <h2>Reminder</h2>
              <p>Small steps everyday lead to big changes</p>
            </Reminder>
          </BoxWrapper>

          <BoxWrapper>
            <Form onSubmit={handleSubmit}>
              <h3>Write your task and notes here.</h3>
              <InputRow>
                <Input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task"
                  aria-label="Add a new task"
                  required
                  maxLength={30}
                />

                <Input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes (optional)"
                  aria-label="Notes"
                  maxLength={30}
                />
              </InputRow>

              <AddButton type="submit" aria-label="Add a new task">
                Add Task
              </AddButton>
              <TodoList>
                {todos.map((todo) => (
                  <TodoItem key={todo.id}>
                    <StyledCheckBox
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      //action of the checkbox depending on the task's status.
                      aria-label={`Mark "${todo.text}" as ${
                        todo.completed ? "incomplete" : "complete"
                      }`}
                    />
                    <TaskText completed={todo.completed}>
                      {todo.text}
                      {todo.notes && ` - ${todo.notes}`}
                    </TaskText>
                    {todo.tag && <Tag tag={todo.tag}>{todo.tag}</Tag>}

                    {todo.completed && (
                      <AnimationWrapper>
                        <Lottie animationData={Animation} loop={false} />
                      </AnimationWrapper>
                    )}
                    <RemoveButton
                      //when clicked, removes the specific todo by its ID and provides an accessible label like “Remove task: Buy milk” for screen readers.
                      onClick={() => removeTodo(todo.id)}
                      aria-label={`Remove task: ${todo.text}`}
                    >
                      Remove Task
                    </RemoveButton>
                  </TodoItem>
                ))}
              </TodoList>
              {todos.length > 0 && (
                <TaskCount>{todos.length} Task total</TaskCount>
              )}
              {todos.length === 0 && (
                <TaskList>
                  You have no tasks at the moment. Enjoy your day!
                </TaskList>
              )}
            </Form>
          </BoxWrapper>
        </MainContainer>
      </main>
    </>
  );
};

export default ToDo;
