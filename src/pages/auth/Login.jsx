import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formCardRef = useRef(null);
  const blueCardRef = useRef(null);

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
          toast.error("Your account is pending for approval.");
        } else {
          navigate("/app/home");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    if (formCardRef.current && blueCardRef.current) {
      blueCardRef.current.style.height = `${formCardRef.current.offsetHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (formCardRef.current && blueCardRef.current) {
      const observer = new ResizeObserver(() => {
        blueCardRef.current.style.height = `${formCardRef.current.offsetHeight}px`;
      });
      observer.observe(formCardRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-6 sm:py-12">
      <div className="relative w-full sm:max-w-lg mx-auto"> {/* Increased max-width */}
        <div
          ref={blueCardRef}
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
        ></div>
        <div
          ref={formCardRef}
          className="relative bg-white shadow-lg sm:rounded-3xl px-6 pt-8 pb-8 sm:px-10"
        >
          <h3 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Login
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </button>
            </div>

            {!isAdminLogin && (
              <div className="text-center mt-3">
                Don’t have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Register here!
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;