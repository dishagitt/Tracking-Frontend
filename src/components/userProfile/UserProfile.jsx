import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const mockUserType = 'volunteer'; // or 'mentor'

  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    idProof: null,
    idProofPreview: null,
  });

  const [extraForm, setExtraForm] = useState({
    designation: '',
    expertise: '',
    entityType: '',
    entityName: '',
    skill: '',
    roleType: '',
    instituteName: '',
    passingYear: '',
    currentStatus: '',
  });

  useEffect(() => {
    setUserForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      contact: '9876543210',
      idProof: null,
      idProofPreview: null,
    });

    setExtraForm({
      designation: 'Professor',
      expertise: 'AI/ML',
      entityType: 'Institute',
      entityName: 'ABC Institute',
      skill: 'Public Speaking',
      roleType: 'Alumni',
      instituteName: 'XYZ University',
      passingYear: '2021',
      currentStatus: 'Entrepreneur',
    });
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExtraChange = (e) => {
    const { name, value } = e.target;
    setExtraForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdProofChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserForm((prev) => ({
          ...prev,
          idProof: file,
          idProofPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeIdProof = () => {
    setUserForm((prev) => ({
      ...prev,
      idProof: null,
      idProofPreview: null,
    }));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => `${currentYear - i}`);

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    console.log('Saving Basic User Info:', userForm);
    // dispatch(updateUserProfile(userForm));
  };

  const handleExtraFormSubmit = (e) => {
    e.preventDefault();
    console.log('Saving Extra User Info:', extraForm);
    // dispatch(updateExtraUserData(extraForm));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Basic Info */}
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
        <form onSubmit={handleUserFormSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userForm.firstName}
              onChange={handleUserChange}
              placeholder="Enter your first name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userForm.lastName}
              onChange={handleUserChange}
              placeholder="Enter your last name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userForm.email}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={userForm.contact}
              onChange={handleUserChange}
              placeholder="Enter 10-digit number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ID Proof (JPG/JPEG)</label>
            <input type="file" accept="image/jpeg,image/jpg" onChange={handleIdProofChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            {userForm.idProof && (
              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm text-gray-600">{userForm.idProof.name}</span>
                <button
                  type="button"
                  onClick={removeIdProof}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  Remove
                </button>
              </div>
            )}
            {userForm.idProofPreview && (
              <img
                src={userForm.idProofPreview}
                alt="ID Preview"
                className="mt-3 h-32 rounded shadow border"
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Basic Info
            </button>
          </div>
        </form>
      </div>

      {/* Extra Info */}
      {(mockUserType === 'mentor' || mockUserType === 'volunteer') && (
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Additional Details ({mockUserType})</h2>
          <form onSubmit={handleExtraFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockUserType === 'mentor' && (
                <>
                  <div className="mb-4">
                    <label htmlFor="designation" className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={extraForm.designation}
                      onChange={handleExtraChange}
                      placeholder="Enter your designation"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="expertise" className="block text-gray-700 text-sm font-bold mb-2">Expertise</label>
                    <input
                      type="text"
                      id="expertise"
                      name="expertise"
                      value={extraForm.expertise}
                      onChange={handleExtraChange}
                      placeholder="Enter your area of expertise"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="entityType" className="block text-gray-700 text-sm font-bold mb-2">Affiliation Type</label>
                    <select
                      id="entityType"
                      name="entityType"
                      value={extraForm.entityType}
                      onChange={handleExtraChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select Type</option>
                      <option value="Industry">Industry</option>
                      <option value="Organization">Organization</option>
                      <option value="Institute">Institute</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="entityName" className="block text-gray-700 text-sm font-bold mb-2">Affiliation Name</label>
                    <input
                      type="text"
                      id="entityName"
                      name="entityName"
                      value={extraForm.entityName}
                      onChange={handleExtraChange}
                      placeholder="Enter affiliation name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </>
              )}

              {mockUserType === 'volunteer' && (
                <>
                  <div className="mb-4">
                    <label htmlFor="skill" className="block text-gray-700 text-sm font-bold mb-2">Skill</label>
                    <input
                      type="text"
                      id="skill"
                      name="skill"
                      value={extraForm.skill}
                      onChange={handleExtraChange}
                      placeholder="Enter your skill"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role Type</label>
                    <div className="mt-2 flex gap-4">
                      <div className="flex items-center">
                        <input
                          id="alumni"
                          name="roleType"
                          type="radio"
                          value="Alumni"
                          checked={extraForm.roleType === 'Alumni'}
                          onChange={handleExtraChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor="alumni" className="ml-2 text-gray-700 text-sm">
                          Alumni
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="other"
                          name="roleType"
                          type="radio"
                          value="Other"
                          checked={extraForm.roleType === 'Other'}
                          onChange={handleExtraChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor="other" className="ml-2 text-gray-700 text-sm">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="instituteName" className="block text-gray-700 text-sm font-bold mb-2">Institute Name</label>
                    <input
                      type="text"
                      id="instituteName"
                      name="instituteName"
                      value={extraForm.instituteName}
                      onChange={handleExtraChange}
                      placeholder="Enter institute name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="passingYear" className="block text-gray-700 text-sm font-bold mb-2">Passing Year</label>
                    <select
                      id="passingYear"
                      name="passingYear"
                      value={extraForm.passingYear}
                      onChange={handleExtraChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4 col-span-2">
                    <label htmlFor="currentStatus" className="block text-gray-700 text-sm font-bold mb-2">Current Status</label>
                    <input
                      type="text"
                      id="currentStatus"
                      name="currentStatus"
                      value={extraForm.currentStatus}
                      onChange={handleExtraChange}
                      placeholder="Enter your current status"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Additional Info
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;