
import React from 'react';

function Doctors() {
  return (
    <div className="doctors-container">
      <h1>Doctors</h1>
      <div className="actions">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="filter-button">
          <span>Filter by Specialty</span>
          <i className="fas fa-filter"></i>
        </button>
        <button className="new-doctor-button fancy-button">
          <i className="fas fa-plus"></i> New Doctor
        </button>
      </div>
      <div className="doctor-table">
        <table className="fancy-table full-width-table no-wrap-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Specialty</th>
              <th>Address</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="doctor-rows">
            {/* Doctor rows will be populated here */}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className="page-button">Previous</button>
        <span className="page-info">Page 1 of 10</span>
        <button className="page-button">Next</button>
      </div>
    </div>
  );
}

export default Doctors;