import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/auth/authSlice";
import { fetchAllUserTypes } from "../../redux/features/admin/adminSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Spinner } from "react-bootstrap"; // Using Bootstrap Spinner for consistency

const Register = ({
  presetUserType = "",
  hideUserTypeSelect = false,
  onSuccess = null,
  onUpdate = null, // NEW: for editing support
  initialData = null, // NEW: for pre-filling form
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const userTypes = useSelector((state) => state.admin.userTypes);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    userType: presetUserType || "",
    idProof: null,
  });

  // NEW: Prefill data if editing
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        idProof: null, // Don't pre-fill file inputs
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (!hideUserTypeSelect && presetUserType !== "teamMember") {
      dispatch(fetchAllUserTypes());
    }
  }, [dispatch, hideUserTypeSelect, presetUserType]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "idProof" ? files[0] : value,
    }));
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, idProof: null }));
    document.querySelector('input[name="idProof"]').value = "";
  };

  const validateForm = () => {
    const { firstName, lastName, contact, email, password, userType, idProof } =
      formData;

    const patterns = {
      name: /^[A-Za-z]+$/,
      contact: /^[0-9]{10}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
      fileExt: /\.(jpg|jpeg)$/i, // NEW: ID proof extension check
    };

    if (!patterns.name.test(firstName))
      return toast.error("Invalid first name");
    if (!patterns.name.test(lastName)) return toast.error("Invalid last name");
    if (!patterns.contact.test(contact))
      return toast.error("Invalid 10-digit contact");
    if (!patterns.email.test(email)) return toast.error("Invalid email");
    if (!initialData && !patterns.password.test(password))
      return toast.error(
        "Password must be 8+ chars with number & special char"
      );
    if (!userType) return toast.error("User type is required");

    if (!initialData || idProof) {
      if (!idProof) return toast.error("ID proof is required");
      if (!patterns.fileExt.test(idProof.name))
        return toast.error("ID proof must be .jpg or .jpeg only");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value || key === "idProof") data.append(key, value); // skip empty unless it's the file
    });

    try {
      if (initialData && onUpdate) {
        await onUpdate(data); // EDIT: Custom update handler
        toast.success("Team member updated!");
      } else {
        const result = await dispatch(
          registerUser({ formData: data, navigate })
        );

        if (registerUser.fulfilled.match(result)) {
          const isApprovalRequired =
            ["teamLeader", "mentor", "volunteer"].includes(formData.userType) &&
            presetUserType !== "teamMember";

          if (isApprovalRequired) {
            toast.success("Registration submitted! Awaiting approval.");
          } else {
            toast.success("Registration successful!");
          }

          onSuccess ? onSuccess() : navigate("/login");
        } else {
          const msg = result.payload || "Registration failed";
          toast.error(
            msg.includes("already exists") ? "User already exists" : msg
          );
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex justify-center sm:py-12">
      <div className="relative sm:max-w-3xl w-full sm:mx-auto mx-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl px-6 pt-12 pb-8 sm:px-12">
          <h3 className="text-center text-2xl font-semibold text-gray-800 mb-8">
            {initialData ? "Edit Member" : "Register"}
          </h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-6 gap-4">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
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

            {!initialData && (
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
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
            )}

            {presetUserType === "teamMember" ? (
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="userType" className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
                <input
                  type="text"
                  id="userType"
                  name="userType"
                  value="teamMember"
                  disabled
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 cursor-not-allowed"
                />
              </div>
            ) : (
              !hideUserTypeSelect && (
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="userType" className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select User Type</option>
                    {userTypes?.map((userTypeObject, index) => (
                      <option
                        key={userTypeObject.id || index}
                        value={userTypeObject.type || userTypeObject.name || ""}
                      >
                        {userTypeObject.type ||
                          userTypeObject.name ||
                          "Unknown Type"}
                      </option>
                    ))}
                  </select>
                </div>
              )
            )}

            <div className="col-span-6">
              <label htmlFor="idProof" className="block text-gray-700 text-sm font-bold mb-2">ID Proof (JPG, JPEG)</label>
              <input
                type="file"
                id="idProof"
                name="idProof"
                accept=".jpg,.jpeg"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formData.idProof && (
                <div className="mt-2 flex justify-between items-center">
                  <small className="text-gray-600">{formData.idProof.name}</small>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-xs"
                    onClick={handleRemoveFile}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="col-span-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : initialData ? "Update" : "Register"}
              </button>
            </div>

            {!initialData && presetUserType !== "teamMember" && (
              <div className="col-span-6 text-center mt-3">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login here!
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;




// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-toastify/dist/ReactToastify.css";
// // import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Register = ({
//     presetUserType = "",
//     hideUserTypeSelect = false,
//     // onSuccess = null,
//   }) => {

//     const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     contact: "",
//     email: "",
//     password: "",
//     userType: "",
//     idProof: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "idProof") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleRemoveFile = () => {
//     setFormData({ ...formData, idProof: null });
//     const fileInput = document.querySelector('input[name="idProof"]');
//     if (fileInput) fileInput.value = "";
//   };

//   const validateForm = () => {
//     const { firstName, lastName, contact, email, password, userType, idProof } = formData;

//     const nameRegex = /^[A-Za-z]+$/;
//     const contactRegex = /^[0-9]{10}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

//     if (!firstName || !nameRegex.test(firstName)) {
//       toast.error("Enter a valid first name (letters only)");
//       return false;
//     }
//     if (!lastName || !nameRegex.test(lastName)) {
//       toast.error("Enter a valid last name (letters only)");
//       return false;
//     }
//     if (!contact || !contactRegex.test(contact)) {
//       toast.error("Enter a valid 10-digit contact number");
//       return false;
//     }
//     if (!email || !emailRegex.test(email)) {
//       toast.error("Enter a valid email address");
//       return false;
//     }
//     if (!password || !passwordRegex.test(password)) {
//       toast.error("Password must be at least 8 characters, include a number and a special character");
//       return false;
//     }
//     if (!userType) {
//       toast.error("User type is required");
//       return false;
//     }
//     if (!idProof) {
//       toast.error("Please upload an ID proof");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     // Frontend-only success
//     toast.success("Registration successful 🎉");
//     console.log("Submitted data:", formData);
//     navigate("/login");
//   };

//   return (
//     <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
//       <div className="card p-4 shadow w-100" style={{ maxWidth: "500px" }}>
//         <h3 className="text-center mb-4">Register</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             className="form-control mb-3"
//             value={formData.firstName}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             className="form-control mb-3"
//             value={formData.lastName}
//             onChange={handleChange}
//           />

//           <input
//             type="tel"
//             name="contact"
//             placeholder="Contact Number"
//             className="form-control mb-3"
//             value={formData.contact}
//             onChange={handleChange}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="form-control mb-3"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="form-control mb-3"
//             value={formData.password}
//             onChange={handleChange}
//             autoComplete="new-password"
//           />

//            {/* User Type Field */}
//              {presetUserType === "teamMember" ? (
//                  <input type="text"
//                   name="userType"
//                   className="form-select mb-3"
//                   value="teamMember"
//                   disabled
//                   readOnly
//                   onChange={handleChange}
//                 />

//             ) : (
//               !hideUserTypeSelect && (
//                 <select
//                 name="userType"
//                 className="form-select mb-3"
//                 value={formData.userType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select User Type</option>
//                 <option value="team-member">Team Member</option>
//                 <option value="mentor">Mentor</option>
//                 <option value="admin">Admin</option>
//               </select>
//               )
//             )}

//           <input
//             type="file"
//             name="idProof"
//             className="form-control mb-2"
//             accept="image/*"
//             onChange={handleChange}
//           />

//           {formData.idProof && (
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <small>{formData.idProof.name}</small>
//               <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleRemoveFile}>
//                 Remove
//               </button>
//             </div>
//           )}

//           <button type="submit" className="btn btn-primary w-100">
//             Register
//           </button>

//           {/* Conditional Login Link */}
//              {presetUserType !== "teamMember" && (
//               <div className="text-center mt-3">
//                 Already have an account?{" "}
//                  <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
//                    Login here!
//                  </span>
//              </div>
//              )}
//         </form>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Register;
