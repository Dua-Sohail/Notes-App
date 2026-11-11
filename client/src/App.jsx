import { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";

const API = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setNotes(data))
      .catch(() => setError("Could not load notes. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  const addNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (res.ok) {
      setNotes((prev) => prev.filter((note) => note._id !== id));
    }
  };

  // returns null on success, or an error message on failure
  const updateNote = async (id, updates) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();

    if (!res.ok) return data.message;

    setNotes((prev) => prev.map((note) => (note._id === id ? data : note)));
    return null;
  };

  return (
    <div>
      <h1>Notes App</h1>
      <NoteForm onAdd={addNote} />

      {loading && <p>Loading notes...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && notes.length === 0 && <p>No notes yet.</p>}

      {notes.map((note) => (
        <NoteCard
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
    </div>
  );
}

export default App;