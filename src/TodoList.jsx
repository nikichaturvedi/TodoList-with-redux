import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "./redux/todoActions"; // path to actions
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoList() {
  // Access the todos from the Redux store
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const addNewTask = () => {
    if (newTodo.trim() === "") {
      toast.error("Please enter a valid task!");
      return;
    }
    dispatch(addTodo(newTodo));
    toast.success("Task added successfully!");
    setNewTodo("");
  };


  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };


  const deleteTodoIteam = (id) => {
    dispatch(deleteTodo(id));
    toast.info("Task deleted!");
  };


  const markAsDone = (id) => {
    dispatch(toggleTodo(id));

    const updatedTodo = todos.find((todo) => todo.id === id); 
    if (updatedTodo.isdone) {
      toast.success("Task unmarked!");
    } else {
      toast.success("Task marked as done!");
    }
  };
  

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.isdone === b.isdone) {
      return b.timestamp - a.timestamp;
    }
    return a.isdone ? 1 : -1;
  });

  return (
    <div className="main">
      <input placeholder="Add a task" value={newTodo} onChange={updateTodoValue} />
      <br />
      <br />
      <button id="mainbtn" onClick={addNewTask}>
        Add Task
      </button>

      <h1></h1>
      <h3>Tasks Todo</h3>
      <div>
        {sortedTodos.map((todo) => (
          <b key={todo.id}>
            <ul>
              <div className="container">
                <span style={todo.isdone ? { textDecoration: "line-through blue" } : {}}>&hearts; &nbsp;{todo.task}</span>
                <div>
                  <i id="done" className={todo.isdone ? "fa-solid fa-square-check" : "fa-regular fa-square-check"} onClick={() => markAsDone(todo.id)}></i>
                  <i id="delete" className="fa-solid fa-trash" onClick={() => deleteTodoIteam(todo.id)} ></i>
                </div>
              </div>
            </ul>
          </b>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}