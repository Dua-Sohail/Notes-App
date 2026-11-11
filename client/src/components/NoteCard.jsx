import { useState } from "react";

function NoteCard({ id, title, content, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [error, setError] = useState("");

  const handleSave = async () => {
    const message = await onUpdate(id, {
      title: editTitle,
      content: editContent,
    });

    if (message) {
      setError(message);
    } else {
      setError("");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditContent(content);
    setError("");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default NoteCard;