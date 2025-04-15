// import { toast } from "react-toastify";
// import React, { useEffect, useState } from "react"; // Import useState
// import { useDispatch, useSelector } from "react-redux";
// import {
//     fetchBranches,
//     fetchDepartments,
//     fetchRegisteredMentors,
//     getMembersByTeamLeader, // We'll repurpose this slightly
//     getMentor,
//     saveTeamMentor,
//     saveMemberData,
//     saveTeamName,
//     saveCompetitionDetails,
// } from "../../../redux/features/teamInfo/teamInfoSlice";
// // import { getLoggedInUser } from "../../../redux/features/auth/authSlice"; // Import the thunk - COMMENTED OUT
// import "./TeamProfile.scss";

// const TeamProfile = () => {
//     const dispatch = useDispatch();
//     const { departments, branches, mentors, members } = useSelector(
//         (state) => state.teamInfo
//     );
//     // const { user: loggedInUser, fetchingLoggedInUser, loggedInUserError } = useSelector( // COMMENTED OUT
//     //     (state) => state.auth
//     // );

//     const [formTeamName, setFormTeamName] = useState("");
//     const [mentorId1, setMentorId1] = useState("");
//     const [mentorId2, setMentorId2] = useState("");
//     const [mentorDetails1, setMentorDetails1] = useState(null);
//     const [mentorDetails2, setMentorDetails2] = useState(null);
//     const [competitionData, setCompetitionData] = useState({
//         category: "",
//         problemTitle: "",
//         problemStatementNo: "",
//         department: "",
//         domainBucket: "",
//     });
//     const [teamMemberData, setTeamMemberData] = useState(Array(6).fill(null).map(() => ({
//         gender: "", department: "", branch: "", currentStudyYear: "", enrollmentNo: ""
//     })));

//     // MOCK LOGGED-IN USER FOR FRONTEND TESTING WITHOUT BACKEND

//     const mockLoggedInUser = {
//         _id: "mock-leader-id-123",
//         userType: "team_leader",
//     };

//     useEffect(() => {
//         dispatch(fetchBranches());
//         dispatch(fetchDepartments());
//         dispatch(fetchRegisteredMentors());

//         // Simulate fetching team members based on the mock logged-in user
//         if (mockLoggedInUser.userType === "team_leader" && mockLoggedInUser._id) {
//             dispatch(getMembersByTeamLeader(mockLoggedInUser._id));
//         } else {
//             // Optionally handle cases where the mock user isn't a team leader
//             console.log("Mock user is not a team leader.");
//         }

//         // dispatch(getLoggedInUser()); // COMMENTED OUT: Real thunk call
//     }, [dispatch, mockLoggedInUser._id, mockLoggedInUser.userType]); // Added mockLoggedInUser as a dependency

//     useEffect(() => {
//         const fetchMentor = async () => {
//             if (mentorId1) {
//                 const res = await dispatch(getMentor(mentorId1));
//                 if (res.payload) setMentorDetails1(res.payload);
//             } else {
//                 setMentorDetails1(null);
//             }
//         };
//         fetchMentor();
//     }, [mentorId1, dispatch]);

//     useEffect(() => {
//         const fetchMentor = async () => {
//             if (mentorId2) {
//                 const res = await dispatch(getMentor(mentorId2));
//                 if (res.payload) setMentorDetails2(res.payload);
//             } else {
//                 setMentorDetails2(null);
//             }
//         };
//         fetchMentor();
//     }, [mentorId2, dispatch]);

//     const handleTeamNameSave = () => {
//         if (!formTeamName.trim()) return toast.error("Team name cannot be empty");
//         dispatch(saveTeamName(formTeamName));
//     };

//     const handleMentorSave = () => {
//         if (!mentorId1 || !mentorId2) return toast.error("Please select both mentors");
//         if (mentorId1 === mentorId2) return toast.error("Mentors must be different");
//         dispatch(saveTeamMentor({ id: mentorId1 }));
//         dispatch(saveTeamMentor({ id: mentorId2 }));
//     };

//     const handleCompetitionSave = () => {
//         const {
//             category,
//             problemTitle,
//             problemStatementNo,
//             department,
//             domainBucket,
//         } = competitionData;
//         if (
//             !category ||
//             !problemTitle ||
//             !problemStatementNo ||
//             !department ||
//             !domainBucket
//         ) {
//             return toast.error("Please fill all competition fields");
//         }
//         dispatch(saveCompetitionDetails(competitionData));
//     };

//     const validateMember = (member) => {
//         if (
//             !member.gender ||
//             !member.department ||
//             !member.branch ||
//             !member.enrollmentNo ||
//             !member.currentStudyYear
//         ) {
//             toast.error("All fields are required for each member.");
//             return "All fields are required for each member.";
//         }
//         if (!/\d{12}/.test(member.enrollmentNo)) {
//             toast.error("Enrollment number must be 12 digits.");
//             return "Enrollment number must be 12 digits.";
//         }
//         return null;
//     };

//     const handleMemberUpdate = (index, field, value) => {
//         const updatedMember = { ...teamMemberData[index], [field]: value };
//         const error = validateMember(updatedMember);
//         if (error) return toast.error(error);
//         const updatedTeamMemberData = [...teamMemberData];
//         updatedTeamMemberData[index] = updatedMember;
//         setTeamMemberData(updatedTeamMemberData);
//         dispatch(saveMemberData(updatedMember)); // Consider dispatching all at once later
//     };

//     const hasAtLeastOneFemale = () =>
//         teamMemberData.some((m) => m.gender?.toLowerCase() === "female");

//     // Rendering logic based on the mock logged-in user
//     if (mockLoggedInUser && mockLoggedInUser.userType === "team_leader") {
//         return (
//             <div className="team-profile-container">
//                 <h2 className="form-title">Team Profile</h2>

//                 <div className="form-section">
//                     <h3>Team Name</h3>
//                     <div className="form-group">
//                         <label htmlFor="teamName">Team Name:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="teamName"
//                             placeholder="Enter team name"
//                             value={formTeamName}
//                             onChange={(e) => setFormTeamName(e.target.value)}
//                         />
//                     </div>
//                     <button className="btn btn-primary" onClick={handleTeamNameSave}>
//                         Save Team Name
//                     </button>
//                 </div>

//                 {/* Team Members */}
//                 <div className="form-section">
//                     <h3>Team Members</h3>
//                     {members.map((member, index) => (
//                         <div key={member._id || index} className="member-card">
//                             <h4>Member {index + 1}</h4>
//                             <div className="form-group">
//                                 <label>Name:</label>
//                                 <input type="text" className="form-control-static" value={`${member.firstName} ${member.lastName}`} readOnly />
//                             </div>
//                             <div className="form-group">
//                                 <label>Email:</label>
//                                 <input type="text" className="form-control-static" value={member.email} readOnly />
//                             </div>
//                             <div className="form-group">
//                                 <label>Contact:</label>
//                                 <input type="text" className="form-control-static" value={member.contact} readOnly />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`gender-${index}`}>Gender:</label>
//                                 <select
//                                     className="form-control"
//                                     id={`gender-${index}`}
//                                     value={teamMemberData[index]?.gender || ""}
//                                     onChange={(e) => handleMemberUpdate(index, "gender", e.target.value)}
//                                 >
//                                     <option value="">Select Gender</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`department-${index}`}>Department:</label>
//                                 <select
//                                     className="form-control"
//                                     id={`department-${index}`}
//                                     value={teamMemberData[index]?.department || ""}
//                                     onChange={(e) => handleMemberUpdate(index, "department", e.target.value)}
//                                 >
//                                     <option value="">Select Department</option>
//                                     {departments.map((dept, idx) => (
//                                         <option key={idx} value={dept}>{dept}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`branch-${index}`}>Branch:</label>
//                                 <select
//                                     className="form-control"
//                                     id={`branch-${index}`}
//                                     value={teamMemberData[index]?.branch || ""}
//                                     onChange={(e) => handleMemberUpdate(index, "branch", e.target.value)}
//                                 >
//                                     <option value="">Select Branch</option>
//                                     {branches.map((branch, idx) => (
//                                         <option key={idx} value={branch}>{branch}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`studyYear-${index}`}>Current Study Year:</label>
//                                 <select
//                                     className="form-control"
//                                     id={`studyYear-${index}`}
//                                     value={teamMemberData[index]?.currentStudyYear || ""}
//                                     onChange={(e) => handleMemberUpdate(index, "currentStudyYear", e.target.value)}
//                                 >
//                                     <option value="">Select Year</option>
//                                     <option value="1st Year">1st Year</option>
//                                     <option value="2nd Year">2nd Year</option>
//                                     <option value="3rd Year">3rd Year</option>
//                                     <option value="4th Year">4th Year</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`enrollmentNo-${index}`}>Enrollment No:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id={`enrollmentNo-${index}`}
//                                     placeholder="Enrollment No"
//                                     value={teamMemberData[index]?.enrollmentNo || ""}
//                                     onChange={(e) => handleMemberUpdate(index, "enrollmentNo", e.target.value)}
//                                 />
//                             </div>
//                             {/* <button className="btn btn-primary mt-2" onClick={() => handleMemberUpdate(index)}>
//                                 Save Member
//                             </button> */}
//                         </div>
//                     ))}
//                     {!hasAtLeastOneFemale() && (
//                         <p className="text-danger">At least one female member is required.</p>
//                     )}
//                     <button className="btn btn-primary mt-3">Save All Member Details</button> {/* Consider this button */}
//                 </div>

//                 {/* Mentor Details */}
//                 <div className="form-section">
//                     <h3>Mentors</h3>
//                     <div className="form-group">
//                         <label htmlFor="mentor1">Mentor 1:</label>
//                         <select
//                             className="form-control"
//                             id="mentor1"
//                             value={mentorId1}
//                             onChange={(e) => setMentorId1(e.target.value)}
//                         >
//                             <option value="">Select Mentor 1</option>
//                             {mentors.map((m, idx) => (
//                                 <option key={idx} value={m._id}>{m.firstName} {m.lastName}</option>
//                             ))}
//                         </select>
//                         {mentorDetails1 && (
//                             <div className="mentor-details">
//                                 <p><strong>Name:</strong> {mentorDetails1.firstName} {mentorDetails1.lastName}</p>
//                                 <p><strong>Department:</strong> {mentorDetails1.department}</p>
//                                 <p><strong>Skills:</strong> {mentorDetails1.skills}</p>
//                             </div>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="mentor2">Mentor 2:</label>
//                         <select
//                             className="form-control"
//                             id="mentor2"
//                             value={mentorId2}
//                             onChange={(e) => setMentorId2(e.target.value)}
//                         >
//                             <option value="">Select Mentor 2</option>
//                             {mentors.map((m, idx) => (
//                                 <option key={idx} value={m._id}>{m.firstName} {m.lastName}</option>
//                             ))}
//                         </select>
//                         {mentorDetails2 && (
//                             <div className="mentor-details">
//                                 <p><strong>Name:</strong> {mentorDetails2.firstName} {mentorDetails2.lastName}</p>
//                                 <p><strong>Department:</strong> {mentorDetails2.department}</p>
//                                 <p><strong>Skills:</strong> {mentorDetails2.skills}</p>
//                             </div>
//                         )}
//                     </div>

//                     <button className="btn btn-primary" onClick={handleMentorSave}>
//                         Save Mentors
//                     </button>
//                 </div>

//                 {/* Competition Details */}
//                 <div className="form-section">
//                     <h3>Competition Details</h3>
//                     <div className="form-group">
//                         <label htmlFor="category">Category:</label>
//                         <select
//                             className="form-control"
//                             id="category"
//                             value={competitionData.category}
//                             onChange={(e) => setCompetitionData({ ...competitionData, category: e.target.value })}
//                         >
//                             <option value="">Select Category</option>
//                             <option value="Hardware">Hardware</option>
//                             <option value="Software">Software</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="problemStatementNo">Problem Statement No:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="problemStatementNo"
//                             placeholder="Problem Statement No"
//                             value={competitionData.problemStatementNo}
//                             onChange={(e) => setCompetitionData({ ...competitionData, problemStatementNo: e.target.value })}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="problemTitle">Problem Title:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="problemTitle"
//                             placeholder="Problem Title"
//                             value={competitionData.problemTitle}
//                             onChange={(e) => setCompetitionData({ ...competitionData, problemTitle: e.target.value })}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="department">Problem Department:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="department"
//                             placeholder="Problem Department"
//                             value={competitionData.department}
//                             onChange={(e) => setCompetitionData({ ...competitionData, department: e.target.value })}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="domainBucket">Domain Bucket:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="domainBucket"
//                             placeholder="Domain Bucket"
//                             value={competitionData.domainBucket}
//                             onChange={(e) => setCompetitionData({ ...competitionData, domainBucket: e.target.value })}
//                         />
//                     </div>
//                     <button className="btn btn-primary" onClick={handleCompetitionSave}>
//                         Save Competition
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Render a different UI if not a team leader (based on mock data)
//     return (
//         <div className="team-profile-container">
//             <p>This section is only for team leaders (currently using mock data).</p>
//         </div>
//     );
// };

// export default TeamProfile;




















// import { toast } from "react-toastify";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     fetchBranches,
//     fetchDepartments,
//     fetchRegisteredMentors,
//     getMembersByTeamLeader,
//     getMentor,
//     saveTeamMentor,
//     saveMemberData,
//     saveTeamName,
//     saveCompetitionDetails,
//     resetSaveTeamNameSuccess,
//     resetSaveTeamMentorSuccess,
//     resetSaveCompetitionDetailsSuccess,
//     resetSaveMemberDataSuccess,
//     getTeamName,
//     getTeamMentors,
//     getCompetitionDetails,
//     getTeamMemberData
// } from "../../../redux/features/teamInfo/teamInfoSlice";
// import "./TeamProfile.scss";

// const TeamProfile = () => {
//     const dispatch = useDispatch();
//     const {
//         departments,
//         branches,
//         mentors,
//         members,
//         saveTeamNameSuccess,
//         saveTeamMentorSuccess,
//         saveCompetitionDetailsSuccess,
//         saveMemberDataSuccess,
//         teamName: reduxTeamName,
//         teamMentors,
//         competitionDetails: reduxCompetitionDetails,
//         teamMemberData: reduxTeamMemberData
//     } = useSelector((state) => state.teamInfo);

//     const [formTeamName, setFormTeamName] = useState("");
//     const [mentorId1, setMentorId1] = useState("");
//     const [mentorId2, setMentorId2] = useState("");
//     const [mentorDetails1, setMentorDetails1] = useState(null);
//     const [mentorDetails2, setMentorDetails2] = useState(null);
//     const [competitionData, setCompetitionData] = useState({
//         category: "",
//         problemTitle: "",
//         problemStatementNo: "",
//         department: "",
//         domainBucket: "",
//     });
//     const [teamMemberData, setTeamMemberData] = useState([]);
//     const [memberErrors, setMemberErrors] = useState([]);

//     // Mock logged-in user for frontend testing
//     const mockLoggedInUser = {
//         _id: "mock-leader-id-123",
//         userType: "team_leader",
//     };

//     useEffect(() => {
//         dispatch(fetchBranches());
//         dispatch(fetchDepartments());
//         dispatch(fetchRegisteredMentors());

//         if (mockLoggedInUser.userType === "team_leader" && mockLoggedInUser._id) {
//             dispatch(getMembersByTeamLeader(mockLoggedInUser._id));
//         } else {
//             console.log("Mock user is not a team leader.");
//         }
//     }, [dispatch, mockLoggedInUser.userType, mockLoggedInUser._id]);

//     // Fetch existing data on component mount
//     useEffect(() => {
//         if (mockLoggedInUser.userType === "team_leader") {
//             dispatch(getTeamName());
//             dispatch(getTeamMentors());
//             dispatch(getCompetitionDetails());
//             dispatch(getTeamMemberData());
//         }
//     }, [dispatch, mockLoggedInUser.userType]);

//     // Initialize state from Redux after data is fetched
//     useEffect(() => {
//         setFormTeamName(reduxTeamName || "");
//         setMentorId1(teamMentors?.[0]?.id || "");
//         setMentorId2(teamMentors?.[1]?.id || "");
//         setCompetitionData(reduxCompetitionDetails || {
//             category: "",
//             problemTitle: "",
//             problemStatementNo: "",
//             department: "",
//             domainBucket: "",
//         });

//         const initialMemberData = Array.isArray(reduxTeamMemberData) && reduxTeamMemberData.length > 0
//             ? reduxTeamMemberData.map(member => ({
//                 gender: member.gender || "",
//                 department: member.department || "",
//                 branch: member.branch || "",
//                 currentStudyYear: member.currentStudyYear || "",
//                 enrollmentNo: member.enrollmentNo || "",
//                 memberId: member._id,
//             }))
//             : members.map(member => ({
//                 gender: member.gender || "",
//                 department: member.department || "",
//                 branch: member.branch || "",
//                 currentStudyYear: member.currentStudyYear || "",
//                 enrollmentNo: member.enrollmentNo || "",
//                 memberId: member._id,
//             }));

//         setTeamMemberData(initialMemberData);
//         setMemberErrors(Array(initialMemberData.length).fill(null));

//     }, [reduxTeamName, teamMentors, reduxCompetitionDetails, members, reduxTeamMemberData]);

//     useEffect(() => {
//         const fetchMentor = async () => {
//             if (mentorId1) {
//                 const res = await dispatch(getMentor(mentorId1));
//                 if (res.payload) setMentorDetails1(res.payload);
//             } else {
//                 setMentorDetails1(null);
//             }
//         };
//         fetchMentor();
//     }, [mentorId1, dispatch]);

//     useEffect(() => {
//         const fetchMentor = async () => {
//             if (mentorId2) {
//                 const res = await dispatch(getMentor(mentorId2));
//                 if (res.payload) setMentorDetails2(res.payload);
//             } else {
//                 setMentorDetails2(null);
//             }
//         };
//         fetchMentor();
//     }, [mentorId2, dispatch]);

//     const handleTeamNameSave = () => {
//         if (!formTeamName.trim()) return toast.error("Team name cannot be empty");
//         dispatch(saveTeamName(formTeamName));
//     };

//     useEffect(() => {
//         if (saveTeamNameSuccess) {
//             toast.success("Team name saved successfully!");
//             dispatch(resetSaveTeamNameSuccess());
//         }
//     }, [saveTeamNameSuccess, dispatch]);

//     const handleMentorSave = () => {
//         if (!mentorId1 || !mentorId2) return toast.error("Please select both mentors");
//         if (mentorId1 === mentorId2) return toast.error("Mentors must be different");
//         dispatch(saveTeamMentor({ id: mentorId1 }));
//         dispatch(saveTeamMentor({ id: mentorId2 }));
//     };

//     useEffect(() => {
//         if (saveTeamMentorSuccess) {
//             toast.success("Mentors saved successfully!");
//             dispatch(resetSaveTeamMentorSuccess());
//         }
//     }, [saveTeamMentorSuccess, dispatch]);

//     const handleCompetitionSave = () => {
//         const {
//             category,
//             problemTitle,
//             problemStatementNo,
//             department,
//             domainBucket,
//         } = competitionData;
//         if (
//             !category ||
//             !problemTitle ||
//             !problemStatementNo ||
//             !department ||
//             !domainBucket
//         ) {
//             return toast.error("Please fill all competition fields");
//         }
//         dispatch(saveCompetitionDetails(competitionData));
//     };

//     useEffect(() => {
//         if (saveCompetitionDetailsSuccess) {
//             toast.success("Competition details saved successfully!");
//             dispatch(resetSaveCompetitionDetailsSuccess());
//         }
//     }, [saveCompetitionDetailsSuccess, dispatch]);

//     const validateMember = (member) => {
//         const errors = {};
//         if (!member.gender) errors.gender = "Gender is required";
//         if (!member.department) errors.department = "Department is required";
//         if (!member.branch) errors.branch = "Branch is required";
//         if (!member.enrollmentNo) errors.enrollmentNo = "Enrollment No is required";
//         if (!/^\d{12}$/.test(member.enrollmentNo)) errors.enrollmentNo = "Enrollment No must be 12 digits";
//         if (!member.currentStudyYear) errors.currentStudyYear = "Study Year is required";
//         return Object.keys(errors).length > 0 ? errors : null;
//     };

//     const handleMemberInputChange = (index, field, value) => {
//         const updatedTeamMemberData = [...teamMemberData];
//         updatedTeamMemberData[index] = { ...updatedTeamMemberData[index], [field]: value };
//         setTeamMemberData(updatedTeamMemberData);
//         const updatedErrors = [...memberErrors];
//         updatedErrors[index] = validateMember(updatedTeamMemberData[index]);
//         setMemberErrors(updatedErrors);
//     };

//     const handleSaveMember = (index) => {
//         const memberToSave = teamMemberData[index];
//         const validationErrors = validateMember(memberToSave);
//         if (validationErrors) {
//             setMemberErrors(prevErrors => {
//                 const newErrors = [...prevErrors];
//                 newErrors[index] = validationErrors;
//                 return newErrors;
//             });
//             toast.error("Please correct the member details.");
//             return;
//         }
//         dispatch(saveMemberData(memberToSave));
//     };

//     useEffect(() => {
//         if (saveMemberDataSuccess) {
//             toast.success("Member details saved successfully!");
//             dispatch(resetSaveMemberDataSuccess());
//         }
//     }, [saveMemberDataSuccess, dispatch]);

//     const handleSaveAllMembers = () => {
//         let hasErrors = false;
//         const updatedErrors = [...memberErrors];
//         teamMemberData.forEach((member, index) => {
//             const errors = validateMember(member);
//             if (errors) {
//                 updatedErrors[index] = errors;
//                 hasErrors = true;
//             }
//         });
//         setMemberErrors(updatedErrors);

//         if (hasErrors) {
//             toast.error("Please correct all member details before saving all.");
//             return;
//         }

//         teamMemberData.forEach(member => {
//             dispatch(saveMemberData(member));
//         });
//         toast.success("All member details saved successfully!");
//     };

//     const hasAtLeastOneFemale = () =>
//         teamMemberData.some((m) => m.gender?.toLowerCase() === "female");


//     if (mockLoggedInUser && mockLoggedInUser.userType === "team_leader") {
//         return (
//             <div className="team-profile-container">
//                 <h2 className="form-title">Team Profile</h2>

//                 <div className="form-section">
//                     <h3>Team Name</h3>
//                     <div className="form-group">
//                         <label htmlFor="teamName">Team Name:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="teamName"
//                             placeholder="Enter team name"
//                             value={formTeamName}
//                             onChange={(e) => setFormTeamName(e.target.value)}
//                         />
//                     </div>
//                     <button className="btn btn-primary" onClick={handleTeamNameSave}>
//                         Save Team Name
//                     </button>
//                 </div>

//                 {/* Team Members */}
//                 <div className="form-section">
//                     <h3>Team Members</h3>
//                     {teamMemberData.map((member, index) => (
//                         <div key={member.memberId || index} className="member-card">
//                             <h4>Member {index + 1}</h4>
//                             <div className="form-group">
//                                 <label>Name:</label>
//                                 <input type="text" className="form-control-static" value={`${members[index]?.firstName || ''} ${members[index]?.lastName || ''}`} readOnly />
//                             </div>
//                             <div className="form-group">
//                                 <label>Email:</label>
//                                 <input type="text" className="form-control-static" value={members[index]?.email || ''} readOnly />
//                             </div>
//                             <div className="form-group">
//                                 <label>Contact:</label>
//                                 <input type="text" className="form-control-static" value={members[index]?.contact || ''} readOnly />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`gender-${index}`}>Gender:</label>
//                                 <select
//                                     className="form-control"
//                                     id={`gender-${index}`}
//                                     value={member.gender || ""}
//                                     onChange={(e) => handleMemberInputChange(index, "gender", e.target.value)}
//                                 >
//                                     <option value="">Select Gender</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                                 {memberErrors[index]?.gender && <div className="text-danger">{memberErrors[index].gender}</div>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`department-${index}`}>Department:</label>
//                                 <select
//                                     className="form-control"
//                                     id={`department-${index}`}
//                                     value={member.department || ""}
//                                     onChange={(e) => handleMemberInputChange(index, "department", e.target.value)}
//                                 >
//                                     <option value="">Select Department</option>
//                                     {departments.map((dept, idx) => (
//                                         <option key={idx} value={dept}>{dept}</option>
//                                     ))}
//                                 </select>
//                                 {memberErrors[index]?.department && <div className="text-danger">{memberErrors[index].department}</div>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`branch-${index}`}>Branch:</label>
//                                 <select
//                                     className="form-control"
//                                     id={`branch-${index}`}
//                                     value={member.branch || ""}
//                                     onChange={(e) => handleMemberInputChange(index, "branch", e.target.value)}
//                                 >
//                                     <option value="">Select Branch</option>
//                                     {branches.map((branch, idx) => (
//                                         <option key={idx} value={branch}>{branch}</option>
//                                     ))}
//                                 </select>
//                                 {memberErrors[index]?.branch && <div className="text-danger">{memberErrors[index].branch}</div>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`studyYear-${index}`}>Current Study Year:</label>
//                                 <select
//                                     className="form-control"
//                                     id={`studyYear-${index}`}
//                                     value={member.currentStudyYear || ""}
//                                     onChange={(e) => handleMemberInputChange(index, "currentStudyYear", e.target.value)}
//                                 >
//                                     <option value="">Select Year</option>
//                                     <option value="1st Year">1st Year</option>
//                                     <option value="2nd Year">2nd Year</option>
//                                     <option value="3rd Year">3rd Year</option>
//                                     <option value="4th Year">4th Year</option>
//                                 </select>
//                                 {memberErrors[index]?.currentStudyYear && <div className="text-danger">{memberErrors[index].currentStudyYear}</div>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor={`enrollmentNo-${index}`}>Enrollment No:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id={`enrollmentNo-${index}`}
//                                     placeholder="Enrollment No"
//                                     value={member.enrollmentNo || ""}
//                                     onChange={(e) => handleMemberInputChange(index, "enrollmentNo", e.target.value)}
//                                 />
//                                 {memberErrors[index]?.enrollmentNo && <div className="text-danger">{memberErrors[index].enrollmentNo}</div>}
//                             </div>
//                             <button className="btn btn-primary mt-2" onClick={() => handleSaveMember(index)}>
//                                 Save Member
//                             </button>
//                         </div>
//                     ))}
//                     {!hasAtLeastOneFemale() && (
//                         <p className="text-danger">At least one female member is required.</p>
//                     )}
//                     <button className="btn btn-primary mt-3" onClick={handleSaveAllMembers}>Save All Member Details</button>
//                 </div>

//                 {/* Mentor Details */}
//                 <div className="form-section">
//                     <h3>Mentors</h3>
//                     <div className="form-group">
//                         <label htmlFor="mentor1">Mentor 1:</label>
//                         <select
//                             className="form-control"
//                             id="mentor1"
//                             value={mentorId1}
//                             onChange={(e) => setMentorId1(e.target.value)}
//                         >
//                             <option value="">Select Mentor 1</option>
//                             {mentors.map((m, idx) => (
//                                 <option key={idx} value={m._id}>{m.firstName} {m.lastName}</option>
//                             ))}
//                         </select>
//                         {mentorDetails1 && (
//                             <div className="mentor-details">
//                                 <p><strong>Name:</strong> {mentorDetails1.firstName} {mentorDetails1.lastName}</p>
//                                 <p><strong>Department:</strong> {mentorDetails1.department}</p>
//                                 <p><strong>Skills:</strong> {mentorDetails1.skills}</p>
//                             </div>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="mentor2">Mentor 2:</label>
//                         <select
//                             className="form-control"
//                             id="mentor2"
//                             value={mentorId2}
//                             onChange={(e) => setMentorId2(e.target.value)}
//                         >
//                             <option value="">Select Mentor 2</option>
//                             {mentors.map((m, idx) => (
//                                 <option key={idx} value={m._id}>{m.firstName} {m.lastName}</option>
//                             ))}
//                         </select>
//                         {mentorDetails2 && (
//                             <div className="mentor-details">
//                                 <p><strong>Name:</strong> {mentorDetails2.firstName} {mentorDetails2.lastName}</p>
//                                 <p><strong>Department:</strong> {mentorDetails2.department}</p>
//                                 <p><strong>Skills:</strong> {mentorDetails2.skills}</p>
//                             </div>
//                         )}
//                     </div>

//                     <button className="btn btn-primary" onClick={handleMentorSave}>
//                         Save Mentors
//                     </button>
//                 </div>

//                 {/* Competition Details */}
//                 <div className="form-section">
//                     <h3>Competition Details</h3>
//                     <div className="form-group">
//                         <label htmlFor="category">Category:</label>
//                         <select
//                             className="form-control"
//                             id="category"
//                             value={competitionData.category}
//                             onChange={(e) =>
//                                 setCompetitionData({ ...competitionData, category: e.target.value })
//                             }
//                         >
//                             <option value="">Select Category</option>
//                             <option value="Hardware">Hardware</option>
//                             <option value="Software">Software</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="problemStatementNo">Problem Statement No:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="problemStatementNo"
//                             placeholder="Problem Statement No"
//                             value={competitionData.problemStatementNo}
//                             onChange={(e) =>
//                                 setCompetitionData({ ...competitionData, problemStatementNo: e.target.value })
//                             }
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="problemTitle">Problem Title:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="problemTitle"
//                             placeholder="Problem Title"
//                             value={competitionData.problemTitle}
//                             onChange={(e) =>
//                                 setCompetitionData({ ...competitionData, problemTitle: e.target.value })
//                             }
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="department">Problem Department:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="department"
//                             placeholder="Problem Department"
//                             value={competitionData.department}
//                             onChange={(e) =>
//                                 setCompetitionData({ ...competitionData, department: e.target.value })
//                             }
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="domainBucket">Domain Bucket:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="domainBucket"
//                             placeholder="Domain Bucket"
//                             value={competitionData.domainBucket}
//                             onChange={(e) =>
//                                 setCompetitionData({ ...competitionData, domainBucket: e.target.value })
//                             }
//                         />
//                     </div>
//                     <button className="btn btn-primary" onClick={handleCompetitionSave}>
//                         Save Competition
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Render a different UI if not a team leader (based on mock data)
//     return (
//         <div className="team-profile-container">
//             <p>This section is only for team leaders (currently using mock data).</p>
//         </div>
//     );
// };

// export default TeamProfile;










import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBranches,
    fetchDepartments,
    fetchRegisteredMentors,
    getMembersByTeamLeader,
    getMentor,
    saveTeamMentor,
    saveMemberData,
    saveTeamName,
    saveCompetitionDetails,
    resetSaveTeamNameSuccess,
    resetSaveTeamMentorSuccess,
    resetSaveCompetitionDetailsSuccess,
    resetSaveMemberDataSuccess,
    getTeamName,
    getTeamMentors,
    getCompetitionDetails,
    getTeamMemberData
} from "../../../redux/features/teamInfo/teamInfoSlice";
import "./TeamProfile.scss";

const TeamProfile = () => {
    const dispatch = useDispatch();
    const {
        departments,
        branches,
        mentors,
        members,
        saveTeamNameSuccess,
        saveTeamMentorSuccess,
        saveCompetitionDetailsSuccess,
        saveMemberDataSuccess,
        teamName: reduxTeamName,
        teamMentors,
        competitionDetails: reduxCompetitionDetails,
        teamMemberData: reduxTeamMemberData
    } = useSelector((state) => state.teamInfo);

    const [formTeamName, setFormTeamName] = useState("");
    const [mentorId1, setMentorId1] = useState("");
    const [mentorId2, setMentorId2] = useState("");
    const [mentorDetails1, setMentorDetails1] = useState(null);
    const [mentorDetails2, setMentorDetails2] = useState(null);
    const [competitionData, setCompetitionData] = useState({
        hackathonType: "",
        hackathonYear: "",
        category: "",
        problemTitle: "",
        problemStatementNo: "",
        department: "",
        domainBucket: "",
        abstract: "",
        ppt: null,
    });
    const [teamMemberData, setTeamMemberData] = useState([]);
    const [memberErrors, setMemberErrors] = useState([]);

    // Mock logged-in user for frontend testing
    const mockLoggedInUser = {
        _id: "mock-leader-id-123",
        userType: "team_leader",
    };

    useEffect(() => {
        dispatch(fetchBranches());
        dispatch(fetchDepartments());
        dispatch(fetchRegisteredMentors());

        if (mockLoggedInUser.userType === "team_leader" && mockLoggedInUser._id) {
            dispatch(getMembersByTeamLeader(mockLoggedInUser._id));
        } else {
            console.log("Mock user is not a team leader.");
        }
    }, [dispatch, mockLoggedInUser.userType, mockLoggedInUser._id]);

    // Fetch existing data on component mount
    useEffect(() => {
        if (mockLoggedInUser.userType === "team_leader") {
            dispatch(getTeamName());
            dispatch(getTeamMentors());
            dispatch(getCompetitionDetails());
            dispatch(getTeamMemberData());
        }
    }, [dispatch, mockLoggedInUser.userType]);

    // Initialize state from Redux after data is fetched
    useEffect(() => {
        setFormTeamName(reduxTeamName || "");
        setMentorId1(teamMentors?.[0]?.id || "");
        setMentorId2(teamMentors?.[1]?.id || "");
        setCompetitionData(reduxCompetitionDetails || {
            hackathonType: "",
            hackathonYear: "",
            category: "",
            problemTitle: "",
            problemStatementNo: "",
            department: "",
            domainBucket: "",
            abstract: "",
            ppt: null,
        });

        const initialMemberData = Array.isArray(reduxTeamMemberData) && reduxTeamMemberData.length > 0
            ? reduxTeamMemberData.map(member => ({
                gender: member.gender || "",
                department: member.department || "",
                branch: member.branch || "",
                currentStudyYear: member.currentStudyYear || "",
                enrollmentNo: member.enrollmentNo || "",
                memberId: member._id,
            }))
            : members.map(member => ({
                gender: member.gender || "",
                department: member.department || "",
                branch: member.branch || "",
                currentStudyYear: member.currentStudyYear || "",
                enrollmentNo: member.enrollmentNo || "",
                memberId: member._id,
            }));

        setTeamMemberData(initialMemberData);
        setMemberErrors(Array(initialMemberData.length).fill(null));

    }, [reduxTeamName, teamMentors, reduxCompetitionDetails, members, reduxTeamMemberData]);

    useEffect(() => {
        const fetchMentor = async () => {
            if (mentorId1) {
                const res = await dispatch(getMentor(mentorId1));
                if (res.payload) setMentorDetails1(res.payload);
            } else {
                setMentorDetails1(null);
            }
        };
        fetchMentor();
    }, [mentorId1, dispatch]);

    useEffect(() => {
        const fetchMentor = async () => {
            if (mentorId2) {
                const res = await dispatch(getMentor(mentorId2));
                if (res.payload) setMentorDetails2(res.payload);
            } else {
                setMentorDetails2(null);
            }
        };
        fetchMentor();
    }, [mentorId2, dispatch]);

    const handleTeamNameSave = () => {
        if (!formTeamName.trim()) return toast.error("Team name cannot be empty");
        dispatch(saveTeamName(formTeamName));
    };

    useEffect(() => {
        if (saveTeamNameSuccess) {
            toast.success("Team name saved successfully!");
            dispatch(resetSaveTeamNameSuccess());
        }
    }, [saveTeamNameSuccess, dispatch]);

    const handleMentorSave = () => {
        if (!mentorId1 || !mentorId2) return toast.error("Please select both mentors");
        if (mentorId1 === mentorId2) return toast.error("Mentors must be different");
        dispatch(saveTeamMentor({ id: mentorId1 }));
        dispatch(saveTeamMentor({ id: mentorId2 }));
    };

    useEffect(() => {
        if (saveTeamMentorSuccess) {
            toast.success("Mentors saved successfully!");
            dispatch(resetSaveTeamMentorSuccess());
        }
    }, [saveTeamMentorSuccess, dispatch]);

    const handleCompetitionSave = () => {
        const {
            hackathonType,
            hackathonYear,
            category,
            problemTitle,
            problemStatementNo,
            department,
            domainBucket,
            abstract,
            ppt,
        } = competitionData;
        if (
            !hackathonType ||
            !hackathonYear ||
            !category ||
            !problemTitle ||
            !problemStatementNo ||
            !department ||
            !domainBucket ||
            !abstract ||
            !ppt
        ) {
            return toast.error("Please fill all competition fields");
        }
        dispatch(saveCompetitionDetails(competitionData));
    };

    useEffect(() => {
        if (saveCompetitionDetailsSuccess) {
            toast.success("Competition details saved successfully!");
            dispatch(resetSaveCompetitionDetailsSuccess());
        }
    }, [saveCompetitionDetailsSuccess, dispatch]);

    const validateMember = (member) => {
        const errors = {};
        if (!member.gender) errors.gender = "Gender is required";
        if (!member.department) errors.department = "Department is required";
        if (!member.branch) errors.branch = "Branch is required";
        if (!member.enrollmentNo) errors.enrollmentNo = "Enrollment No is required";
        if (!/^\d{12}$/.test(member.enrollmentNo)) errors.enrollmentNo = "Enrollment No must be 12 digits";
        if (!member.currentStudyYear) errors.currentStudyYear = "Study Year is required";
        return Object.keys(errors).length > 0 ? errors : null;
    };

    const handleMemberInputChange = (index, field, value) => {
        const updatedTeamMemberData = [...teamMemberData];
        updatedTeamMemberData[index] = { ...updatedTeamMemberData[index], [field]: value };
        setTeamMemberData(updatedTeamMemberData);
        const updatedErrors = [...memberErrors];
        updatedErrors[index] = validateMember(updatedTeamMemberData[index]);
        setMemberErrors(updatedErrors);
    };

    const handleSaveMember = (index) => {
        const memberToSave = teamMemberData[index];
        const validationErrors = validateMember(memberToSave);
        if (validationErrors) {
            setMemberErrors(prevErrors => {
                const newErrors = [...prevErrors];
                newErrors[index] = validationErrors;
                return newErrors;
            });
            toast.error("Please correct the member details.");
            return;
        }
        dispatch(saveMemberData(memberToSave));
    };

    useEffect(() => {
        if (saveMemberDataSuccess) {
            toast.success("Member details saved successfully!");
            dispatch(resetSaveMemberDataSuccess());
        }
    }, [saveMemberDataSuccess, dispatch]);

    const handleSaveAllMembers = () => {
        let hasErrors = false;
        const updatedErrors = [...memberErrors];
        teamMemberData.forEach((member, index) => {
            const errors = validateMember(member);
            if (errors) {
                updatedErrors[index] = errors;
                hasErrors = true;
            }
        });
        setMemberErrors(updatedErrors);

        if (hasErrors) {
            toast.error("Please correct all member details before saving all.");
            return;
        }

        teamMemberData.forEach(member => {
            dispatch(saveMemberData(member));
        });
        toast.success("All member details saved successfully!");
    };

    const hasAtLeastOneFemale = () =>
        teamMemberData.some((m) => m.gender?.toLowerCase() === "female");


    if (mockLoggedInUser && mockLoggedInUser.userType === "team_leader") {
        return (
            <div className="team-profile-container">
                <h2 className="form-title">Team Profile</h2>

                <div className="form-section">
                    <h3>Team Name</h3>
                    <div className="form-group">
                        <label htmlFor="teamName">Team Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="teamName"
                            placeholder="Enter team name"
                            value={formTeamName}
                            onChange={(e) => setFormTeamName(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleTeamNameSave}>
                        Save Team Name
                    </button>
                </div>

                {/* Team Members */}
                <div className="form-section">
                    <h3>Team Members</h3>
                    {teamMemberData.map((member, index) => (
                        <div key={member.memberId || index} className="member-card">
                            <h4>Member {index + 1}</h4>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control-static" value={`${members[index]?.firstName || ''} ${members[index]?.lastName || ''}`} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="text" className="form-control-static" value={members[index]?.email || ''} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Contact:</label>
                                <input type="text" className="form-control-static" value={members[index]?.contact || ''} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`gender-${index}`}>Gender:</label>
                                <select
                                    className="form-control"
                                    id={`gender-${index}`}
                                    value={member.gender || ""}
                                    onChange={(e) => handleMemberInputChange(index, "gender", e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {memberErrors[index]?.gender && <div className="text-danger">{memberErrors[index].gender}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`department-${index}`}>Department:</label>
                                <select
                                    className="form-control"
                                    id={`department-${index}`}
                                    value={member.department || ""}
                                    onChange={(e) => handleMemberInputChange(index, "department", e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dept, idx) => (
                                        <option key={idx} value={dept}>{dept}</option>
                                    ))}
                                </select>
                                {memberErrors[index]?.department && <div className="text-danger">{memberErrors[index].department}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`branch-${index}`}>Branch:</label>
                                <select
                                    className="form-control"
                                    id={`branch-${index}`}
                                    value={member.branch || ""}
                                    onChange={(e) => handleMemberInputChange(index, "branch", e.target.value)}
                                >
                                    <option value="">Select Branch</option>
                                    {branches.map((branch, idx) => (
                                        <option key={idx} value={branch}>{branch}</option>
                                    ))}
                                </select>
                                {memberErrors[index]?.branch && <div className="text-danger">{memberErrors[index].branch}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`studyYear-${index}`}>Current Study Year:</label>
                                <select
                                    className="form-control"
                                    id={`studyYear-${index}`}
                                    value={member.currentStudyYear || ""}
                                    onChange={(e) => handleMemberInputChange(index, "currentStudyYear", e.target.value)}
                                >
                                    <option value="">Select Year</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </select>
                                {memberErrors[index]?.currentStudyYear && <div className="text-danger">{memberErrors[index].currentStudyYear}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`enrollmentNo-${index}`}>Enrollment No:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`enrollmentNo-${index}`}
                                    placeholder="Enrollment No"
                                    value={member.enrollmentNo || ""}
                                    onChange={(e) => handleMemberInputChange(index, "enrollmentNo", e.target.value)}
                                />
                                {memberErrors[index]?.enrollmentNo && <div className="text-danger">{memberErrors[index].enrollmentNo}</div>}
                            </div>
                            <button className="btn btn-primary mt-2" onClick={() => handleSaveMember(index)}>
                                Save Member
                            </button>
                        </div>
                    ))}
                    {!hasAtLeastOneFemale() && (
                        <p className="text-danger">At least one female member is required.</p>
                    )}
                    <button className="btn btn-primary mt-3" onClick={handleSaveAllMembers}>Save All Member Details</button>
                </div>

                {/* Mentor Details */}
                <div className="form-section">
                    <h3>Mentors</h3>
                    <div className="form-group">
                        <label htmlFor="mentor1">Mentor 1:</label>
                        <select
                            className="form-control"
                            id="mentor1"
                            value={mentorId1}
                            onChange={(e) => setMentorId1(e.target.value)}
                        >
                            <option value="">Select Mentor 1</option>
                            {mentors.map((m, idx) => (
                                <option key={idx} value={m._id}>{m.firstName} {m.lastName}</option>
                            ))}
                        </select>
                        {mentorDetails1 && (
                            <div className="mentor-details">
                                <p><strong>Name:</strong> {mentorDetails1.firstName} {mentorDetails1.lastName}</p>
                                <p><strong>Department:</strong> {mentorDetails1.department}</p>
                                <p><strong>Skills:</strong> {mentorDetails1.skills}</p>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="mentor2">Mentor 2:</label>
                        <select
                            className="form-control"
                            id="mentor2"
                            value={mentorId2}
                            onChange={(e) => setMentorId2(e.target.value)}
                        >
                            <option value="">Select Mentor 2</option>
                            {mentors.map((m, idx) => (
                                <option key={idx} value={m._id}>{m.firstName} {m.lastName}</option>
                            ))}
                        </select>
                        {mentorDetails2 && (
                            <div className="mentor-details">
                                <p><strong>Name:</strong> {mentorDetails2.firstName} {mentorDetails2.lastName}</p>
                                <p><strong>Department:</strong> {mentorDetails2.department}</p>
                                <p><strong>Skills:</strong> {mentorDetails2.skills}</p>
                            </div>
                        )}
                    </div>

                    <button className="btn btn-primary" onClick={handleMentorSave}>
                        Save Mentors
                    </button>
                </div>

                {/* Competition Details */}
                <div className="form-section">
                    <h3>Competition Details</h3>
                    <div className="form-group">
                        <label htmlFor="hackathonType">Hackathon Type:</label>
                        <select
                            className="form-control"
                            id="hackathonType"
                            value={competitionData.hackathonType}
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, hackathonType: e.target.value })
                            }
                        >
                            <option value="">Select Type</option>
                            <option value="SSIP">SSIP</option>
                            <option value="SIH">SIH</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="hackathonYear">Hackathon Year:</label>
                        <select
                            className="form-control"
                            id="hackathonYear"
                            value={competitionData.hackathonYear}
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, hackathonYear: e.target.value })
                            }
                        >
                            <option value="">Select Year</option>
                            {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select
                            className="form-control"
                            id="category"
                            value={competitionData.category}
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, category: e.target.value })
                            }
                        >
                            <option value="">Select Category</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Software">Software</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="problemStatementNo">Problem Statement No:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="problemStatementNo"
                            placeholder="Problem Statement No"
                            value={competitionData.problemStatementNo}
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, problemStatementNo: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="problemTitle">Problem Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="problemTitle"
                            placeholder="Problem Title"
                            value={competitionData.problemTitle}
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, problemTitle: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Problem Department:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="department"
                            placeholder="Problem Department"
                            value={competitionData.department}
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, department: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="domainBucket">Domain Bucket:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="domainBucket"
                            placeholder="Domain Bucket"
                            value={competitionData.domainBucket}
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, domainBucket: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="abstract">Abstract:</label>
                        <textarea
                            className="form-control"
                            id="abstract"
                            placeholder="Enter abstract"
                            value={competitionData.abstract}
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, abstract: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ppt">PPT (PPTX/DOC):</label>
                        <input
                            type="file"
                            className="form-control"
                            id="ppt"
                            accept=".pptx,.doc,.docx"
                            onChange={(e) =>
                                setCompetitionData({ ...competitionData, ppt: e.target.files[0] })
                            }
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleCompetitionSave}>
                        Save Competition
                    </button>
                </div>
            </div>
        );
    }

    // Render a different UI if not a team leader (based on mock data)
    return (
        <div className="team-profile-container">
            <p>This section is only for team leaders (currently using mock data).</p>
        </div>
    );
};

export default TeamProfile;
