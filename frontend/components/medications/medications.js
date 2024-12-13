async function fetchMedicationTableData() {
  try {
      const response = await fetch('http://localhost:100/getmedication-rows', {
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
  const tableBody = document.getElementById('medication-rows');
  //tableBody.innerHTML = ''; // Clear existing content

  data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.m_code}</td>
          <td>${item.m_name}</td>
          <td>${item.expiration_date}</td>
          <td>${item.price}</td>
          <td>${item.examination_id}</td>
      `;
      tableBody.appendChild(row);
  });
};
// Call the functions to fetch and populate data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  //fetchCustomerData();
  fetchMedicationTableData();
  //fetchTable2Data();
  //fetchTable4Data();
  //fetchCustomerList();
});
