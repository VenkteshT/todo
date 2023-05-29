import React from "react";
import "./Item.css";
export default function Item({ item, deleteTodo, updateTodo, index }) {
  return (
    <li className="item">
      <div className="content">{item.title}</div>
      <img
        src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
        alt="edit"
        className="edit"
        onClick={() => updateTodo(index)}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/128/542/542724.png"
        alt="delete"
        className="delete"
        onClick={() => deleteTodo(item.id)}
      />
    </li>
  );
}
