import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "./axios";
import Item from "./components/item/Item";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // States
  const [todo, setTodo] = useState([]);
  const [data, setData] = useState("");
  const [isUpdating, setIsUpdating] = useState({
    id: "",
    index: "",
    state: false,
  });

  // use Effect hook
  useEffect(() => {
    axios.get("").then((res) => {
      const { data } = res;
      setTodo([...data]);
    });
  }, []);

  // add todo
  const addTodo = () => {
    // post request
    axios.post("/", { data });

    if (!data) {
      toast.error(`can't add empty todo`, { autoClose: 1300 });
      return;
    }
    //
    setTodo((p) => [{ id: Date.now(), title: data }, ...p]);
    setData("");
    toast.success("new todo added", { autoClose: 1000 });
  };

  // delte todo
  const deleteTodo = (id) => {
    // delete request
    axios.delete("", { id });

    //
    setTodo((p) => p.filter((el) => el.id !== id));
    toast.success("todo Deleted", { autoClose: 1000 });
  };

  // set update todo info
  const updateTodoInfo = (index) => {
    //
    setData(todo[index].title);

    // set todo item info
    setIsUpdating({
      id: todo[index].id,
      index,
      state: true,
    });
  };

  // update todo
  const updateTodo = (value) => {
    // put request
    axios.put("/", { data: value });

    if (!value) {
      toast.error(`can't update empty content`, { autoClose: 1300 });
      return;
    }
    //
    todo[isUpdating.index].title = value;
    setData("");
    setIsUpdating({
      id: "",
      index: "",
      state: false,
    });
    toast.success("todo updated", { autoClose: 1000 });
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="container">
        <div className="collect-data">
          <div className="title title-1">Add Todo</div>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                id="todo-input"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="ex:- go to gym"
              />
              <button
                className="btn"
                onClick={() =>
                  isUpdating.state ? updateTodo(data) : addTodo()
                }
              >
                {isUpdating.state ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
        <div className="todo-list">
          <div className="title title-2">Todo List</div>
          <div className="list">
            {todo.map((item, i) => (
              <Item
                item={item}
                index={i}
                key={item.id}
                deleteTodo={deleteTodo}
                updateTodo={updateTodoInfo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
