import React, { useState } from "react";
import useStore from "../store.jsx";
import styled from "styled-components";
import moment from "moment";
import ReminderBox from "./ReminderBox.jsx";
import TagSelector from "./TagSelector.jsx";
import StarAnimation from "./Animation.jsx";
import TagDot from "./TagDot.jsx";

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
  height: auto;

  @media (min-width: 668px) {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: start;
    margin-top: 80px;
    flex-direction: row;
    margin-top: 60px;
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
    margin-top: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 24px;
  row-gap: 20px;
  background-color: var(--card-bg);
  margin: 0 auto;
  margin-top: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;

  @media (max-width: 667px) {
    min-height: 80vh;
    height: auto;
    overflow: visible;
    margin-bottom: 80px;
  }

  @media (min-width: 668px) {
    width: 300px;
    height: auto;
    overflow: visible;
    //overflow-y: auto;
    margin-bottom: 80px;
  }

  @media (min-width: 1024px) {
    width: 400px;
    height: auto;
    overflow: visible;
    //overflow-y: auto;
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
  padding: 12px 16px;
  border: none;
  max-width: 120px;
  margin-top: 20px;
  align-items: center;

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
  width: 80%;
  margin: 0 auto;
  padding: 12px;
  cursor: pointer;
  margin-top: 20px;

  &:checked {
    border: 1px solid var(--outline);
  }

  &:hover,
  &:focus-visible {
    background-color: var(--accent);
    transform: scale(1.02);
    outline: 1px solid var(--text-dark);
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 300px;
  margin-top: 32px;
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
  width: 15px;
  height: 15px;
  cursor: pointer;
  background-color: var(--text-dark);

  &:checked {
    border: 1px solid var(--accent);
  }
`;

const TaskText = styled.span`
  flex: 1;
  margin: 0 4px;
  word-break: break-word;
  max-width: 100%;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
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

  &:hover,
  &:focus-visible {
    background-color: var(--accent);
    transform: scale(1.02);
    outline: 1px solid var(--text-dark);
  }
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
  margin: 0 auto;
  margin-top: 40px;
`;

const ToDo = () => {
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const toggleTodo = useStore((state) => state.toggleToDo);
  const removeTodo = useStore((state) => state.removeTodo);
  const [newTask, setNewTask] = useState("");
  const now = moment().format("HH:mm");
  const today = moment().format("dddd D MMMM");
  const [notes, setNotes] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTodo(newTask, notes, selectedTag);
      setNewTask("");
      setNotes("");
    }
  };

  return (
    <>
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
            <ReminderBox />
          </BoxWrapper>

          <BoxWrapper>
            <Form onSubmit={handleSubmit}>
              <h3>Write your task and notes here.</h3>
              <InputRow>
                <Input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add task"
                  aria-label="Add a new task"
                  required
                  maxLength={30}
                />
                <Input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes"
                  aria-label="Notes"
                  maxLength={30}
                />
              </InputRow>

              <TagSelector
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />

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
                      aria-label={`Mark "${todo.text}" as ${
                        todo.completed ? "incomplete" : "complete"
                      }`}
                    />{" "}
                    {todo.tag && <TagDot tag={todo.tag} />}
                    <TaskText $completed={todo.completed}>
                      {todo.text}
                      {todo.notes && ` - ${todo.notes}`}
                    </TaskText>
                    {todo.completed && <StarAnimation />}
                    <RemoveButton
                      onClick={() => removeTodo(todo.id)}
                      aria-label={`Remove task: ${todo.text}`}
                    >
                      Remove 🗑️
                    </RemoveButton>
                  </TodoItem>
                ))}
              </TodoList>
              {todos.length > 0 && (
                <>
                  <TaskCount>{todos.length} Task total</TaskCount>
                </>
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
