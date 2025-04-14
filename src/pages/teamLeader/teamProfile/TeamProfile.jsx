// TeamProfile.jsx
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
} from "../../../redux/features/teamInfo/teamInfoSlice";
import "./TeamProfile.scss";

const TeamProfile = () => {
  const dispatch = useDispatch();
  const {
    branches,
    departments,
    mentors,
    members,
    mentor,
  } = useSelector((state) => state.teamInfo);

  const [formTeamName, setFormTeamName] = useState("");
  const [mentorId1, setMentorId1] = useState("");
  const [mentorId2, setMentorId2] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [competitionData, setCompetitionData] = useState({
    category: "",
    problemTitle: "",
    problemStatementNo: "",
    department: "",
    domainBucket: "",
  });

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchDepartments());
    dispatch(fetchRegisteredMentors());
  }, [dispatch]);

  useEffect(() => {
    if (mentorId1) dispatch(getMentor(mentorId1));
  }, [mentorId1, dispatch]);

  const handleTeamNameSave = () => {
    if (!formTeamName.trim()) return alert("Team name cannot be empty");
    dispatch(saveTeamName(formTeamName));
  };

  const handleMentorSave = () => {
    if (!mentorId1 || !mentorId2) return alert("Please select both mentors");
    if (mentorId1 === mentorId2) return alert("Mentors must be different");
    dispatch(saveTeamMentor({ id: mentorId1 }));
    dispatch(saveTeamMentor({ id: mentorId2 }));
  };

  const handleLeaderSearch = () => {
    if (!leaderEmail.trim()) return alert("Please enter leader email");
    dispatch(getMembersByTeamLeader(leaderEmail));
  };

  const handleCompetitionSave = () => {
    const { category, problemTitle, problemStatementNo, department, domainBucket } = competitionData;
    if (!category || !problemTitle || !problemStatementNo || !department || !domainBucket) {
      return alert("Please fill all competition fields");
    }
    dispatch(saveCompetitionDetails(competitionData));
  };

  const validateMember = (member) => {
    if (!member.gender || !member.department || !member.branch || !member.enrollmentNo || !member.studyYear) {
      return "All fields are required for each member.";
    }
    if (!/\d{12}/.test(member.enrollmentNo)) {
      return "Enrollment number must be 12 digits.";
    }
    return null;
  };

  const handleMemberUpdate = (index, field, value) => {
    const updatedMember = { ...members[index], [field]: value };
    const error = validateMember(updatedMember);
    if (error) return alert(error);
    dispatch(saveMemberData(updatedMember));
  };

  const hasAtLeastOneFemale = () => members.some((m) => m.gender?.toLowerCase() === "female");

  return (
    <div className="team-profile-container p-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 className="text-xl font-semibold mb-3 ml-75">Team Profile</h2>

      {/* Team Name Form */}
      <div className="form-section">
        <h4>Team Name</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Enter team name"
          value={formTeamName}
          onChange={(e) => setFormTeamName(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleTeamNameSave}>Save Team Name</button>
      </div>

      {/* Leader Name / Email Field */}
      <div className="form-section mt-4">
        <h4>Enter Team Leader Email to Fetch Members</h4>
        <input
          type="email"
          className="form-control"
          placeholder="Enter leader email"
          value={leaderEmail}
          onChange={(e) => setLeaderEmail(e.target.value)}
        />
        <button className="btn btn-secondary mt-2" onClick={handleLeaderSearch}>Fetch Members</button>
      </div>

      {/* Team Members */}
      <div className="form-section mt-4">
        <h4>Team Members</h4>
        {members.map((member, index) => (
          <div key={member._id || index} className="member-card p-3 border rounded mb-3 bg-light">
            <p><strong>{member.firstName} {member.lastName}</strong></p>
            <p>Email: <input type="text" className="form-control mb-2" value={member.email} disabled /></p>
            <p>Contact: <input type="text" className="form-control mb-2" value={member.contact} disabled /></p>
            <select className="form-control mb-2" value={member.gender || ""}
              onChange={(e) => handleMemberUpdate(index, "gender", e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Female">Other</option>
            </select>
            <select className="form-control mb-2" value={member.department || ""}
              onChange={(e) => handleMemberUpdate(index, "department", e.target.value)}>
              <option value="">Select Department</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>
            <select className="form-control mb-2" value={member.branch || ""}
              onChange={(e) => handleMemberUpdate(index, "branch", e.target.value)}>
              <option value="">Select Branch</option>
              {branches.map((branch, idx) => (
                <option key={idx} value={branch}>{branch}</option>
              ))}
            </select>
            <select className="form-control mb-2" value={member.studyYear || ""}
              onChange={(e) => handleMemberUpdate(index, "studyYear", e.target.value)}>
              <option value="">Select Current Study Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            <input type="text" className="form-control mb-2" placeholder="Enrollment No"
              value={member.enrollmentNo || ""}
              onChange={(e) => handleMemberUpdate(index, "enrollmentNo", e.target.value)}
            />
          </div>
        ))}
        {!hasAtLeastOneFemale() && (
          <p className="text-danger">At least one female member is required.</p>
        )}
      </div>

      {/* Mentor Details */}
      <div className="form-section mt-4">
        <h4>Mentors</h4>
        <select className="form-control mb-2" value={mentorId1} onChange={(e) => setMentorId1(e.target.value)}>
          <option value="">Select Mentor 1</option>
          {mentors.map((m, idx) => (
            <option key={idx} value={m._id}>{m.firstName} {m.lastName}</option>
          ))}
        </select>
        {mentor?.firstName && (
            <div className="mentor-details bg-gray-100 p-3 border rounded mb-2">
              <p><strong>Name:</strong> {mentor.firstName} {mentor.lastName}</p>
              <p><strong>Department:</strong> {mentor.department}</p>
              <p><strong>Skills:</strong> {mentor.skills}</p>
            </div>
          )}
        <select className="form-control mb-2" value={mentorId2} onChange={(e) => setMentorId2(e.target.value)}>
          <option value="">Select Mentor 2</option>
          {mentors.map((m, idx) => (
            <option key={idx} value={m._id}>{m.firstName} {m.lastName}</option>
          ))}
        </select>
        {mentor?.firstName && (
            <div className="mentor-details bg-gray-100 p-3 border rounded mb-2">
              <p><strong>Name:</strong> {mentor.firstName} {mentor.lastName}</p>
              <p><strong>Department:</strong> {mentor.department}</p>
              <p><strong>Skills:</strong> {mentor.skills}</p>
            </div>
          )}
        <button className="btn btn-primary mt-2" onClick={handleMentorSave}>Save Mentors</button>
      </div>

      {/* Competition Details */}
      <div className="form-section mt-4">
        <h4>Competition Details</h4>
        <select className="form-control mb-2" value={competitionData.category}
          onChange={(e) => setCompetitionData({ ...competitionData, category: e.target.value })}>
          <option value="">Select Category</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
        </select>
        <input type="text" className="form-control mb-2" placeholder="Problem Statement No"
          value={competitionData.problemStatementNo}
          onChange={(e) => setCompetitionData({ ...competitionData, problemStatementNo: e.target.value })} />
        <input type="text" className="form-control mb-2" placeholder="Problem Title"
          value={competitionData.problemTitle}
          onChange={(e) => setCompetitionData({ ...competitionData, problemTitle: e.target.value })} />
        <input type="text" className="form-control mb-2" placeholder="Problem Department"
          value={competitionData.department}
          onChange={(e) => setCompetitionData({ ...competitionData, department: e.target.value })} />
        <input type="text" className="form-control mb-2" placeholder="Domain Bucket"
          value={competitionData.domainBucket}
          onChange={(e) => setCompetitionData({ ...competitionData, domainBucket: e.target.value })} />
        <button className="btn btn-primary mt-2" onClick={handleCompetitionSave}>Save Competition</button>
      </div>
    </div>
  );
};

export default TeamProfile;
