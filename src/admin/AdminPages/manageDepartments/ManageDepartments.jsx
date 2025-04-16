import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment
} from '../../../redux/features/admin/adminSlice';

import AddCard from '../../adminComponents/modules/AddCard';
import ListCard from '../../adminComponents/modules/ListCard';

const ManageDepartments = () => {
  const dispatch = useDispatch();
  const departments = useSelector(state => state.admin.departments);

  // State management
  const [newDepartment, setNewDepartment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState('');

  // Fetching the list of departments on mount
  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, [dispatch]);

  // Handler for adding a new department
  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      dispatch(addDepartment(newDepartment.trim()));
      setNewDepartment(''); // Reset input field
    }
  };

  // Handler for deleting a department
  const handleDeleteDepartment = (id) => {
    dispatch(deleteDepartment(id));
  };

  // Handler for editing a department
  const handleEditClick = (id, currentName) => {
    setEditingId(id);
    setEditedDepartment(currentName);
  };

  // Handler for saving edited department
  const handleSaveEdit = (id) => {
    if (editedDepartment.trim()) {
      dispatch(updateDepartment({ id, department: editedDepartment.trim() }));
      setEditingId(null); // Reset the editing state
      setEditedDepartment(''); // Clear the edited value
    }
  };

  // Handler for canceling the edit
  const handleCancelEdit = () => {
    setEditingId(null); // Reset the editing state
    setEditedDepartment(''); // Clear the edited value
  };

  return (
    <div className="container">
      <h2>Manage Departments</h2>

      {/* Add New Department */}
      <AddCard
        title="Add New Department"
        value={newDepartment}
        onChange={(e) => setNewDepartment(e.target.value)}
        onAdd={handleAddDepartment}
        placeholder="Enter new department name"
      />

      {/* List of Departments */}
      <ListCard
        title="Existing Departments"
        items={departments}
        editingId={editingId}
        editedValue={editedDepartment}
        onEdit={handleEditClick}
        onDelete={handleDeleteDepartment}
        setEditedValue={setEditedDepartment}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    </div>
  );
};

export default ManageDepartments;
