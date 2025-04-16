import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './ManageBranchComponent.scss';
import {
  fetchAllBranches,
  addBranch,
  updateBranch,
  deleteBranch
} from '../../../redux/features/admin/adminSlice'; 

import AddCard from '../../adminComponents/modules/AddCard';
import ListCard from '../../adminComponents/modules/ListCard';

const ManageBranches = () => {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.admin.branches);
  
  // State management
  const [newBranch, setNewBranch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedBranch, setEditedBranch] = useState('');

  // Fetching the list of branches on mount
  useEffect(() => {
    dispatch(fetchAllBranches());
  }, [dispatch]);

  // Handler for adding a new branch
  const handleAddBranch = () => {
    if (newBranch.trim()) {
      dispatch(addBranch(newBranch.trim()));
      setNewBranch(''); // Reset input field
    }
  };

  // Handler for deleting a branch
  const handleDeleteBranch = (id) => {
    dispatch(deleteBranch(id));
  };

  // Handler for editing a branch
  const handleEditClick = (id, currentName) => {
    setEditingId(id);
    setEditedBranch(currentName);
  };

  // Handler for saving edited branch
  const handleSaveEdit = (id) => {
    if (editedBranch.trim()) {
      dispatch(updateBranch({ id, branch: editedBranch.trim() }));
      setEditingId(null); // Reset the editing state
      setEditedBranch(''); // Clear the edited value
    }
  };

  // Handler for canceling the edit
  const handleCancelEdit = () => {
    setEditingId(null); // Reset the editing state
    setEditedBranch(''); // Clear the edited value
  };

  return (
    <div className="container">
      <h2>Manage Branches</h2>

      {/* Add New Branch */}
      <AddCard
        title="Add New Branch"
        value={newBranch}
        onChange={(e) => setNewBranch(e.target.value)}
        onAdd={handleAddBranch}
        placeholder="Enter new branch name"
      />

      {/* List of Branches */}
      <ListCard
        title="Existing Branches"
        items={branches}
        editingId={editingId}
        editedValue={editedBranch}
        onEdit={handleEditClick}
        onDelete={handleDeleteBranch}
        setEditedValue={setEditedBranch}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};

export default ManageBranches;
