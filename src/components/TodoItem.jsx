import React from "react";
import styled from "styled-components";
import TagDot from "./TagDot.jsx";

const TodoItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  //display: grid;
  //grid-template-columns: 50px 12px 90px 25px 75px;
  padding: 6px;
  gap: 2px;
  align-items: center;
  width: 100%;
  max-width: 800px;
  border-bottom: 1px solid var(--outline);

  @media (max-width: 667px) {
    gap: 2px;
  }

  /*@media (min-width: 481px) and (max-width: 668px) {
    display: grid;
    grid-template-columns: 120px 15px 180px 40px 80px;
    padding: 10px;
    gap: 6px;
  }*/

  @media (min-width: 668px) {
    display: grid;
    grid-template-columns: 150px 130px 2fr 60px 100px;
    flex-wrap: nowrap;
    padding: 8px 0;
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

  @media (max-width: 667px) {
    margin: 3px 0;
    transform: scale(1.5);
  }
`;

const TaskText = styled.span`
  flex: 1;
  margin: 0 4px;
  word-break: break-word;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: var(--text-dark);
  min-width: 100px;

  @media (max-width: 667px) {
    text-align: center;
    font-weight: 500;
    margin-bottom: 3px;
  }
`;

const RemoveButton = styled.button`
  border: none;
  border-radius: 8px;
  width: 80px;
  padding: 5px;
  cursor: pointer;

  @media (max-width: 667px) {
    margin-top: 12px;
    padding: 8px 16px;
  }

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

const NotesText = styled.span`
  word-break: break-word;

  @media (max-width: 667px) {
    visibility: hidden;
  }
`;

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <TodoItemContainer>
      <TaskText $completed={todo.completed}>{todo.text}</TaskText>
      {todo.tag ? (
        <TagDot tag={todo.tag} />
      ) : (
        <div style={{ height: "12px" }} />
      )}
      <NotesText>{todo.notes || <span>&nbsp;</span>}</NotesText>
      <StyledCheckBox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        type="checkbox"
        aria-label="Checkbox"
      />
      <RemoveButton
        onClick={() => onRemove(todo.id)}
        type="remove"
        aria-label="Remove task"
      >
        Remove 🗑️
      </RemoveButton>
    </TodoItemContainer>
  );
};

export default TodoItem;
