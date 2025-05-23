//Store manages global state for todos across all components. Without store we have to send props between all components (codesnippet that can be reused)
import { create } from "zustand";
import { persist } from "zustand/middleware";

//manages the todo list (add, toggle, remove) and stores it in local storage so it stays even when you reload the page.
const useStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text, notes, tag = "") =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now(), text, notes, tag, completed: false },
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
