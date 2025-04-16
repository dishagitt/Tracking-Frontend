import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../../redux/features/admin/adminSlice";
import styles from './AdminAnnouncement.module.scss';

const AdminAnnouncement = () => {
  const dispatch = useDispatch();
  const { announcements, loading } = useSelector((state) => state.admin);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    id: null,
    date: new Date().toISOString(), // Automatically set the current date
  });

  useEffect(() => {
    dispatch(fetchAllAnnouncements());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openModal = (announcement = null) => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        id: announcement.id,
        date: announcement.date,
      });
      setIsEditing(true);
    } else {
      setFormData({ title: "", id: null, date: new Date().toISOString() });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      date: new Date().toISOString(), // Update date when editing
    };

    if (isEditing) {
      dispatch(updateAnnouncement(updatedFormData));
    } else {
      dispatch(addAnnouncement(updatedFormData));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      dispatch(deleteAnnouncement(id));
    }
  };

  return (
    <div className={styles["announcement-container"]}>
      <div className={styles["announcement-header"]}>
        <h2>Manage Announcements</h2>
        <button onClick={() => openModal()}>+ Add Announcement</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles["announcement-list"]}>
          {announcements?.map((item) => (
            <div key={item.id} className={styles["announcement-card"]}>
              <div className={styles["card-content"]}>
                <h4>{item.title}</h4>
                <small>{new Date(item.date).toLocaleDateString()}</small>
              </div>
              <div className={styles["card-actions"]}>
                <button onClick={() => openModal(item)}>✎</button>
                <button onClick={() => handleDelete(item.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className={styles["modal-backdrop"]}>
          <div className={styles["modal"]}>
            <h3>{isEditing ? "Edit Announcement" : "Add Announcement"}</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                rows="4"
              />
              <div className={styles["modal-actions"]}>
                <button type="submit">{isEditing ? "Update" : "Add"}</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncement;