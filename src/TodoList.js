import React, { useEffect, useState } from "react";
import "./todostyle.css";
import { FaPenNib } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
// import yourname from "./asset/yourname.mp4";
import demonslayer from "./asset/demonslayer.mp4";

// to get from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

// Main function
function TodoList() {
  const [todos, setTodos] = useState(getLocalItems()); //contains the main data array []
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completed: false,
    };

    // If the entered input is already present then flag=1 if not then flag remains 0
    let flag = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].text == newTodo.text) {
        flag = 1;
        break;
      }
    }

    if (newTodo.text === "") {
      alert("Please 🙏 add ✍️ some task in input field 😊");
    } else if (flag == 1) {
      alert("The given input....☠️....text ✍️ already exists 🚀");
    } else {
      setTodos([...todos, newTodo]);
    }
    setText("");
  };
  //  if the id of checked element get matched then made changes in todos array and set completed to true
  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Deleting items
  const deleteItem = (id) => {
    console.log(id);
    const updateditems = todos.filter((elm) => {
      return elm.id !== id;
    });
    setTodos(updateditems);
  };

  // Date time
  const formatDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  // Clear all data/Items
  const removeall = () => {
    setTodos([]);
  };
  //adding data to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="main">
      <video src={demonslayer} autoPlay loop muted></video>
      <div className="belowcont">
        <h1>
          Todo List <FaPenNib />
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="✍️Add todo"
            value={text}
            className="forminput"
            onChange={(event) => setText(event.target.value)}
          />
          <button type="submit">Add</button>
          {/* <button type="submit"> + </button> */}
        </form>
        <ul>
          {todos.map((todo) => (
            <>
              <button id="date">{formatDate()}</button>
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="userindputfild"
                  onChange={() => handleComplete(todo.id)}
                />
                <textarea
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  className="spanfild"
                >
                  {todo.text}
                </textarea>
                <RiDeleteBin2Fill
                  onClick={() => deleteItem(todo.id)}
                  className="bin"
                />
              </li>
            </>
          ))}
        </ul>
        <button onClick={removeall}>Clear All</button>
      </div>
    </div>
  );
}

export default TodoList;
