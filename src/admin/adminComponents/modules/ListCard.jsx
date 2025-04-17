import { useState } from 'react';
import './ListCard.scss';

const ListCard = ({
  title,
  items = [],
  onEdit,
  onDelete,
  editingId,
  editedValue,
  setEditedValue,
  onSaveEdit,
  onCancelEdit
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleCancel = () => {
    setEditedValue('');
    onCancelEdit();
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    if (deleteItemId !== null) {
      onDelete(deleteItemId);
      setShowDeletePopup(false);
      setDeleteItemId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteItemId(null);
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
                    <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="delete-popup">
          <div className="popup-card">
            <p>Are you sure you want to delete this item?</p>
            <div className="popup-actions">
              <button className="confirm" onClick={confirmDelete}>Yes</button>
              <button className="cancel" onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCard;
