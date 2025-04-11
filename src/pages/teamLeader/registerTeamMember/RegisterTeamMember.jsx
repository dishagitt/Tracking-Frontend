import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Register from "../../auth/Register";
import {
  fetchMembers,
  deleteMember,
} from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const RegisterTeamMember = () => {

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const { teamMembers, memberLoading } = useSelector((state) => state.auth);

  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    if (userId) dispatch(fetchMembers(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Fetched members: ", teamMembers);
  }, [teamMembers]);

  const handleSuccess = () => {
    toast.success(
      editingMember ? "Team member updated!" : "Team member registered!"
    );
    setEditingMember(null);
    dispatch(fetchMembers(userId));
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleDelete = (memberId) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      dispatch(deleteMember(memberId));
    }
  };

  return (
    <div className="team-member-register-page">
      <h1 className="snap-center">{editingMember ? "Update Team Member" : "Register Team Member"}</h1>

      <Register
        presetUserType="team-member"
        hideUserTypeSelect={true}
        onSuccess={handleSuccess}
        editData={editingMember}
      />

      <div className="team-member-list">
        <h2>Registered Team Members</h2>
        {memberLoading ? (
          <p>Loading members...</p>
        ) : !teamMembers || teamMembers.length === 0 ? (
          <p>No team members registered yet.</p>
        ) : (
          <table className="team-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member._id}>
                  <td>
                    {member.firstName} {member.lastName}
                  </td>
                  <td>{member.email}</td>
                  <td>{member.contact}</td>
                  <td>
                    <button onClick={() => handleEdit(member)}>Edit</button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RegisterTeamMember;
