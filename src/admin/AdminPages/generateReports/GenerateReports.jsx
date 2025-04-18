import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import ExcelJS from 'exceljs'; // Import exceljs
import { saveAs } from 'file-saver';
import './GenerateReports.scss';  // Import the SCSS file directly

const GenerateReports = () => {
  const [data, setData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Generated Report", 20, 20);
    doc.autoTable({ html: "#reportTable" });
    doc.save("report.pdf");
  };

  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Add column headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'User Type', key: 'userType', width: 15 },
      { header: 'ID Proof', key: 'idProof', width: 20 },
    ];

    // Add data rows
    data.forEach((item) => {
      worksheet.addRow({
        name: item.name,
        email: item.email,
        userType: item.userType,
        idProof: item.idProof,
      });
    });

    // Generate the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const file = new Blob([buffer], { type: 'application/octet-stream' });
      saveAs(file, 'report.xlsx');
    });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    // Logic for deleting the request goes here (mock or real API)
    setShowDeletePopup(false);
    setData((prevData) => prevData.filter(item => item.id !== deleteId));
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="generateReportsContainer">
      <h3 className="generateReportsHeading">Generate Reports</h3>

      <div className="generateReportsActions">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={handleDownloadExcel}>Download Excel</button>
      </div>

      <table id="reportTable" className="generateReportsTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>ID Proof</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No Data</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.userType}</td>
                <td>
                  <a href={item.idProof} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td className="actionButtons">
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showDeletePopup && (
        <div className="generateReportsPopup">
          <div className="generateReportsPopupContent">
            <p>Are you sure you want to delete this request?</p>
            <div className="generateReportsPopupActions">
              <button onClick={handleConfirmDelete} className="btn btn-danger">
                Yes, Delete
              </button>
              <button onClick={handleCancelDelete} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateReports;
