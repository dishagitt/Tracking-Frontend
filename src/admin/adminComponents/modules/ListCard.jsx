import './ListCard.scss';

const ListCard = ({
  title,
  items = [], // default to empty array to avoid undefined errors
  onEdit,
  onDelete,
  editingId,
  editedValue,
  setEditedValue,
  onSaveEdit,
  onCancelEdit
}) => {
  const handleCancel = () => {
    setEditedValue(''); // Clear the input value
    onCancelEdit();     // Reset the editingId in the parent component
  };

  return (
    <div className="card list-card">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul className="list-group">
          {items.map((item) => (
            <li key={item.id} className="list-group-item">
              {editingId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                  <div className="actions">
                    <button onClick={() => onSaveEdit(item.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{item.name}</span>
                  <div className="actions">
                    <button onClick={() => onEdit(item.id, item.name)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListCard;
