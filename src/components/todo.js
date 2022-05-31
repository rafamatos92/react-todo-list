import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [newTitle, setNewTitle] = React.useState(todo.title);
  const [newDate, setNewDate] = React.useState(todo.date);

  const handleTitleChange = (e, t) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(t);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
    handleEdit(todo, e.target.value, newDate);
  };

  const handleDateChange = (e, d) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewDate(d);
    } else {
      todo.title = "";
      setNewDate(e.target.value);
    }
    handleEdit(todo, newTitle, e.target.value);
  };

  return (
    <div>
      {todo.completed ? (
        <div className="row">
          <h3>{todo.title}</h3>
          <h3>{todo.date}</h3>
          <button onClick={() => handleDelete(todo)}>
            <DeleteIcon id="i" />
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={todo.title === "" ? newTitle : todo.title}
            onChange={(e) => {
              handleTitleChange(e, newTitle);
            }}
          />
          <input
            type="date"
            value={todo.date === "" ? newDate : todo.date}
            onChange={(e) => handleDateChange(e, newDate)}
          />
          <button onClick={() => toggleComplete(todo)}>
            <CheckCircleIcon id="i" />
          </button>
          <button onClick={() => handleDelete(todo)}>
            <DeleteIcon id="i" />
          </button>
        </div>
      )}
    </div>
  );
}
