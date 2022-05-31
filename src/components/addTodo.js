import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTodo() {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");

  const handleSubmit = async (e, title, date) => {
    e.preventDefault();
    if (title !== "" && date !== new Date()) {
      await addDoc(collection(db, "todos"), {
        title,
        date,
        completed: false,
      });

      await addDoc(collection(db, "hist"), {
        title: `Task '${title}' created at ${date}`,
      });

      setTitle("");
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e, title, date)}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enter date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button disabled={title === "" || date === ""}>Add</button>
    </form>
  );
}
