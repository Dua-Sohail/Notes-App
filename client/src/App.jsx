import { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = async (id) => {
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setNotes((prev) => prev.filter((note) => note._id !== id));
    }
  };

  return (
    <div>
      <h1>Notes App</h1>
      <NoteForm onAdd={addNote} />
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
}

export default App;