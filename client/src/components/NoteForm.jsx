import { useState } from "react";

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      onAdd(data);
      setTitle("");
      setContent("");
      setError("");
    } catch {
      setError("Could not reach the server.");
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button className="btn btn-primary" type="submit">
        Add note
      </button>
    </form>
  );
}

export default NoteForm;