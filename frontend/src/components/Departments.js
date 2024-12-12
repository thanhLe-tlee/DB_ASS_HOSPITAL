
import React from 'react';

function Departments() {
  return (
    <div className="departments-container">
      <h1>Departments</h1>
      <div className="actions">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="new-department-button fancy-button">
          <i className="fas fa-plus"></i> New Department
        </button>
      </div>
      <div className="department-table">
        <table className="fancy-table full-width-table no-wrap-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Dean</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="department-rows">
            {/* Department rows will be populated here */}
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

export default Departments;