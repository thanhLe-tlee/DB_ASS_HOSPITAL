document.addEventListener('DOMContentLoaded', () => {
  fetchDoctors();
});

async function fetchDoctors() {
  try {
    const response = await fetch('http://localhost:3000/api/doctors'); // Replace with your backend API endpoint
    const doctors = await response.json();
    const doctorRows = document.getElementById('doctor-rows');
    doctorRows.innerHTML = '';

    doctors.forEach(doctor => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${doctor.code}</td>
        <td>${doctor.fullName}</td>
        <td>${doctor.dob}</td>
        <td>${doctor.gender}</td>
        <td>${doctor.phoneNumber}</td>
        <td>${doctor.specialty}</td>
        <td>${doctor.address}</td>
        <td>${doctor.startDate}</td>
        <td>
          <button class="edit-button" onclick="editDoctor('${doctor.code}')">Edit</button>
          <button class="delete-button" onclick="deleteDoctor('${doctor.code}')">Delete</button>
        </td>
      `;
      doctorRows.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}

function editDoctor(code) {
  // Implement edit functionality
  alert(`Edit doctor with code: ${code}`);
}

function deleteDoctor(code) {
  // Implement delete functionality
  alert(`Delete doctor with code: ${code}`);
}