import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ManageUserTypes.scss';
import {
  fetchAllUserTypes,
  addUserType,
  updateUserType,
  deleteUserType
} from '../../../redux/features/admin/adminSlice';

import AddCard from '../../modules/AddCard';
import ListCard from '../../modules/ListCard';

const ManageUserTypes = () => {
  const dispatch = useDispatch();
  const userTypes = useSelector(state => state.admin.userTypes);
  console.log('Fetched userTypes:', userTypes);

  const [newUserType, setNewUserType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedUserType, setEditedUserType] = useState('');

  useEffect(() => {
    dispatch(fetchAllUserTypes());
  }, [dispatch]);

  const handleAddUserType = () => {
    if (newUserType.trim()) {
      dispatch(addUserType(newUserType.trim()));
      setNewUserType('');
    }
  };

  const handleDeleteUserType = (id) => {
    dispatch(deleteUserType(id));
  };

  const handleEditClick = (id, currentName) => {
    setEditingId(id);
    setEditedUserType(currentName);
  };

  const handleSaveEdit = (id) => {
    if (editedUserType.trim()) {
      dispatch(updateUserType({ id, userType: editedUserType.trim() }));
      setEditingId(null);
      setEditedUserType('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);  // Reset the editingId
    setEditedUserType('');  // Reset the edited value
  };

  return (
    <div className="container">
      <h2>Manage User Types</h2>

      <AddCard
        title="Add New User Type"
        value={newUserType}
        onChange={(e) => setNewUserType(e.target.value)}
        onAdd={handleAddUserType}
        placeholder="Enter new user type"
      />

      <ListCard
        title="Existing User Types"
        items={userTypes}
        editingId={editingId}
        editedValue={editedUserType}
        onEdit={handleEditClick}
        onDelete={handleDeleteUserType}
        setEditedValue={setEditedUserType}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}  // Pass the cancel handler
      />
    </div>
  );
};

export default ManageUserTypes;
