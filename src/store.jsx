import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text, notes = "") =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now(), text, notes, completed: false },
          ],
        })),

      toggleToDo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    { name: "todo-storage" }
  )
);

export default useStore;
