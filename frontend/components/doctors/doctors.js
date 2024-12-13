//import React, { useState, useEffect } from 'https://cdn.jsdelivr.net/npm/react@17/umd/react.production.min.js';
//import ReactDOM from 'https://cdn.jsdelivr.net/npm/react-dom@17/umd/react-dom.production.min.js';

// Ensure the correct path to the CSS file
//import '../doctors/Doctors.css';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [editDoctor, setEditDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    p_code: ''
  });

  useEffect(() => {
    fetch('/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  const handleEditClick = (doctor) => {
    setEditDoctor(doctor);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDoctor({ ...editDoctor, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/doctors/${editDoctor.doctor_code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editDoctor),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setDoctors(doctors.map(doc => (doc.doctor_code === editDoctor.doctor_code ? editDoctor : doc)));
          setEditDoctor(null);
        }
      })
      .catch(error => console.error('Error updating doctor:', error));
  };

  const handleDeleteClick = (doctor_code) => {
    fetch(`/api/doctors/${doctor_code}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setDoctors(doctors.filter(doctor => doctor.doctor_code !== doctor_code));
        }
      })
      .catch(error => console.error('Error deleting doctor:', error));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleNewFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDoctor),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setDoctors([...doctors, data.doctor]);
          setNewDoctor({
            p_code: ''
          });
          closeNewDoctorPopup();
        }
      })
      .catch(error => console.error('Error adding doctor:', error));
  };

  const handleNewDoctorClick = () => {
    setNewDoctor({ p_code: '' });
    document.getElementById('new-doctor-popup').style.display = 'block';
  };

  const closeNewDoctorPopup = () => {
    document.getElementById('new-doctor-popup').style.display = 'none';
  };
}
async function fetchDoctorTableData() {
  try {
      const response = await fetch('http://localhost:100/getDoctorRow', {
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
  const tableBody = document.getElementById('doctor-rows');
  //tableBody.innerHTML = ''; // Clear existing content

  data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.e_code}</td>
          <td>${item.e_first_name} ${item.e_last_name}</td>
          <td>${item.e_dob}</td>
          <td>${item.e_gender}</td>
          <td>${item.phone_number}</td>
          <td>${item.name_specialty}</td>
          <td>${item.e_address}</td>
          <td>${item.start_date}</td>
      `;
      tableBody.appendChild(row);
  });
};
// Call the functions to fetch and populate data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  //fetchCustomerData();
  fetchDoctorTableData();
  //fetchTable2Data();
  //fetchTable4Data();
  //fetchCustomerList();
});
