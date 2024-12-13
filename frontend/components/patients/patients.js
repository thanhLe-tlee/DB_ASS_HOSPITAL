//import React, { useState, useEffect } from 'react';
//import './Patients.css';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    p_first_name: '',
    p_last_name: '',
    p_address: '',
    p_gender: '',
    discharge_date: '',
    p_phone_number: '',
    p_dob: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleEditClick = (patient) => {
    setEditPatient(patient);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditPatient({ ...editPatient, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/patients/${editPatient.p_code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editPatient),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPatients(patients.map(patient => (patient.p_code === editPatient.p_code ? editPatient : patient)));
          setEditPatient(null);
        }
      })
      .catch(error => console.error('Error updating patient:', error));
  };

  const handleDeleteClick = (p_code) => {
    fetch(`http://localhost:3000/api/patients/${p_code}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPatients(patients.filter(patient => patient.p_code !== p_code));
        }
      })
      .catch(error => console.error('Error deleting patient:', error));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleNewFormSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatient),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPatients([...patients, data.patient]);
          setNewPatient({
            p_first_name: '',
            p_last_name: '',
            p_address: '',
            p_gender: '',
            discharge_date: '',
            p_phone_number: '',
            p_dob: ''
          });
          closeNewPatientPopup();
        }
      })
      .catch(error => console.error('Error adding patient:', error));
  };

  const handleNewPatientClick = () => {
    setNewPatient({
      p_first_name: '',
      p_last_name: '',
      p_address: '',
      p_gender: '',
      discharge_date: '',
      p_phone_number: '',
      p_dob: ''
    });
    const popup = document.getElementById('new-patient-popup');
    if (popup) {
      popup.classList.add('show');
    } else {
      console.error('Popup element not found');
    }
  };

  const closeNewPatientPopup = () => {
    const popup = document.getElementById('new-patient-popup');
    if (popup) {
      popup.classList.remove('show');
    } else {
      console.error('Popup element not found');
    }
  };
}
async function fetchPatientTableData() {
  try {
      const response = await fetch('http://localhost:100/getPatientRow', {
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
  const tableBody = document.getElementById('patient-rows');
  //tableBody.innerHTML = ''; // Clear existing content

  data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.p_first_name} ${item.p_last_name}</td>
          <td>${item.p_code}</td>
          <td>${item.p_gender}</td>
          <td>${item.discharge_date}</td>
          <td>${item.doctor_code}</td>
      `;
      tableBody.appendChild(row);
  });
};
// Call the functions to fetch and populate data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  //fetchCustomerData();
  fetchPatientTableData();
  //fetchTable2Data();
  //fetchTable4Data();
  //fetchCustomerList();
});


async function addNewPatient(patientData) {
  try {
    const response = await fetch('http://localhost:100/AddNewPatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (response.ok) {
      alert('Patient added successfully');
      window.location.reload(); // Reload the page
    } else {
      alert('Failed to add patient');
    }
  } catch (error) {
    console.error('Error adding patient:', error);
  }
}

async function deletePatient(patientData) {
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

function handleNewPatientClick() {
  const modal = document.getElementById('new-patient-modal');
  modal.style.display = 'block';
}

function closeNewPatientModal() {
  const modal = document.getElementById('new-patient-modal');
  modal.style.display = 'none';
}

function handleNewPatientFormSubmit(event) {
  event.preventDefault();

  const patientData = {
    pCode: document.getElementById('pCode').value,
    pFirstName: document.getElementById('pFirstName').value,
    pLastName: document.getElementById('pLastName').value,
    pAddress: document.getElementById('pAddress').value,
    pGender: document.getElementById('pGender').value,
    dischargeDate: document.getElementById('dischargeDate').value,
    pPhoneNumber: document.getElementById('pPhoneNumber').value,
    pDob: document.getElementById('pDob').value,
    doctor_code: document.getElementById('doctor_code').value,
  };

  addNewPatient(patientData);
}

function openDeletePatientModal(pCode) {
  const modal = document.getElementById('delete-patient-modal');
  modal.style.display = 'block';
  document.getElementById('delete-pCode').value = pCode;
}

function closeDeletePatientModal() {
  const modal = document.getElementById('delete-patient-modal');
  modal.style.display = 'none';
}

function handleDeletePatientFormSubmit(event) {
  event.preventDefault();

  const patientData = {
    pCode: document.getElementById('delete-pCode').value,
  };

  deletePatient(patientData);
}

function navigate(page) {
  // ...existing code...
}

function toggleNotifications() {
  // ...existing code...
}

function displayNotifications() {
  // ...existing code...
}

document.getElementById('new-patient-form').addEventListener('submit', handleNewPatientFormSubmit);
document.getElementById('new-patient-button').addEventListener('click', handleNewPatientClick);
document.getElementById('close-new-patient-modal').addEventListener('click', closeNewPatientModal);

document.getElementById('delete-patient-form').addEventListener('submit', handleDeletePatientFormSubmit);
document.getElementById('close-delete-patient-modal').addEventListener('click', closeDeletePatientModal);