document.addEventListener('DOMContentLoaded', () => {
  fetchMedications();
});

async function fetchMedications() {
  try {
    const response = await fetch('http://localhost:3000/api/medications'); // Replace with your backend API endpoint
    const medications = await response.json();
    const medicationRows = document.getElementById('medication-rows');
    medicationRows.innerHTML = '';

    medications.forEach(medication => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${medication.name}</td>
        <td>${medication.code}</td>
        <td>${medication.type}</td>
        <td>${medication.manufacturer}</td>
        <td>${medication.expiryDate}</td>
        <td>
          <button class="edit-button" onclick="editMedication('${medication.code}')">Edit</button>
          <button class="delete-button" onclick="deleteMedication('${medication.code}')">Delete</button>
        </td>
      `;
      medicationRows.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching medications:', error);
  }
}

function editMedication(code) {
  // Implement edit functionality
  alert(`Edit medication with code: ${code}`);
}

function deleteMedication(code) {
  // Implement delete functionality
  alert(`Delete medication with code: ${code}`);
}