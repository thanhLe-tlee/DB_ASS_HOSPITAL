document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('delete-patient-button').addEventListener('click', openDeletePatientModal);
  document.getElementById('close-delete-patient-modal').addEventListener('click', closeDeletePatientModal);
  document.getElementById('delete-patient-form').addEventListener('submit', handleDeletePatientFormSubmit);
});

function openDeletePatientModal() {
  const modal = document.getElementById('delete-patient-modal');
  modal.style.display = 'block';
}

function closeDeletePatientModal() {
  const modal = document.getElementById('delete-patient-modal');
  modal.style.display = 'none';
}

async function handleDeletePatientFormSubmit(event) {
  event.preventDefault();

  const patientData = {
    pCode: document.getElementById('delete-pCode').value,
  };

  try {
    const response = await fetch('http://localhost:100/DeletePatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (response.ok) {
      alert('Patient deleted successfully');
      window.location.reload(); // Reload the page
    } else {
      alert('Failed to delete patient');
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
  }
}
