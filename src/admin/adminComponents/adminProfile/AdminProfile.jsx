import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProfile.scss';
import { toast } from 'react-toastify';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    idProof: null,
  });

  const [preview, setPreview] = useState(null);

  // Fetch admin profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/admin/profile'); // 🔁 Replace with actual endpoint
        setAdminData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          contact: res.data.contact,
          idProof: res.data.idProof,
        });
        if (res.data.idProof) setPreview(res.data.idProof);
      } catch (err) {
        toast.error(err?.message,'Failed to fetch admin profile');
      }
    };

    fetchProfile();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAdminData({ ...adminData, idProof: file });
    setPreview(URL.createObjectURL(file));
  };

  // Save changes
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', adminData.firstName);
      formData.append('lastName', adminData.lastName);
      formData.append('contact', adminData.contact);
      if (adminData.idProof instanceof File) {
        formData.append('idProof', adminData.idProof);
      }

      await axios.put('/api/admin/profile', formData); // 🔁 Replace with actual endpoint
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.message,'Failed to update profile');
    }
  };

  return (
    <div className="admin-profile-container shadow p-4 bg-white rounded">
      <h3 className="mb-4">Admin Profile</h3>
      <form onSubmit={handleSave} className="admin-profile-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={adminData.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={adminData.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Email (not editable)</label>
          <input
            type="email"
            value={adminData.email}
            className="form-control"
            disabled
          />
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={adminData.contact}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>ID Proof</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="ID Proof"
                className="preview-img"
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
