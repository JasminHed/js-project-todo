import React, { useState } from "react";
import styled from "styled-components";
import TagSelector from "./TagSelector.jsx";

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

const TodoForm = ({ onAddTodo }) => {
  const [newTask, setNewTask] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTodo(newTask, notes, selectedTag);
      setNewTask("");
      setNotes("");
      setSelectedTag(null);
    }
  };

  return (
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
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes"
              aria-label="Write Notes"
              maxLength={15}
            />
            <Count>{notes.length}/15</Count>
          </InputCount>
        </CountWrapper>
      </InputRow>

      <TagSelector selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

      <AddButton type="submit" aria-label="Add a new task">
        Add Task
      </AddButton>
    </Form>
  );
};

export default TodoForm;
