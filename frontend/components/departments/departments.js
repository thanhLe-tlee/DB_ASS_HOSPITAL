async function fetchDepartmentTableData() {
  try {
      const response = await fetch('http://localhost:100/getdepartment-rows', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const data = await response.json();
      console.log("DEBUG", data);
      populateTable1(data);
  } catch (error) {
      console.error('Error fetching doctor table data:', error);
  }
};

function populateTable1(data) {
  const tableBody = document.getElementById('department-rows');
  //tableBody.innerHTML = ''; // Clear existing content

  data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.dept_code}</td>
          <td>${item.title}</td>
          <td>${item.dean_code}</td>
    `;
      tableBody.appendChild(row);
  });
};
// Call the functions to fetch and populate data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  //fetchCustomerData();
  fetchDepartmentTableData();
  //fetchTable2Data();
  //fetchTable4Data();
  //fetchCustomerList();
});
