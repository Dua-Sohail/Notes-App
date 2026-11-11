function NoteCard({ id, title, content, onDelete }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default NoteCard;