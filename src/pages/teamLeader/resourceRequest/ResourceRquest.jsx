// import React, { useState } from 'react';
// import axios from 'axios';
// import './ResourceRequest.scss';
// import { toast } from 'react-toastify';

// const ResourceRequest = () => {
//   const [letter, setLetter] = useState('');
//   const [images, setImages] = useState([]);

//   const handleAddImage = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
//       setImages([...images, file]);
//     } else {
//       toast.error('Only JPG or JPEG files are allowed');
//     }
//     e.target.value = ''; // reset file input
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!letter.trim()) {
//       return toast.error('Please write a letter');
//     }
//     if (images.length === 0) {
//       return toast.error('At least one image is required');
//     }

//     const formData = new FormData();
//     formData.append('letter', letter);
//     images.forEach((img) => formData.append('images', img));

//     try {
//       await axios.post('/api/resource-request', formData);
//       toast.success('Resource request submitted successfully');
//       setLetter('');
//       setImages([]);
//     } catch (error) {
//       toast.error(error?.message,'Something went wrong');
//     }
//   };

//   return (
//     <div className="resource-request">
//       <h2>Resource Request</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="letter-section">
//           <label>Letter</label>
//           <textarea
//             rows="8"
//             value={letter}
//             onChange={(e) => setLetter(e.target.value)}
//             placeholder="Write your request letter here..."
//           />
//         </div>

//         <div className="image-upload-section">
//           <label>Upload Bills (JPEG/JPG):</label>
//           <div className="file-list">
//             {images.map((file, index) => (
//               <div key={index} className="file-item">
//                 <span>{file.name}</span>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => handleRemoveImage(index)}
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//           </div>

//           <label htmlFor="fileInput" className="add-file-btn"> Add Image</label>
//           <input
//             type="file"
//             id="fileInput"
//             accept=".jpg, .jpeg"
//             onChange={handleAddImage}
//             style={{ display: 'none' }}
//           />
//         </div>

//         <button type="submit" className="submit-btn">Submit Request</button>
//       </form>
//     </div>
//   );
// };

// export default ResourceRequest;

import React, { useEffect, useState } from "react";
import "./ResourceRequest.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../../redux/features/auth/authSlice";
import { getTeamName } from "../../../redux/features/teamInfo/teamInfoSlice";
// import axios from 'axios';

const ResourceRequest = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const teamName = useSelector((state) => state.teamInfo.teamName);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i);  

  const [letter, setLetter] = useState("");
  const [images, setImages] = useState([]);
  const [hackathon, setHackathon] = useState("");
  const [year, setYear] = useState("");
  const [history, setHistory] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(getTeamName(user.id));
    } else {
      dispatch(getLoggedInUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Fetch existing resource requests
    // axios.get(`/api/resource-requests/${teamName}`)
    //   .then((res) => setHistory(res.data))
    //   .catch((err) => toast.error('Failed to fetch requests'));

    setHistory([
      {
        id: 1,
        teamName: "Tech Titans",
        hackathon: "SIH",
        year: "2023",
        letter: "We need hardware components...",
        files: ["receipt1.jpg", "receipt2.jpg"],
        status: "Pending",
      },
      {
        id: 2,
        teamName: "Innovators",
        hackathon: "SSIP",
        year: "2024",
        letter: "Need tools for prototype...",
        files: ["bill.jpg"],
        status: "Accepted",
      },
    ]);
  }, [teamName]);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      setImages([...images, file]);
    } else {
      toast.error("Only JPG or JPEG files allowed");
    }
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const newImgs = [...images];
    newImgs.splice(index, 1);
    setImages(newImgs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!letter.trim() || !hackathon || !year) {
      return toast.error("Please fill all fields");
    }
    if (images.length === 0) return toast.error("Upload at least one image");

    const formData = new FormData();
    formData.append("letter", letter);
    formData.append("teamName", teamName);
    formData.append("hackathon", hackathon);
    formData.append("year", year);
    images.forEach((img) => formData.append("images", img));

    try {
      // await axios.post('/api/resource-requests', formData);
      toast.success("Request submitted");
      setLetter("");
      setHackathon("");
      setYear("");
      setImages([]);

      // Optionally refetch history
      // const res = await axios.get(`/api/resource-requests/${teamName}`);
      // setHistory(res.data);
    } catch (err) {
      toast.error(err?.message || "Error while submitting");
    }
  };

  const openEditModal = (item) => {
    setEditData(item);
    setEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editData.letter.trim()) return toast.error("Letter is required");

    try {
      // await axios.put(`/api/resource-requests/${editData.id}`, { letter: editData.letter });
      toast.success("Resubmitted successfully");
      setEditModal(false);

      // Optionally update in local state or refetch
    } catch (err) {
      toast.error(err?.message || "Failed to update request");
    }
  };

  const confirmDelete = async () => {
    try {
      // await axios.delete(`/api/resource-requests/${deleteId}`);
      setHistory(history.filter((item) => item.id !== deleteId));
      setDeleteId(null);
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err?.message || "Failed to delete request");
    }
  };

  return (
    <div className="resource-request">
      <div className="card">
        <h2>Resource Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Team Name</label>
            <input value={teamName || ""} disabled />
          </div>

          <div className="field">
            <label>Hackathon</label>
            <select
              value={hackathon}
              onChange={(e) => setHackathon(e.target.value)}
            >
              <option value="">Select Hackathon</option>
              <option value="SIH">SIH</option>
              <option value="SSIP">SSIP</option>
            </select>
          </div>

          <div className="field">
            <label>Year</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Letter</label>
            <textarea
              rows="10"
              placeholder="write your request letter..."
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Upload Images (JPG)</label>
            <div className="upload-box">
              {images.map((file, index) => (
                <div className="file-tag" key={index}>
                  {file.name}
                  <span onClick={() => handleRemoveImage(index)}>✖</span>
                </div>
              ))}
              <label htmlFor="imageUpload" className="upload-btn">
                Add Image
              </label>
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                accept=".jpg,.jpeg"
                onChange={handleAddImage}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>

      <div className="card history-card">
        <h3>Request History</h3>
        {history.map((item) => (
          <div className="history-item" key={item.id}>
            <div>
              <strong>Team:</strong> {item.teamName}
            </div>
            <div>
              <strong>Hackathon:</strong> {item.hackathon} - {item.year}
            </div>
            <div>
              <strong>Letter:</strong> {item.letter}
            </div>
            <div>
              <strong>Files:</strong> {item.files.join(", ")}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <span className={`status-tag ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
            <div className="action-buttons">
              <button onClick={() => openEditModal(item)}>Edit & Resend</button>
              {item.status === "Pending" && (
                <button className="delete" onClick={() => setDeleteId(item.id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit & Resend</h3>
            <form onSubmit={handleEditSubmit}>
              <textarea
                rows="5"
                value={editData.letter}
                onChange={(e) =>
                  setEditData({ ...editData, letter: e.target.value })
                }
              />
              <div className="modal-buttons">
                <button type="submit">Resend</button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="modal">
          <div className="modal-content">
            <h4>Are you sure you want to delete this request?</h4>
            <div className="modal-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button className="cancel" onClick={() => setDeleteId(null)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceRequest;
