import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from "./todoActions";

const initialState = JSON.parse(localStorage.getItem("todos")) || [
  { task: "Coding", id: uuidv4(), isdone: false, timestamp: Date.now() },
];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);

    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isdone: !todo.isdone } : todo
      );

    default:
      return state;
  }
};

export default todoReducer;