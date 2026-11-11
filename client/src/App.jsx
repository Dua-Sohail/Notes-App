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

  return (
    <div>
      <h1>Notes App</h1>
      <NoteForm onAdd={addNote} />
      {notes.map((note) => (
        <NoteCard key={note._id} title={note.title} content={note.content} />
      ))}
    </div>
  );
}

export default App;