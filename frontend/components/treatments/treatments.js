//import React, { useState, useEffect } from 'react';
//import './Treatments.css';

function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [editTreatment, setEditTreatment] = useState(null);
  const [newTreatment, setNewTreatment] = useState({
    result: '',
    start_date: '',
    end_date: '',
    doctor_code: ''
  });

  useEffect(() => {
    fetch('/api/treatments')
      .then(response => response.json())
      .then(data => setTreatments(data))
      .catch(error => console.error('Error fetching treatments:', error));
  }, []);

  const handleEditClick = (treatment) => {
    setEditTreatment(treatment);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTreatment({ ...editTreatment, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/treatments/${editTreatment.treatment_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editTreatment),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setTreatments(treatments.map(treat => (treat.treatment_id === editTreatment.treatment_id ? editTreatment : treat)));
          setEditTreatment(null);
        }
      })
      .catch(error => console.error('Error updating treatment:', error));
  };

  const handleDeleteClick = (treatment_id) => {
    fetch(`/api/treatments/${treatment_id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setTreatments(treatments.filter(treatment => treatment.treatment_id !== treatment_id));
        }
      })
      .catch(error => console.error('Error deleting treatment:', error));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewTreatment({ ...newTreatment, [name]: value });
  };

  const handleNewFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/treatments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTreatment),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setTreatments([...treatments, data.treatment]);
          setNewTreatment({
            result: '',
            start_date: '',
            end_date: '',
            doctor_code: ''
          });
        }
      })
      .catch(error => console.error('Error adding treatment:', error));
  };

  const handleNewTreatmentClick = () => {
    setNewTreatment({
      result: '',
      start_date: '',
      end_date: '',
      doctor_code: ''
    });
    document.getElementById('new-treatment-popup').style.display = 'block';
  };

  const closeNewTreatmentPopup = () => {
    document.getElementById('new-treatment-popup').style.display = 'none';
  };
}

async function fetchTreatmentTableData() {
  try {
      const response = await fetch('http://localhost:100/getTreatmentRow', {
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
  const tableBody = document.getElementById('treatment-rows');
  //tableBody.innerHTML = ''; // Clear existing content

  data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.treatment_id}</td>
          <td>${item.result}</td>
          <td>${item.start_date}</td>
          <td>${item.end_date}</td>
          <td>${item.doctor_code}</td>
      `;
      tableBody.appendChild(row);
  });
};
// Call the functions to fetch and populate data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  //fetchCustomerData();
  fetchTreatmentTableData();
  //fetchTable2Data();
  //fetchTable4Data();
  //fetchCustomerList();
});

//export default Treatments;