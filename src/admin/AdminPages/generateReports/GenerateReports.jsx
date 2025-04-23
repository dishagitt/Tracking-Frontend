import React, { useState, useEffect } from 'react';
import './GenerateReports.scss';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { jsPDF } from "jspdf";
import "jspdf-autotable"; 

const GenerateReports = () => {
  const [hackathonFilter, setHackathonFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [yearRange, setYearRange] = useState('');
  const [problemSearch, setProblemSearch] = useState('');
  const [problemSuggestions, setProblemSuggestions] = useState([]);

  // Sample data for reports
  const studentData = [
    { name: 'John Doe', dept: 'CSE', branch: 'AI', enroll: '123456789012', team: 'Alpha', hackathon: 'SSIP', year: '2023' },
    { name: 'Jane Smith', dept: 'IT', branch: 'DS', enroll: '123456789013', team: 'Beta', hackathon: 'SSIP', year: '2024' },
  ];

  const teamData = [
    {
      team: 'Alpha',
      ps: 'Smart India City',
      ppt: 'solution_alpha.pdf',
      status: 'Winner',
      members: [
        { name: 'John Doe', dept: 'CSE', branch: 'AI', enroll: '123456789012' },
        { name: 'Sam Ray', dept: 'CSE', branch: 'AI', enroll: '123456789014' },
      ],
      hackathon: 'SIH',
      year: '2023'
    },
  ];

  const problemData = [
    {
      team: 'Alpha',
      ps: 'Smart India City',
      ppt: 'solution_alpha.pdf',
      hackathon: 'SIH',
      year: '2023',
      status: 'Winner'
    },
  ];
  

  // Simulate suggestions from database
  useEffect(() => {
    if (problemSearch) {
      // Simulated search
      const suggestions = ['Smart India City', 'AI-based Traffic Control', 'Energy Optimization'].filter((ps) =>
        ps.toLowerCase().includes(problemSearch.toLowerCase())
      );
      setProblemSuggestions(suggestions);
    } else {
      setProblemSuggestions([]);
    }
  }, [problemSearch]);

  const downloadPDF = (tableId, fileName) => {
    const doc = new jsPDF();
    
    // Check if the table has rows before generating the PDF
    const table = document.getElementById(tableId);
    if (table && table.rows.length > 1) { // Ensure there is at least one data row (skip header row)
      doc.autoTable({ html: `#${tableId}` });
      doc.save(`${fileName}.pdf`);
    } else {
      alert("No data available to download");
    }
  };
  
  

  const downloadExcel = async (tableId, fileName) => {
    const table = document.getElementById(tableId);
    const rows = table?.querySelectorAll('tbody tr');
  
    if (!rows || rows.length === 0) {
      alert("No data available to export!");
      return;
    }
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');
  
    const allRows = Array.from(table.rows);
    allRows.forEach((row) => {
      const cells = Array.from(row.cells).map((cell) => cell.innerText);
      worksheet.addRow(cells);
    });
  
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${fileName}.xlsx`);
  };
  

  return (
    <div className="generate-reports">
      {/* Student Based Report */}
      <section className="report-section">
        <h3>Student Participation Report</h3>
        <div className="filters">
          <select value={hackathonFilter} onChange={(e) => setHackathonFilter(e.target.value)}>
            <option value="">Select Hackathon</option>
            <option value="SIH">SIH</option>
            <option value="SSIP">SSIP</option>
          </select>
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <select value={yearRange} onChange={(e) => setYearRange(e.target.value)}>
            <option value="">Select Year Range</option>
            <option value="last2">Last 2 Years</option>
            <option value="last5">Last 5 Years</option>
          </select>
          <button onClick={() => downloadPDF('studentTable', 'Student_Report')}>Download PDF</button>
          <button onClick={() => downloadExcel('studentTable', 'Student_Report')}>Download Excel</button>
        </div>
        <table id="studentTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Branch</th>
              <th>Enrollment No</th>
              <th>Team</th>
              <th>Hackathon</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((s, index) => (
              <tr key={index}>
                <td>{s.name}</td>
                <td>{s.dept}</td>
                <td>{s.branch}</td>
                <td>{s.enroll}</td>
                <td>{s.team}</td>
                <td>{s.hackathon}</td>
                <td>{s.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Team Based Report */}
      <section className="report-section">
        <h3>Team Based Report</h3>
        <div className="filters">
          <select value={hackathonFilter} onChange={(e) => setHackathonFilter(e.target.value)}>
            <option value="">Select Hackathon</option>
            <option value="SIH">SIH</option>
            <option value="SSIP">SSIP</option>
          </select>
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <button onClick={() => downloadPDF('teamTable', 'Team_Report')}>Download PDF</button>
          <button onClick={() => downloadExcel('teamTable', 'Team_Report')}>Download Excel</button>
        </div>
        <table id="teamTable">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Problem Statement</th>
              <th>Solution PPT</th>
              <th>Status</th>
              <th>Members</th>
              <th>Hackathon</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {teamData.map((t, i) => (
              <tr key={i}>
                <td>{t.team}</td>
                <td>{t.ps}</td>
                <td><a href={t.ppt} target="_blank">View</a></td>
                <td>{t.status}</td>
                <td>{t.members.map((m) => `${m.name} (${m.dept}/${m.branch})`).join(', ')}</td>
                <td>{t.hackathon}</td>
                <td>{t.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Problem Statement Based Report */}
      <section className="report-section">
        <h3>Problem Statement Based Report</h3>
        <div className="filters">
          <input
            type="text"
            placeholder="Search Problem Statement"
            value={problemSearch}
            onChange={(e) => setProblemSearch(e.target.value)}
          />
          {problemSuggestions.length > 0 && (
            <ul className="suggestions">
              {problemSuggestions.map((ps, i) => (
                <li key={i} onClick={() => setProblemSearch(ps)}>{ps}</li>
              ))}
            </ul>
          )}
          <button onClick={() => downloadPDF('problemTable', 'Problem_Statement_Report')}>Download PDF</button>
          <button onClick={() => downloadExcel('problemTable', 'Problem_Statement_Report')}>Download Excel</button>
        </div>
        <table id="problemTable">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Solution PPT</th>
              <th>Hackathon</th>
              <th>Year</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {problemData.map((p, idx) => (
              <tr key={idx}>
                <td>{p.team}</td>
                <td><a href={p.ppt} target="_blank">View</a></td>
                <td>{p.hackathon}</td>
                <td>{p.year}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GenerateReports;