import React, { useState } from "react";
import useStore from "../store.jsx";
import styled from "styled-components";
import moment from "moment";
import ReminderBox from "./ReminderBox.jsx";
import TagSelector from "./TagSelector.jsx";
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
  color: var(--text-color);
`;

const TableHead = styled.div`
  display: none;

  @media (min-width: 668px) {
    display: grid;
    grid-template-columns: 150px 130px 2fr 60px 100px;
    padding: 10px 0;
    font-weight: bold;
    border-bottom: 2px solid var(--outline);
    text-align: left;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    gap: 8px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 16px;
  margin: 8px auto 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 95%;
  margin-bottom: 15px;

  @media (min-width: 668px) {
    width: 90%;
    padding: 20px;
  }

  @media (min-width: 1024px) {
    width: 100%;
    max-width: 1000px;
    padding: 24px;
    margin-bottom: 60px;
  }
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 12px;

  @media (min-width: 668px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  border: none;
  width: 100%;
  margin-top: 0;

  @media (min-width: 668px) {
    max-width: 250px;
  }

  &:focus {
    outline: 2px solid var(--outline);
  }
`;

const AddButton = styled.button`
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  cursor: pointer;
  margin: 20px 0 0;

  @media (min-width: 668px) {
    width: 80%;
    max-width: 300px;
    margin: 20px auto 0;
    margin-bottom: 10px;
  }

  &:hover,
  &:focus-visible {
    background-color: var(--accent);
    transform: scale(1.02);
    outline: 1px solid var(--text-dark);
  }
`;

const TodoItem = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* for wrapping on miniscreen */
  align-items: center;
  padding: 10px;
  width: 100%;
  max-width: 800px;
  border-bottom: 1px solid var(--outline);
  gap: 6px;

  @media (min-width: 668px) {
    display: grid;
    grid-template-columns: 150px 130px 2fr 60px 100px;
    flex-wrap: nowrap;
    padding: 8px 0;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const StyledCheckBox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  margin-right: 4px;
  transform: scale(1.3);
  margin-left: 4px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  background-color: var(--accent);
  border: 1px solid var(--text-dark);

  &:checked {
    background-color: var(--outline);
    border: 1px solid var(--text-dark);
  }

  &:checked::after {
    content: "✔";
    color: var(--text-dark);
    position: absolute;
    font-size: 12px;
    top: -2px;
    left: 2px;
  }
`;

const TaskText = styled.span`
  flex: 1;
  margin: 0 4px;
  word-break: break-word;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: var(--text-dark);
  min-width: 100px;
`;

const RemoveButton = styled.button`
  border: none;
  border-radius: 8px;
  width: 80px;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 668px) {
    width: 100px;
  }

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

const NotesText = styled.span`
  word-break: break-word;

  @media (max-width: 668px) {
    display: none;
  }
`;

const TaskCount = styled.p`
  margin: 40px auto 0;
  font-size: 14px;
  color: var(--text-dark);
  text-align: center;
`;

const CountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 668px) {
    flex-direction: row;
    justify-content: center;
    gap: 24px;
  }
`;

const InputCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  @media (min-width: 668px) {
    max-width: 250px;
  }
`;

const Count = styled.div`
  margin-top: 10px;
  margin-left: 4px;
  margin-right: 2px;
  min-width: 60px;
  text-align: right;
  white-space: nowrap;
  font-size: 10px;
`;

//Todo component with state management hooks for todos, form inputs (task, notes, tag), and a submit handler that adds new todos and clears the form.
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
          <ReminderBox />

          <Form onSubmit={handleSubmit}>
            <h3>Write your task and notes here.</h3>
            <InputRow>
              <CountWrapper>
                <InputCount>
                  <Input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add task"
                    aria-label="Add a new task"
                    required
                    maxLength={30}
                  />
                  <Count>{newTask.length}/30</Count>
                  <Input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)} //gets the current text from the input field when user types.
                    placeholder="Add notes"
                    aria-label="Write Notes"
                    maxLength={15}
                  />
                  <Count>{notes.length}/15</Count>
                </InputCount>
              </CountWrapper>
            </InputRow>

            <TagSelector
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />

            <AddButton type="submit" aria-label="Add a new task">
              Add Task
            </AddButton>
            <TableHead>
              <span>Task</span>
              <span>Tag</span>
              <span>Notes</span>
              <span>✔</span>
              <span>Remove</span>
            </TableHead>
            <TodoList>
              {todos.map((todo) => (
                <TodoItem key={todo.id}>
                  <TaskText $completed={todo.completed}>{todo.text}</TaskText>
                  {todo.tag ? (
                    <TagDot tag={todo.tag} />
                  ) : (
                    <div style={{ height: "12px" }} />
                  )}
                  <NotesText>{todo.notes || <span>&nbsp;</span>}</NotesText>
                  <StyledCheckBox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    type="checkbox"
                    aria-label="Checkbox"
                  />
                  <RemoveButton
                    onClick={() => removeTodo(todo.id)}
                    type="remove"
                    aria-label="Remove task"
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
        </MainContainer>
      </main>
    </>
  );
};

export default ToDo;
