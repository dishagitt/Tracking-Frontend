import React, { useState } from 'react';
import axios from 'axios';
import './ResourceRequest.scss';
import { toast } from 'react-toastify';

const ResourceRequest = () => {
  const [letter, setLetter] = useState('');
  const [images, setImages] = useState([]);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setImages([...images, file]);
    } else {
      toast.error('Only JPG or JPEG files are allowed');
    }
    e.target.value = ''; // reset file input
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!letter.trim()) {
      return toast.error('Please write a letter');
    }
    if (images.length === 0) {
      return toast.error('At least one image is required');
    }

    const formData = new FormData();
    formData.append('letter', letter);
    images.forEach((img) => formData.append('images', img));

    try {
      await axios.post('/api/resource-request', formData);
      toast.success('Resource request submitted successfully');
      setLetter('');
      setImages([]);
    } catch (error) {
      toast.error(error?.message,'Something went wrong');
    }
  };

  return (
    <div className="resource-request">
      <h2>Resource Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="letter-section">
          <label>Letter</label>
          <textarea
            rows="8"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            placeholder="Write your request letter here..."
          />
        </div>

        <div className="image-upload-section">
          <label>Upload Bills (JPEG/JPG):</label>
          <div className="file-list">
            {images.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => handleRemoveImage(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          <label htmlFor="fileInput" className="add-file-btn"> Add Image</label>
          <input
            type="file"
            id="fileInput"
            accept=".jpg, .jpeg"
            onChange={handleAddImage}
            style={{ display: 'none' }}
          />
        </div>

        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
    </div>
  );
};

export default ResourceRequest;
