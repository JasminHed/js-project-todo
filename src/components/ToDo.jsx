import React from "react";
import useStore from "../store.jsx";
import styled from "styled-components";
import ReminderBox from "./ReminderBox.jsx";
import Header from "./Header.jsx";
import TodoForm from "./TodoForm.jsx";
import TodoItem from "./TodoItem.jsx";

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

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
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
  margin: 40px auto 0;
  font-size: 14px;
  color: var(--text-dark);
  text-align: center;
`;

const TodoListContainer = styled.div`
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

const ToDo = () => {
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const toggleTodo = useStore((state) => state.toggleToDo);
  const removeTodo = useStore((state) => state.removeTodo);

  const handleAddTodo = (task, notes, tag) => {
    addTodo(task, notes, tag);
  };

  const handleToggleTodo = (id) => {
    toggleTodo(id);
  };

  const handleRemoveTodo = (id) => {
    removeTodo(id);
  };

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <MainContainer>
          <ReminderBox />

          <TodoForm onAddTodo={handleAddTodo} />

          <TodoListContainer>
            <TableHead>
              <span>Task</span>
              <span>Tag</span>
              <span>Notes</span>
              <span>✔</span>
              <span>Remove</span>
            </TableHead>

            <TodoList>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onRemove={handleRemoveTodo}
                />
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
          </TodoListContainer>
        </MainContainer>
      </main>
    </>
  );
};

export default ToDo;
