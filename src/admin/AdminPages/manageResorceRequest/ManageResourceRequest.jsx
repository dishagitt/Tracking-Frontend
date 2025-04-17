import React, { useState, useEffect } from "react";
import styles from "./ManageResorceRequest.module.scss";
import { toast } from "react-toastify";
// import axios from 'axios';  // Uncomment if axios is installed and used

// Mock data with images, hackathon info
const mockRequests = [
  {
    id: 1,
    teamName: "Team Alpha",
    teamLeaderName: "John Doe",
    enrollmentNo: "123456789012",
    hackathonName: "SIH",
    hackathonYear: "2025",
    message: "Requesting resources for a robotics project.",
    imageUrls: ["https://placebear.com/200/300"],
    date: "2025-04-15T14:30:00Z",
    status: "pending",
  },
  {
    id: 2,
    teamName: "Team Beta",
    teamLeaderName: "Jane Smith",
    enrollmentNo: "234567890123",
    hackathonName: "SSIP",
    hackathonYear: "2024",
    message: "Requesting resources for a web development project.",
    imageUrls: [
      "https://via.placeholder.com/150",
      "https://picsum.photos/200/300",
    ],
    date: "2025-04-14T12:20:00Z",
    status: "approved",
  },
  {
    id: 3,
    teamName: "Team Gamma",
    teamLeaderName: "Alice Johnson",
    enrollmentNo: "345678901234",
    hackathonName: "CodeFest",
    hackathonYear: "2025",
    message: "Requesting resources for a data analysis project.",
    imageUrls: [
      "https://placekitten.com/200/hackathon ",
      "https://dummyimage.com/200x300/bill",
    ],
    date: "2025-04-13T10:15:00Z",
    status: "pending",
  },
];

const ManageResourceRequest = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Uncomment below line when you want to use the actual API call
      // const res = await axios.get("/api/resource-requests");
      // setRequests(res.data);
      
      // Using mock data for now, so we'll set the mockRequests
      setRequests(mockRequests);
    } catch (err) {
      toast.error(err?.message,"Failed to fetch requests");
    }
  };

  const handleApprove = async (id) => {
    try {
      // Uncomment below line when you want to use the actual API call
      // await axios.put(`/api/resource-requests/${id}/approve`);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
      );
      toast.success("Request approved");
    } catch (err) {
      toast.error(err?.message || "Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      // Uncomment below line when you want to use the actual API call
      // await axios.delete(`/api/resource-requests/${id}/reject`);
      setRequests((prev) => prev.filter((req) => req.id !== id));
      toast.success("Request rejected");
    } catch (err) {
      toast.error(err?.message || "Rejection failed");
    }
  };

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const approvedRequests = requests.filter((req) => req.status === "approved");

  const renderRequestCard = (request, showActions = false) => (
    <div key={request.id} className={styles.requestCard}>
      <div><strong>Team Name:</strong> {request.teamName}</div>
      <div><strong>Team Leader:</strong> {request.teamLeaderName}</div>
      <div><strong>Enrollment No:</strong> {request.enrollmentNo}</div>
      <div><strong>Hackathon:</strong> {`${request.hackathonName} (${request.hackathonYear})`}</div>
      <div><strong>Message:</strong> {request.message}</div>
      <div><strong>Request Date:</strong> {new Date(request.date).toLocaleDateString()}</div>

      {request.imageUrls?.length > 0 && (
        <div className={styles.imageNameList}>
          <strong>Attached Files:</strong>
          {request.imageUrls.map((url, index) => {
            const fileName = url.split("/").pop();
            return (
              <span
                key={index}
                className={styles.imageName}
                onClick={() => setPreviewImage(url)}
              >
                {fileName}
              </span>
            );
          })}
        </div>
      )}

      {showActions && (
        <div className={styles.actions}>
          <button
            className={styles.approveBtn}
            onClick={() => handleApprove(request.id)}
          >
            Approve
          </button>
          <button
            className={styles.rejectBtn}
            onClick={() => handleReject(request.id)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.manageContainer}>
      <h2 className={styles.sectionTitle}>Pending Resource Requests</h2>
      {pendingRequests.length > 0 ? (
        pendingRequests.map((req) => renderRequestCard(req, true))
      ) : (
        <p className={styles.emptyText}>No pending requests</p>
      )}

      <h2 className={styles.sectionTitle}>Approved Resource Requests</h2>
      {approvedRequests.length > 0 ? (
        approvedRequests.map((req) => renderRequestCard(req))
      ) : (
        <p className={styles.emptyText}>No approved requests yet</p>
      )}

      {previewImage && (
        <div className={styles.modalBackdrop} onClick={() => setPreviewImage(null)}>
          <div className={styles.modalImageContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalClose} onClick={() => setPreviewImage(null)}>
              &times;
            </div>
            <img src={previewImage} alt="Preview" className={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageResourceRequest;
