import "./App.css";
import React from "react";
import Title from "./components/title";
import AddTodo from "./components/addTodo";
import Todo from "./components/todo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [hist, setHist] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const h = query(collection(db, "hist"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    const unsubHist = onSnapshot(h, (querySnapshot) => {
      let histArray = [];
      querySnapshot.forEach((doc) => {
        histArray.push({ ...doc.data(), id: doc.id });
      });
      setHist(histArray);
    });
    return () => [unsub(), unsubHist()];
  }, []);

  const handleEdit = async (todo, title, date) => {
    await updateDoc(doc(db, "todos", todo.id), { title, date });
    await addDoc(collection(db, "hist"), {
      title: `Task '${todo.title}' was updated to '${title}'`,
    });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
    await addDoc(collection(db, "hist"), {
      title: `Task '${todo.title}' set as completed`,
    });
  };
  const handleDelete = async (todo) => {
    await deleteDoc(doc(db, "todos", todo.id));
    await addDoc(collection(db, "hist"), {
      title: `Task '${todo.title}' deleted`,
    });
  };

  return (
    <div className="App">
      <div>
        <Title />
        <AddTodo />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
        <h3>History</h3>
        {hist.map((hist) => (
          <h4>{hist.title}</h4>
        ))}
      </div>
    </div>
  );
}

export default App;
