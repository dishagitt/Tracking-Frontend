import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
};

const EditTeamMemberPopup = ({
  show,
  handleClose,
  memberData,
  handleUpdate,
}) => {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (show && memberData) {
      setForm(memberData);
    }
  }, [show, memberData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!form.firstName || !form.lastName || !form.email || !form.contact) {
      toast.error("All fields are required");
      return false;
    }
    if (!phoneRegex.test(form.contact)) {
      toast.error("Contact must be 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    handleUpdate(form);
    toast.success("Team member updated");
    handleClose();
  };

  const handleCancel = () => {
    setForm(memberData || initialFormState);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Edit Team Member</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTeamMemberPopup;
