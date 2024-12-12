
document.addEventListener('DOMContentLoaded', () => {
  displayPatients();
});

function displayPatients() {
  const patientRows = document.getElementById('patient-rows');
  // Fetch and display patient data here
  // Example data
  const patients = [
    { fullName: 'John Doe', code: 'P001', gender: 'Male', dischargeDate: '2023-10-01', doctor: 'Dr. Smith' },
    { fullName: 'Jane Smith', code: 'P002', gender: 'Female', dischargeDate: '2023-10-02', doctor: 'Dr. Johnson' },
    // Add more patient data as needed
  ];

  patients.forEach(patient => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${patient.fullName}</td>
      <td>${patient.code}</td>
      <td>${patient.gender}</td>
      <td>${patient.dischargeDate}</td>
      <td>${patient.doctor}</td>
      <td>
        <button class="edit-button" onclick="editPatient('${patient.code}')">Edit</button>
        <button class="delete-button" onclick="deletePatient('${patient.code}')">Delete</button>
      </td>
    `;
    patientRows.appendChild(row);
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

function editPatient(code) {
  // Implement edit functionality
  alert(`Edit patient with code: ${code}`);
}

function deletePatient(code) {
  // Implement delete functionality
  alert(`Delete patient with code: ${code}`);
}