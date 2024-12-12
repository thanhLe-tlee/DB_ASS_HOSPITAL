document.addEventListener('DOMContentLoaded', () => {
  displayTreatments();
});

function displayTreatments() {
  const treatmentRows = document.getElementById('treatment-rows');
  // Fetch and display treatment data here
  // Example data
  const treatments = [
    { name: 'Chemotherapy', code: 'T001', type: 'Cancer', doctor: 'Dr. Smith', date: '2023-10-01' },
    { name: 'Physical Therapy', code: 'T002', type: 'Rehabilitation', doctor: 'Dr. Johnson', date: '2023-10-02' },
    // Add more treatment data as needed
  ];

  treatments.forEach(treatment => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${treatment.name}</td>
      <td>${treatment.code}</td>
      <td>${treatment.type}</td>
      <td>${treatment.doctor}</td>
      <td>${treatment.date}</td>
      <td>
        <button class="edit-button" onclick="editTreatment('${treatment.code}')">Edit</button>
        <button class="delete-button" onclick="deleteTreatment('${treatment.code}')">Delete</button>
      </td>
    `;
    treatmentRows.appendChild(row);
  });

  // Add styles for buttons
  const style = document.createElement('style');
  style.innerHTML = `
    .edit-button {
      background-color: #e0f7fa;
      color: #007bff;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
    }
    .edit-button:hover {
      background-color: #b2ebf2;
    }
    .delete-button {
      background-color: #ffebee;
      color: #ff4d4d;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
    }
    .delete-button:hover {
      background-color: #ffcdd2;
    }
  `;
  document.head.appendChild(style);
}

function editTreatment(code) {
  // Implement edit functionality
  alert(`Edit treatment with code: ${code}`);
}

function deleteTreatment(code) {
  // Implement delete functionality
  alert(`Delete treatment with code: ${code}`);
}