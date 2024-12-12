document.addEventListener('DOMContentLoaded', () => {
  displayNurses();
});

function displayNurses() {
  const nurseRows = document.getElementById('nurse-rows');
  // Fetch and display nurse data here
  // Example data
  const nurses = [
    { code: 'N001', fullName: 'Nurse Alice', dob: '1985-03-12', gender: 'Female', phoneNumber: '123-456-7890', specialty: 'Pediatrics', address: '789 Pine St', startDate: '2018-03-12' },
    { code: 'N002', fullName: 'Nurse Bob', dob: '1978-07-23', gender: 'Male', phoneNumber: '987-654-3210', specialty: 'Emergency', address: '101 Maple St', startDate: '2017-07-23' },
    // Add more nurse data as needed
  ];

  nurses.forEach(nurse => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${nurse.code}</td>
      <td>${nurse.fullName}</td>
      <td>${nurse.dob}</td>
      <td>${nurse.gender}</td>
      <td>${nurse.phoneNumber}</td>
      <td>${nurse.specialty}</td>
      <td>${nurse.address}</td>
      <td>${nurse.startDate}</td>
      <td>
        <button class="edit-button" onclick="editNurse('${nurse.code}')">Edit</button>
        <button class="delete-button" onclick="deleteNurse('${nurse.code}')">Delete</button>
      </td>
    `;
    nurseRows.appendChild(row);
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

function editNurse(code) {
  // Implement edit functionality
  alert(`Edit nurse with code: ${code}`);
}

function deleteNurse(code) {
  // Implement delete functionality
  alert(`Delete nurse with code: ${code}`);
}