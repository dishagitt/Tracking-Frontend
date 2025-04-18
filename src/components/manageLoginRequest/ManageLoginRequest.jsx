import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../../redux/features/auth/authSlice';
import styles from './ManageLoginRequest.module.scss';

const mockData = [
  {
    _id: '1',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    userType: 'team-leader',
    idProof: 'https://via.placeholder.com/150',
    status: 'pending',
  },
  {
    _id: '2',
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jane@example.com',
    userType: 'mentor',
    idProof: 'https://via.placeholder.com/150',
    status: 'approved',
  },
];

const ManageLoginRequest = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [requests, setRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      // Mocking API call
      const pending = mockData.filter((r) => r.status === 'pending');
      const approved = mockData.filter((r) => r.status === 'approved');
      setRequests(pending);
      setApprovedRequests(approved);
    }
  }, [user]);

  const handleAction = async (id, action) => {
    try {
      // let response;
      if (action === 'approve') {
        // await axios.put(`/api/request/approve/${id}`, { status: 'approved' });
        const approvedUser = requests.find((r) => r._id === id);
        setApprovedRequests((prev) => [...prev, { ...approvedUser, status: 'approved' }]);
        setRequests((prev) => prev.filter((r) => r._id !== id));
        toast.success('Request approved');
      } else if (action === 'reject') {
        // await axios.put(`/api/request/reject/${id}`, { status: 'rejected' });
        setRequests((prev) => prev.filter((r) => r._id !== id));
        toast.success('Request rejected');
      } else if (action === 'delete') {
        // await axios.delete(`/api/request/delete/${id}`);
        setApprovedRequests((prev) => prev.filter((r) => r._id !== id));
        setRequests((prev) => prev.filter((r) => r._id !== id));
        toast.success('Request deleted');
      }
    } catch (err) {
      toast.error(err?.message,'Error processing the request');
    }
  };

  const renderTable = (data, actions) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>User Type</th>
          <th>ID Proof</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">No data</td>
          </tr>
        ) : (
          data.map((user) => (
            <tr key={user._id}>
              <td>{user.firstname} {user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td>
                <a href={user.idProof} target="_blank" rel="noopener noreferrer">View</a>
              </td>
              <td>
                {actions.includes('accept') && (
                  <button onClick={() => handleAction(user._id, 'approve')} className="btn btn-success btn-sm me-2">Accept</button>
                )}
                {actions.includes('reject') && (
                  <button onClick={() => handleAction(user._id, 'reject')} className="btn btn-danger btn-sm me-2">Reject</button>
                )}
                {actions.includes('delete') && (
                  <button
                    onClick={() => {
                      setDeleteId(user._id);
                      setShowDeletePopup(true);
                    }}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.manageRequest}>
      {user.userType === 'mentor' && (
        <>
          <h3>Pending Team Leader Requests</h3>
          {renderTable(requests, ['accept', 'reject'])}
          <h3 className="mt-4">Approved Team Leaders</h3>
          {renderTable(approvedRequests, ['delete'])}
        </>
      )}
      {user.userType === 'admin' && (
        <>
          <h3>Pending Mentor & Volunteer Requests</h3>
          {renderTable(requests, ['accept', 'reject'])}
          <h3 className="mt-4">Approved Mentors & Volunteers</h3>
          {renderTable(approvedRequests, ['delete'])}
        </>
      )}

      {showDeletePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>Are you sure you want to delete this request?</p>
            <div className={styles.popupActions}>
              <button
                onClick={() => {
                  handleAction(deleteId, 'delete');
                  setShowDeletePopup(false);
                  setDeleteId(null);
                }}
                className="btn btn-danger btn-sm me-2"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowDeletePopup(false);
                  setDeleteId(null);
                }}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLoginRequest;
