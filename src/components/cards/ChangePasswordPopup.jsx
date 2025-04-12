import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons from react-icons

const initialFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordPopup = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (show) {
      setForm(initialFormState);
      setShowPassword({ current: false, new: false, confirm: false });
    }
  }, [show]);

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New and confirm passwords do not match");
      return;
    }

    if (!validatePassword(form.newPassword)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    try {
      await dispatch(changePassword(form)).unwrap();
      toast.success("Password changed successfully");
      handleClose(); // Auto-close modal
    } catch (err) {
      toast.error(err?.message || "Password change failed");
    }
  };

  const handleCancel = () => {
    setForm(initialFormState);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Current Password */}
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => togglePassword("current")}
              >
                {showPassword.current ? <FiEyeOff /> : <FiEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          {/* New Password */}
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => togglePassword("new")}
              >
                {showPassword.new ? <FiEyeOff /> : <FiEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => togglePassword("confirm")}
              >
                {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
              </Button>
            </InputGroup>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Change Password
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ChangePasswordPopup;
