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
      <div className="note-card">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <div className="note-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-ghost" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="note-card">
      <h3>{title}</h3>
      <p>{content}</p>
      <div className="note-actions">
        <button className="btn btn-ghost" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;