// import React, { useEffect, useState } from "react";
// import Register from "../../auth/Register"; 
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMembers, deleteMember, updateMember } from "../../../redux/features/auth/authSlice";
// import EditTeamMemberPopup from "../../../components/cards/EditTeamMemberPopup";
// import { Button, Table } from "react-bootstrap";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./RegisterTeamMember.module.scss"

// const RegisterTeamMember = () => {
//   const dispatch = useDispatch();
//   // const teamMembers = useSelector((state) => state.members.teamMembers);
//   const { teamMembers = [] } = useSelector((state) => state.auth || {});
//   const teamLeaderId = useSelector((state) => state.auth.user?._id); // adjust based on your auth state

//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);

//   // useEffect(() => {
//   //   if (teamLeaderId) {
//   //     dispatch(fetchMembers(teamLeaderId));
//   //   }
//   // }, [dispatch, teamLeaderId]);

//   useEffect(() => {
//     const mockUserId = "mock-user-id-123"; // mock user ID for testing
//     dispatch(fetchMembers(mockUserId));
//   }, [dispatch]);

//   const handleEditClick = (member) => {
//     setSelectedMember(member);
//     setShowEditModal(true);
//   };

//   const handleUpdateMember = (updatedData) => {
//     dispatch(updateMember(updatedData))
//       .unwrap()
//       .then(() => {
//         toast.success("Member updated successfully");
//         dispatch(fetchMembers(teamLeaderId));
//       })
//       .catch(() => toast.error("Failed to update member"));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this member?")) {
//       dispatch(deleteMember(id))
//         .unwrap()
//         .then(() => {
//           toast.success("Member deleted");
//           dispatch(fetchMembers(teamLeaderId));
//         })
//         .catch(() => toast.error("Failed to delete member"));
//     }
//   };

//   return (
//     <div className="container mt-0 ">
//       <div className="bg-gray-50 pb-15 rounded">
//       <h3 className="mb-0">Register Team Members</h3>
      
//       {/* Register Component (preset userType) */}
//       <Register presetUserType="teamMember" />
//       </div>
//       {/* Members Table */}
      
//       <div className="mt-3 pb-3 px-3 rounded bg-gray-50">
//         <h4 className="mb-4">Registered Members</h4>
//         <Table bordered hover responsive>
//           <thead className="table-dark">
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Password</th>
//               <th style={{ textAlign: "center" }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teamMembers.length > 0 ? (
//               teamMembers.map((member) => (
//                 <tr key={member._id}>
//                   <td>{member.firstName} {member.lastName}</td>
//                   <td>{member.email}</td>
//                   <td>{member.password}</td>
//                   <td className="text-center">
//                     <Button
//                       variant="warning"
//                       size="sm"
//                       className="me-2"
//                       onClick={() => handleEditClick(member)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleDelete(member._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center">No team members found</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>

//       {/* Edit Modal */}
//       <EditTeamMemberPopup
//         show={showEditModal}
//         handleClose={() => setShowEditModal(false)}
//         memberData={selectedMember}
//         handleUpdate={handleUpdateMember}
//       />
//     </div>
//   );
// };

// export default RegisterTeamMember;



import React, { useEffect, useState } from "react";
import Register from "../../auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers, deleteMember, updateMember } from "../../../redux/features/auth/authSlice";
import EditTeamMemberPopup from "../../../components/cards/EditTeamMemberPopup";
import { Button, Table, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterTeamMember.scss";

const RegisterTeamMember = () => {
  const dispatch = useDispatch();
  const { teamMembers = [] } = useSelector((state) => state.auth || {});
  const teamLeaderId = useSelector((state) => state.auth.user?._id);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [memberToDelete, setMemberToDelete] = useState(null); // The member that is to be deleted

  useEffect(() => {
    const mockUserId = "mock-user-id-123"; // mock user ID for testing
    dispatch(fetchMembers(mockUserId));
  }, [dispatch]);

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleUpdateMember = (updatedData) => {
    dispatch(updateMember(updatedData))
      .unwrap()
      .then(() => {
        toast.success("Member updated successfully");
        dispatch(fetchMembers(teamLeaderId)); // Fetch updated members list after successful update
      })
      .catch(() => toast.error("Failed to update member"));
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member); // Set the selected member for deletion
    setShowDeleteModal(true); // Show delete confirmation modal
  };

  const handleDelete = () => {
    if (memberToDelete) {
      // Ensure we are deleting only the selected member
      dispatch(deleteMember(memberToDelete._id)) // Ensure the correct ID is passed
        .unwrap()
        .then(() => {
          dispatch(fetchMembers(teamLeaderId)); // Refetch the updated member list after deletion
          setShowDeleteModal(false); // Close delete modal after successful deletion
        })
        .catch(() => {
          toast.error("Failed to delete member");
          setShowDeleteModal(false); // Close the modal if deletion fails
        });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Close delete modal without deletion
  };

  return (
    <div className="register-team-member-container">
      <div className="form-section">
        <h3>Register Team Members</h3>
        <div className="register-form-wrapper">
          <Register presetUserType="teamMember" />
        </div>
      </div>

      <div className="members-table-section">
        <h4>Registered Members</h4>
        <div className="table-responsive">
          <Table bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <tr key={member._id}>
                    <td>{member.firstName} {member.lastName}</td>
                    <td>{member.email}</td>
                    <td>{member.password}</td>
                    <td className="text-center">
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(member)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteClick(member)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No team members found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      <EditTeamMemberPopup
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        memberData={selectedMember}
        handleUpdate={handleUpdateMember}
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this member? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterTeamMember;
