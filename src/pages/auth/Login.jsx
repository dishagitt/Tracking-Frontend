import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isAdminLogin = location.pathname.includes("/admin");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(resultAction)) {
        const user = resultAction.payload;

        if (user.userType === "admin") {
          navigate("/admin/app/dashboard");
        } else if (
          (user.userType === "team leader" || user.userType === "mentor") &&
          !user.isApproved
        ) {
          toast.error("Your account is pending admin approval.");
        } else {
          navigate("/app/home");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Container className="mt-48">
      <Row className="justify-content-center">
        <Col md={5}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <h3 className="text-center mb-4">Login</h3>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>

            {!isAdminLogin && (
              <div className="text-center mt-3">
                Don’t have an account?{" "}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
