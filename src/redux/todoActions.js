import { v4 as uuidv4 } from "uuid";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

// Action to add a new todo
export const addTodo = (task) => ({
  type: ADD_TODO,
  payload: { task, id: uuidv4(), isdone: false, timestamp: Date.now() },
});

// Action to delete a todo
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

// Action to toggle the done todo
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});